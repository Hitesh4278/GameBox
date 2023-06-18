import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import {useParams} from 'react-router-dom'

export const ReviewPage = () => {
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const {gameId}=useParams();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    setAuthenticated(!!loggedInUser);
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticated) {

      // console.log('User not authenticated');
      alert("Please! Login First");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/reviewPage/:gameId', {
        reviewText: review,
        email: email,
        gameId:gameId,
      });

      // Handle the response as needed
      console.log(response.data);

      // Clear the review after submitting
      setReview('');
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <h2 className='text-center'>Review Your Game</h2>
      <div className="review-form-container" style={{ textAlign: 'center' }}>
        <div className="review-form">
          <textarea
            value={review}
            placeholder="Write your review..."
            rows={4}
            cols={50}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button className="bg-light btn-outline-dark" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};
