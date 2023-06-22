import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import { Card } from '../Screens/Card';
import axios from 'axios';
import '../Css/Home.css'

const apiKey = 'd9ac06863b3b40bfb04b86694f77e46c';
const url = `https://api.rawg.io/api/games?key=${apiKey}&page=2`;

export const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  const getAllGames = () => {
    axios
      .get(url)
      .then(response => {
        setGames(response.data.results);
        // console.log(response.data.results)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getSearchedGames = () => {
    axios
      .get(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}`)
      .then(response => {
        setGames(response.data.results);
        // console.log(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (search === "") {
      getAllGames();
    } else {
      getSearchedGames();
    }
  }, [search])

  return (
    <>
      <div >
        <NavBar />
      </div>
      <div className="header-container">
        {/* quote */}
        <div className="quote-container">
          <h2 className="quote-heading">
            "Games are a way to escape reality and immerse yourself in incredible adventures."
          </h2>
        </div>
        {/* search bar */}
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
    </>
  );
};
