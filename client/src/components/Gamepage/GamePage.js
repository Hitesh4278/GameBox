import React, { useEffect, useState } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/GamePage.css';

const apiKey = process.env.REACT_APP_RAWG_API;

export const GamePage = () => {
  const [game, setGame] = useState({});
  const [screenShots, setScreenShots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const { gameId } = useParams();
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  const screenShotUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;
  const trailerUrl    = `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`
  const reviewsUrl = `http://localhost:8000/reviews/${gameId}`;


  const getTrailer = () => {
    axios
      .get(trailerUrl)
      .then(response => {
        setTrailer(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getGame = () => {
    axios
      .get(url)
      .then(response => {
        setGame(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getScreenShots = () => {
    axios
      .get(screenShotUrl)
      .then(response => {
        setScreenShots(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getReviews = () => {
    axios
      .get(reviewsUrl)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  useEffect(() => {
    getGame();
    getScreenShots();
    getReviews();
    // getTrailer();
  }, [gameId]);
  
  return (
    <>
      <NavBar />
      <div className='d-flex justify-content-between '>
        <div className='game-info' style={{ marginLeft: '10px' }}>
          <h3 style={{ marginTop: '2px' }}>Game Info :</h3>
          <p><strong>Name : </strong>{game.name}</p>
          <img
            src={game.background_image}
            className="card-img-top"
            alt={game.background_image_additional}
            style={{ width: '600px', height: 'auto' }}
          />
          <p><strong>Release Date :</strong> {game.released}</p>
          <p> <strong>Rating :</strong>  {game.rating}</p>
          <p><strong>GameId :</strong> {gameId}</p>
          <p className='description'> <strong>Description : </strong>{game.description_raw}</p>

          <h2 className='screenshots-heading'>Screenshots:</h2>
          <div className="screenshots-container">
            {screenShots.map(screenshot => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt={`Screenshot ${screenshot.id}`}
                className="screenshot-image"
              />
            ))}
          </div>

          <p> <strong>Developers : </strong> {game.developers && game.developers.map(developer => (
            <div key={developer.id}>
              <>{developer.name}</>
            </div>
          ))}</p>

          <p><strong>Genres:</strong></p>
          <ul>
            {game.genres && game.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <p><strong>Available On:</strong></p>
          <ul>
            {game.platforms && game.platforms.map(platform => (
              <li key={platform.platform.id}>{platform.platform.name}</li>
            ))}
          </ul>

          <p><strong>Platform Requirements :</strong></p>
          <ul>
            {game.platforms && game.platforms.map(platform => {
              if (platform.platform.name === "PC") {
                return (
                  <li key={platform.platform.id}>
                    <h3>{platform.platform.name}</h3>
                    <p> {platform.requirements.recommended}</p>
                    <p> {platform.requirements.minimum}</p>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
          <div className="review-section">
            <h3>Reviews:</h3>
            {reviews.length > 0 ? (
              <ol className="review-list">
                {reviews.map((review, index) => (
                  <li key={review.gameId} className="review-item">
                    <p>
                      <span className="review-number">{index + 1}.</span>
                      {review.reviewText}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="no-reviews">No reviews available.</p>
            )}
          </div>
          <p> <strong>For More Info:</strong> <span className='review-link'><a href={game.website}>Click Here</a></span></p>
          <p>
            <span><strong>Add A Review:</strong> </span>
            <span className="review-link">
              <Link to={`/reviewPage/${gameId}`}>Click Here</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default GamePage;
