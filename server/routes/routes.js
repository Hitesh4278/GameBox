const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Review = require('../models/Review')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ success: true, message: "Signup  Successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Some Error Occured , Try Again" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email: email });

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
      return res.status(400).json({ errors: "Incorrect password" });
    }

    if (user) {
      return res.status(200).json({ success: true, message: "Logged In Successfully" })
    }
    else {
      return res.status(401).json({ success: false, message: "Please !! Try Again" })
    }

  }
  catch (error) {
    res.json('Error: ', error.message);
  }
})

router.post('/login-google', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user) {
      const passwordCompare = await bcrypt.compare(password, user.password)

      if (!passwordCompare) {
        return res.status(400).json({ errors: "Incorrect password" });
      }

      if (user) {
        return res.status(200).json({ success: true, message: "Logged In Successfully" })
      }
    }
    else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new User({
        email: email,
        password: hashedPassword,
      });

      await newUser.save();
      res.json({ success: true, message: "Signup  Successfull" });
    }

  }
  catch (error) {
    res.json('Error: ', error.message);
  }
})

router.post('/reviewPage/:gameId', async (req, res) => {
  try {
    const { email, reviewText, gameId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newReview = new Review({
      user: user._id,
      reviewText: reviewText,
      gameId: gameId

    });

    await newReview.save();

    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.delete('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { email } = req.query; // Accessing email from query parameters

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const review_user = await Review.findById(reviewId);
    if (!review_user) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!user._id.equals(review_user.user)) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting review..........', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { reviewText, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const review_user = await Review.findById(reviewId);
    if (!review_user) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!user._id.equals(review_user.user)) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        $set: {
          reviewText: reviewText,
        }
      },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);

  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/reviews/:gameId', async (req, res) => {
  const { gameId } = req.params;

  try {
    const reviews = await Review.find({ gameId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

router.post('/reviews/:id/upvote', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (review.upvotedBy.includes(user._id)) {
      return res.status(400).json({ success: false, message: 'You have already upvoted this review.' });
    }

    if (review.downvotedBy.includes(user._id)) {
      review.downvotes -= 1;
      review.downvotedBy.pull(user._id);
    }

    review.upvotes += 1;
    review.upvotedBy.push(user._id);
    await review.save();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Review Upvoted',
      text: "Your review has been upvoted!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    res.json({ success: true, upvotes: review.upvotes, message: "Upvote successful!" });

  } catch (error) {
    console.error('Error in upvote route:', error);
    res.status(500).json({ success: false, error: 'Voting Error' });
  }
});



router.post('/reviews/:id/downvote', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (review.downvotedBy.includes(user._id)) {
      return res.status(400).json({ success: false, message: 'You have already downvoted this review.' });
    }

    if (review.upvotedBy.includes(user._id)) {
      review.upvotes -= 1;
      review.upvotedBy.pull(user._id);
    }

    review.downvotes += 1;
    review.downvotedBy.push(user._id);
    await review.save();

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Review Downvoted',
      text: "Your review has been downvoted!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    res.json({ success: true, downvotes: review.downvotes, message: "Downvote successful!" });

  } catch (error) {
    console.error('Error in downvote route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});



router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1d' });
    const link = process.env.BACKEND + `reset-password/${user._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send({
      success: true, message: "Please check your mail to reset your password!", data: token,
    });
    console.log("Mail sent successfully");
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ message: 'User not found' });
  }
});

router.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const verify = jwt.verify(token, secret);
    if (verify) {
      return res.redirect(process.env.FRONTEND + `reset-password/${id}/${token}`);
    }
  } catch (error) {
    return res.status(400).send("Not Verified");
  }
});


router.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const secret = process.env.JWT_SECRET + user.password;

  try {
    const verify = jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    res.send("Password Updated");
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).send("Password Not updated");
  }
});


router.get('/get-wishlist', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ wishlist: user.wishlist, message: 'Your Wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/wishlist/add', async (req, res) => {
  const { email, gameId } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.wishlist.includes(gameId)) {
      return res.status(400).json({ message: "Item is already in the Favourites" });
    } else {
      user.wishlist.push(gameId);
      await user.save();
      res.json({ wishlist: user.wishlist, message: "Added to  Favourites" });
    }
  } catch (err) {
    res.status(500).json({ message: "Unable to add the item to Favourites" });
  }
});


router.delete('/wishlist/remove', async (req, res) => {
  const { email, gameId } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.wishlist = user.wishlist.filter(id => id !== gameId);
    await user.save();

    res.json({ wishlist: user.wishlist, message: "Removed from Favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/wishlist/check', async (req, res) => {
  const { email, gameId } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isInWishlist = user.wishlist.includes(gameId);
    return res.status(200).json({ isInWishlist });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
