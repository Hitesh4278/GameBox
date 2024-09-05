import React, { useEffect, useState } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/GamePage.css';

const apiKey = process.env.REACT_APP_RAWG_API;

export const GamePage = () => {
  const [game, setGame] = useState({});
  const [screenShots, setScreenShots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [newReviewText, setNewReviewText] = useState('');
  const { gameId } = useParams();
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  const screenShotUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;
  const reviewsUrl = `http://localhost:8000/reviews/${gameId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameData, screenShotData, reviewsData] = await Promise.all([
          axios.get(url),
          axios.get(screenShotUrl),
          axios.get(reviewsUrl)
        ]);

        setGame(gameData.data);
        setScreenShots(screenShotData.data.results);
        setReviews(reviewsData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [gameId, url, screenShotUrl, reviewsUrl]);

  const handleVote = async (reviewId, type) => {
    try {
      await axios.post(`http://localhost:8000/reviews/${reviewId}/${type}`, { email });

      setReviews(reviews.map(review => {
        if (review._id === reviewId) {
          const updatedReview = { ...review };
          if (type === 'upvote') {
            updatedReview.upvotes += 1;
          } else if (type === 'downvote') {
            updatedReview.downvotes += 1;
          }
          return updatedReview;
        }
        return review;
      }));

      alert(`Successfully ${type}d`);
    } catch (error) {
      alert(`Already ${type}d`);
      console.error(`Error ${type}ing:`, error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8000/reviews/${reviewId}?email=${email}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      alert('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review');
    }
  };

  const handleEdit = (reviewId, currentText) => {
    setCurrentReviewId(reviewId);
    setNewReviewText(currentText);
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/reviews/${currentReviewId}`, {
        email,
        reviewText: newReviewText
      });

      setReviews(reviews.map(review => {
        if (review._id === currentReviewId) {
          return { ...review, reviewText: newReviewText };
        }
        return review;
      }));

      setIsModalOpen(false); // Close the modal
      alert('Review updated successfully');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update the review');
    }
  };

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container">
          <div className="game-header">
            <h3 className="game-title">{game.name}</h3>
            <div className="game-image">
              <img src={game.background_image} alt={game.background_image_additional} />
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
              <img key={screenshot.id} src={screenshot.image} alt={`Screenshot ${screenshot.id}`} />
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
                {reviews.map(review => (
                  <li key={review._id}>
                    <p>{review.reviewText}</p>
                    <div className="review-votes">
                      <button onClick={() => handleVote(review._id, 'upvote')}>Upvote</button>
                      <button onClick={() => handleVote(review._id, 'downvote')}>Downvote</button>
                      <button onClick={() => handleEdit(review._id, review.reviewText)}>Edit</button>
                      <button onClick={() => handleDelete(review._id)}>Delete</button>
                      <span>Total Upvotes: {review.upvotes}</span>
                      <span>Total Downvotes: {review.downvotes}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>

          {/* Edit Review Modal */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Edit Review</h2>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  rows="5"
                  cols="50"
                />
                <div className="modal-actions">
                  <button onClick={handleSubmitEdit}>Submit</button>
                  <button className='cancel-button' onClick={handleModalClose}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="links">
            <p><strong>For More Info:</strong> <a href={game.website}>Click Here</a></p>
            <p><strong>Add A Review:</strong> <a href={`/reviewPage/${gameId}`}>Click Here</a></p>
          </div>
        </div>
      )}
    </>
  );
};
