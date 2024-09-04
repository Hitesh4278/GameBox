import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Card.css'; // Import your CSS file for styling

export const Card = ({ game }) => {
  const GameId = game.id;
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
      </div>
    </div>
  );
};
