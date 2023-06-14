import React from 'react';

export const Card = ({ game }) => {
  return (
    <div className="col-sm-4 mb-4" >
      <div className="card" style={{ height: '25rem', width: '400px', marginTop: '15px', marginLeft: '10px' ,}}>
        <img
          src={game.background_image}
          className="card-img-top"
          alt="Game Cover"
        />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text ">
            Rating : {game.rating} <br></br>
            Release:{game.released} <br></br>
          </p>
        <a href="/" > Click Here</a>
        </div>
      </div>
    </div>
  );
};
