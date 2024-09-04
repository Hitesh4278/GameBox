import React, { useState, useEffect } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { Card } from '../../Screens/Card';
import axios from 'axios';
import LandingPage from '../LandingPage/LandingPage';
import '../../css/Home.css'; // Import the CSS file

const apiKey = process.env.REACT_APP_RAWG_API;
const url = `https://api.rawg.io/api/games?key=${apiKey}&page=3`;

export const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authenticated'));
  const [loading, setLoading] = useState(false);

  const getAllGames = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(url);
      setGames(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getSearchedGames = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}`);
      setGames(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
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
          <div className="container">
            <div>
              <h2>
                "Games are a way to escape reality and immerse yourself in incredible adventures."
              </h2>
            </div>

            <div>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
                className="search-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="card-container">
              {games.map(game => (
                <div key={game.id} className="">
                  <Card game={game} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
