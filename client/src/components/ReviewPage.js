import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const ReviewPage = () => {
    const location=useLocation();
    const {email}=location.state || ''
  const [review, setReview] = useState('');

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      const userId = {email}; // Replace with the actual user ID
      const response = await axios.post('http://localhost:8000/reviewPage', {
        userId,
        review,
      });

      if (response.status === 200) {
        // Review submitted successfully
        console.log('Review submitted');
      } else {
        // Review submission failed
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <>
      <NavBar />
      <h3 className='text-center' style={{marginTop:'10px'}}>
        Review The Game
      </h3>
      <p className="text-center">Email: {email}</p>
      <div className="review-form-container" style={{textAlign: 'center'}}>
        <div className="review-form">
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review..."
            rows={4}
            cols={50}
          />
        </div>
          <button className="bg-light btn-outline-dark" onClick={handleSubmitReview}>Submit Review</button>
      </div>
    </>
  );
};
