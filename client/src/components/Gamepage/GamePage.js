import React, { useEffect, useState } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/GamePage.css';

const apiKey = process.env.REACT_APP_RAWG_API;

export const GamePage = () => {
  const [game, setGame] = useState({});
  const [screenShots, setScreenShots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state added
  const { gameId } = useParams();
  
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  const screenShotUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;
  const reviewsUrl = `http://localhost:8000/reviews/${gameId}`;

  useEffect(() => {
    const getGame = async () => {
      try {
        const gameData = await axios.get(url);
        setGame(gameData.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getScreenShots = async () => {
      try {
        const screenShotData = await axios.get(screenShotUrl);
        setScreenShots(screenShotData.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    const getReviews = async () => {
      try {
        const reviewsData = await axios.get(reviewsUrl);
        setReviews(reviewsData.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      setLoading(true); // Start loading
      await Promise.all([getGame(), getScreenShots(), getReviews()]);
      setLoading(false); // Stop loading once all data is fetched
    };

    fetchData();
  }, [gameId]);

  return (
    <>
      <NavBar />
      {loading ? ( // Display loading spinner while data is loading
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container">
          <div className="game-header">
            <h3 className="game-title">{game.name}</h3>
            <div className="game-image">
              <img
                src={game.background_image}
                alt={game.background_image_additional}
              />
            </div>
            <div className="game-details">
              <p><strong>Release Date:</strong> {game.released}</p>
              <p><strong>Rating:</strong> {game.rating}</p>
              <p><strong>Description:</strong> {game.description_raw}</p>
            </div>
          </div>

          <h2 className="section-title">Screenshots:</h2>
          <div className="screenshots">
            {screenShots.map(screenshot => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt={`Screenshot ${screenshot.id}`}
              />
            ))}
          </div>

          <div className="details-grid">
            <div>
              <h3>Developers:</h3>
              <p>{game.developers && game.developers.map(dev => dev.name).join(', ')}</p>
            </div>

            <div>
              <h3>Genres:</h3>
              <p>{game.genres && game.genres.map(genre => genre.name).join(', ')}</p>
            </div>

            <div>
              <h3>Available On:</h3>
              <ul>
                {game.platforms && game.platforms.map(platform => (
                  <li key={platform.platform.id}>{platform.platform.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Platform Requirements:</h3>
              <ul>
                {game.platforms && game.platforms.map(platform => {
                  if (platform.platform.name === "PC") {
                    return (
                      <li key={platform.platform.id}>
                        <h4>{platform.platform.name}</h4>
                        <p><strong>Recommended:</strong> {platform.requirements?.recommended}</p>
                        <p><strong>Minimum:</strong> {platform.requirements?.minimum}</p>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>

          <div className="reviews">
            <h2 className="section-title">Reviews:</h2>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <p>{review.reviewText}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>

          <div className="links">
            <p><strong>For More Info:</strong> <a href={game.website}>Click Here</a></p>
            <p><strong>Add A Review:</strong> <a href={`/reviewPage/${gameId}`}>Click Here</a></p>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
