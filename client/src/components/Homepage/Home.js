import React, { useState, useEffect } from 'react';
import { NavBar } from '../Navbar/NavBar';
import { Card } from '../../Screens/Card';
import axios from 'axios';
import LandingPage from '../LandingPage/LandingPage';
import '../../css/Home.css'; // Import the CSS file

const apiKey = process.env.REACT_APP_RAWG_API;

export const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authenticated'));
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(100); // Assume 100 pages for now, adjust based on data
  const [currentPageBlock, setCurrentPageBlock] = useState(0); // Track the block of 10 pages

  const pagesPerBlock = 10; // Define how many pages per block
  
  const getAllGames = async (page = 1) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`);
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchedGames = async (page = 1) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}`);
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 20)); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (search === '') {
      getAllGames(currentPage);
    } else {
      getSearchedGames(currentPage);
    }
  }, [search, currentPage]);

  useEffect(() => {
    const authStatus = !!localStorage.getItem('authenticated');
    setIsLoggedIn(authStatus);
  }, []);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle block navigation
  const handleNextBlock = () => {
    if (currentPageBlock < Math.ceil(totalPages / pagesPerBlock) - 1) {
      setCurrentPageBlock(currentPageBlock + 1);
    }
  };

  const handlePreviousBlock = () => {
    if (currentPageBlock > 0) {
      setCurrentPageBlock(currentPageBlock - 1);
    }
  };

  const startPage = currentPageBlock * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

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
                  setCurrentPage(1); // Reset to page 1 on new search
                }}
                className="search-input"
              />
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div className="card-container">
                {games.map(game => (
                  <div key={game.id} className="">
                    <Card game={game} />
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  disabled={currentPageBlock === 0}
                  onClick={handlePreviousBlock}
                >
                  Previous
                </button>

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNum => (
                  <button
                    key={pageNum}
                    className={currentPage === pageNum ? 'active' : ''}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  disabled={endPage === totalPages}
                  onClick={handleNextBlock}
                >
                  Next 
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
