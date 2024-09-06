import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Card.css';

export const Card = ({ game }) => {
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false); 
  const GameId = game.id;

  useEffect(() => {
    const email = localStorage.getItem('email');
    const checkWishlist = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'wishlist/check', {
          email: email,
          gameId: GameId
        });
        setIsInWishlist(response.data.isInWishlist); 
      } catch (err) {
        console.error('Error checking wishlist', err);
      }
    };

    checkWishlist();
  }, [GameId]);

  const addToWishlist = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'wishlist/add', {
        email: email,
        gameId: GameId
      });

      if (response.status === 200) {
        setWishlistMessage(response.data.message);
        setIsInWishlist(true);  
      }
    } catch (err) {
      console.error('Error adding to wishlist', err);
      if (err.response) {
        setWishlistMessage(err.response.data.message);
      } else {
        setWishlistMessage('Error adding to wishlist');
      }
    }
  };

  const removeFromWishlist = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await axios.delete( process.env.REACT_APP_BACKEND_URL + 'wishlist/remove', {
        data: { email: email, gameId: String(GameId) }
      });

      if (response.status === 200) {
        setWishlistMessage(response.data.message);
        setIsInWishlist(false);  
      }
    } catch (err) {
      console.error('Error removing from wishlist', err);
      if (err.response) {
        setWishlistMessage(err.response.data.message);
      } else {
        setWishlistMessage('Error removing from wishlist');
      }
    }
  };

  useEffect(() => {
    if (wishlistMessage) {
      const timer = setTimeout(() => {
        setWishlistMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wishlistMessage]);

  return (
    <div className="card">
      <div className="card-image">
        <img
          src={game.background_image}
          alt={`${game.name} Cover`}
        />
      </div>
      <div className="card-content">
        <h5>{game.name}</h5>
        <p>
          Rating: <span>{game.rating}</span> <br />
          Release: <span>{game.released}</span>
        </p>
        <Link to={`/gamepage/${GameId}`} className="card-button">
          Click Here
        </Link>
        {
          " "
        }
        {isInWishlist ? (
          <button onClick={removeFromWishlist} className="wishlist-button">
            Remove from Favourite
          </button>
        ) : (
          <button onClick={addToWishlist} className="wishlist-button">
            Add to Favourite
          </button>
        )}

        {wishlistMessage && <p className="wishlist-message">{wishlistMessage}</p>}
      </div>
    </div>
  );
};
