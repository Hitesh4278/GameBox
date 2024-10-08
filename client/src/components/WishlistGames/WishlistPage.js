import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Wishlist.css';
import { NavBar } from '../Navbar/NavBar';

export const WishlistPage = () => {
  const [wishlistGames, setWishlistGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiKey = process.env.REACT_APP_RAWG_API;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const email = localStorage.getItem('email');
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + 'get-wishlist', {
          params: { email: email }
        });

        const wishlistGameIds = response.data.wishlist;
        const gameDetailsPromises = wishlistGameIds.map(async (gameId) => {
          const gameResponse = await axios.get(process.env.REACT_APP_RAWG_URL + `games/${gameId}?key=${apiKey}`);
          return gameResponse.data;
        });

        const wishlistGamesData = await Promise.all(gameDetailsPromises);
        setWishlistGames(wishlistGamesData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [apiKey]);

  const handleRemove = async (gameId) => {
    const email = localStorage.getItem('email');
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL + 'wishlist/remove', {
        data: { email: email, gameId: String(gameId) } 
      });
      
      setWishlistGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    } catch (err) {
      setError('Error removing game from wishlist');
    }
  };

  return (
    <>
      <NavBar />
      <div className="wishlist-page">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : wishlistGames.length > 0 ? (
          <>
            <div className="wishlist-grid">
              {wishlistGames.map((game) => (
                <div key={game.id} className="wishlist-card">
                  <Link to={`/gamepage/${game.id}`}>
                    <div className="wishlist-card-content">
                      <img src={game.background_image} alt={game.name} className="wishlist-game-image" />
                      <h4>{game.name}</h4>
                      <p>Rating: {game.rating}</p>
                      <p>Released: {game.released}</p>
                    </div>
                  </Link>
                  <button className="remove-btn" onClick={() => handleRemove(game.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
       
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
          </>
        ) : (
          <>
            <p>No games in your wishlist</p>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
          </>
        )}
      </div>
    </>
  );
};
