import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ game }) => {
  const GameId = game.id;
  return (
    <div className="col-sm-4 mb-3">
      <div className="card" style={{ height: '25rem', width: '400px', marginTop: '15px', marginLeft: '10px' }}>
        <img
          src={game.background_image}
          className="card-img-top"
          alt="Game Cover"
        />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">
            Rating: {game.rating} <br />
            Release: {game.released} <br />
            Category: {game.category} <br />
            GamesCategory: <Link to={`/gamepage/${GameId}`}>Click Here</Link> 
          </p>
        </div>
      </div>
    </div>
  );
};
