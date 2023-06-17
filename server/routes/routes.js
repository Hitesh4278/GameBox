const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create a new user
        const newUser = new User({
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        res.json({ success: true });
    } catch (error) {
        console.log(error); // Add this line to log the specific error
        res.status(500).json({ success: false });
    }
});


router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({ email: email, password: password });

        if (user) {
            return res.status(200).json({ success: true })
        }
        else {
            return res.status(401).json({ success: false })
        }

    }
    catch (error) {
        res.json('Error: ', error.message);
    }
})

router.post('/reviewPage', async(req,res)=>{

    try {
        const {userId,reviewText}=req.body;

        const user=await User.findById(userId);

        if(!user)
        {
            return res.status(404).json({success:false,message:'User not Found'})
        }

        const newReview=new Review({
            user:user._id,
            reviewText
        })

        await newReview.save();

        res.json({success:true, message:"Review Added SuccessFully"})
    } catch (error) {
     console.log(error); 
    res.status(500).json({ success: false, message: 'Internal server error' });
        
    }
})





module.exports = router;
