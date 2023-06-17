import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiKey = 'd9ac06863b3b40bfb04b86694f77e46c';

export const GamePage = () => {
  const [game, setGame] = useState({});
  const [screenShots, setScreenShots] = useState([]);
  const { gameId } = useParams();
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
  const screenShotUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;


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
        // console.log(response.data.results);

      })
      .catch(error => {
        console.error(error);
      });
  };


  useEffect(() => {
    getGame();
    getScreenShots();
  }, [gameId]);

  return (
    <>
      <NavBar />
      <div className='d-flex justify-content-between'>
        <div style={{ marginLeft: '10px' }}>
          <h1>Game Info</h1>
          <p>Name: {game.name}</p>
          <img
            src={game.background_image}
            className="card-img-top"
            alt={game.background_image_additional}
            style={{ width: '600px', height: '' }}
          />
          <p>Release Date: {game.released}</p>
          <p>Rating: {game.rating}</p>
          <p>GameId: {gameId}</p>
          <p>Description: {game.description_raw}</p>
          <h2>Screenshots:</h2>
          {screenShots.map(screenshot => (
            <img
              key={screenshot.id}
              src={screenshot.image}
              alt={`Screenshot ${screenshot.id}`}
              style={{ width: '600px', height: '' }}
            />
          ))}
          
          <p>Developers: {game.developers && game.developers.map(developer => (
            <div key={developer.id}>
              <h6>{developer.name}</h6>
            </div>
          ))}</p>
          <p>Genres:</p>
          <ul>
            {game.genres && game.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <p>Available On:</p>
          <ul>
            {game.platforms && game.platforms.map(platform => (
              <li key={platform.platform.id}>{platform.platform.name}</li>
            ))}
          </ul>

          <p>Platform Requirements:</p>
          <ul>
            {game.platforms && game.platforms.map(platform => {
              if (platform.platform.name === "PC") {
                return (
                  <li key={platform.platform.id}>
                    <h3>{platform.platform.name}</h3>
                    <p>Recommended: {platform.requirements.recommended}</p>
                    <p>Minimum: {platform.requirements.minimum}</p>
                  </li>
                );
              } else {
                return null; // Skip platforms other than PC
              }
            })}
          </ul>

          <p>For More Info: <span><a href={game.website}>Click</a></span></p>
          
          <h4>Add A Review</h4> <span> <Link to='/reviewPage'>Click Here</Link> </span>

        </div>
        
       
      </div>
    </>
  );
};

export default GamePage;
