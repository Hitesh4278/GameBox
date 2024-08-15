import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Card.css';

export const Card = ({ game }) => {
  const GameId = game.id;
  return (
    <div className="col-sm-4 mb-3">
      <div className="card">
        <img
          src={game.background_image}
          className="card-img-top"
          alt="Game Cover"
        />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text"> {/* Add card-text class here */}
            Rating: <span className="rating">{game.rating}</span> <br />
            Release: <span className="release-date">{game.released}</span> <br />
            For More: <button><Link to={`/gamepage/${GameId}`}>Click Here</Link> </button> 
          </p>
        </div>
      </div>
    </div>
  );
};
