import React, { useEffect, useState, useCallback } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { useParams } from 'react-router-dom';
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
  const isAuthenticated =  localStorage.getItem('authenticated') === 'true'
  const [showAuthRequired, setShowAuthRequired] = useState(false);

  const url = process.env.REACT_APP_RAWG_URL + `games/${gameId}?key=${apiKey}`;
  const screenShotUrl = process.env.REACT_APP_RAWG_URL + `games/${gameId}/screenshots?key=${apiKey}`;
  const reviewsUrl = process.env.REACT_APP_BACKEND_URL + `reviews/${gameId}`;

  const fetchReviews = useCallback(async () => {
    try {
      const reviewsData = await axios.get(reviewsUrl);
      setReviews(reviewsData.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [reviewsUrl]);

  const handleVote = useCallback(async (reviewId, type) => {
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + `reviews/${reviewId}/${type}`, { email });
      await fetchReviews(); // Refetch reviews after voting

      alert(`Successfully ${type}d`);
    } catch (error) {
      alert(`Already ${type}d`);
      console.error(`Error ${type}ing:`, error);
    }
  }, [email, fetchReviews]);

  const handleDelete = useCallback(async (reviewId) => {
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL + `reviews/${reviewId}?email=${email}`);
      await fetchReviews(); // Refetch reviews after deleting
      alert('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review');
    }
  }, [email, fetchReviews]);

  const handleEdit = useCallback((reviewId, currentText) => {
    setCurrentReviewId(reviewId);
    setNewReviewText(currentText);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(process.env.REACT_APP_BACKEND_URL + `reviews/${currentReviewId}`, {
        email,
        reviewText: newReviewText
      });
      await fetchReviews(); // Refetch reviews after editing

      setIsModalOpen(false);
      alert('Review updated successfully');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update the review');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthRequired(true);
      return;
    }

    const fetchData = async () => {
      try {
        const [gameData, screenShotData] = await Promise.all([
          axios.get(url),
          axios.get(screenShotUrl)
        ]);

        setGame(gameData.data);
        setScreenShots(screenShotData.data.results);
        await fetchReviews(); // Fetch reviews initially
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [gameId, url, screenShotUrl, isAuthenticated, fetchReviews]);

  return (
    <>
      <NavBar />
      {showAuthRequired && (
        <div className="modal-overlay">
          <div className="auth-required-popup">
            <h2>Authentication Required</h2>
            <p>You need to be logged in to view this page.</p>
            <button onClick={() => window.location.href = '/login'}>Login</button>
          </div>
        </div>
      )}

      {!showAuthRequired && (
        loading ? (
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
        )
      )}
    </>
  );
};
