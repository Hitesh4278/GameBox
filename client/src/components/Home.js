import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import { Card } from '../Screens/Card';
import { CarouselComponent } from '../Screens/CarouselComponent';
import axios from 'axios';

const apiKey = 'd9ac06863b3b40bfb04b86694f77e46c';
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

export const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setGames(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filtered = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredGames(filtered);
  }, [search, games]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={{ marginTop: '5px' }}>
        <nav className="navbar text-white bg-dark justify-content-center">
          <a className="navbar-brand">Category</a>
          <form className="form-inline ml-auto" >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </nav>
      </div>
      <div style={{ marginLeft: '100px', paddingLeft: '10px' }}>
        <div className="row">
          {filteredGames.map(game => (
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
