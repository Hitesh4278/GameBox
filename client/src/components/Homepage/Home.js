import React, { useState, useEffect } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { Card } from '../../Screens/Card';
import axios from 'axios';
import '../../css/Home.css';
import LandingPage from '../LandingPage/LandingPage';

const apiKey = process.env.REACT_APP_RAWG_API;
const url = `https://api.rawg.io/api/games?key=${apiKey}&page=3`;

export const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authenticated'));

  const getAllGames = () => {
    axios
      .get(url)
      .then(response => {
        setGames(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getSearchedGames = () => {
    axios
      .get(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}`)
      .then(response => {
        setGames(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (search === '') {
      getAllGames();
    } else {
      getSearchedGames();
    }
  }, [search]);

  useEffect(() => {
    const authStatus = !!localStorage.getItem('authenticated');
    setIsLoggedIn(authStatus);
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <LandingPage />
      ) : (
        <div>
          <NavBar setIsLoggedIn={setIsLoggedIn} />
          <div className="header-container">
            <div className="quote-container">
              <h2 className="quote-heading">
                "Games are a way to escape reality and immerse yourself in incredible adventures."
              </h2>
            </div>

            <div className="search-bar" style={{ marginTop: '5px' }}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div style={{ marginLeft: '20px', paddingLeft: '10px' }}>
            <div className="row">
              {games.map(game => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={game.id}>
                  <div>
                    <Card game={game} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
