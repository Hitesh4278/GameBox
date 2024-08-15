import React, { useState, useEffect } from 'react';
import { NavBar } from '../Navbar/NavBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/ReviewPage.css';

export const ReviewPage = () => {
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const { gameId } = useParams();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    setAuthenticated(!!loggedInUser);
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticated) {
      alert('Please log in first.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/reviewPage/${gameId}`, {
        reviewText: review,
        email: email,
        gameId: gameId,
      });

      setReview('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 className="title">Review Your Game</h2>
        <div className="review-form-container form-container">
          <div className="review-form">
            <textarea
              value={review}
              placeholder="Write your review..."
              rows={4}
              cols={50}
              onChange={(e) => setReview(e.target.value)}
              className="textarea"
            />
          </div>
          <button className="bg-light btn-outline-dark submit-button" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
