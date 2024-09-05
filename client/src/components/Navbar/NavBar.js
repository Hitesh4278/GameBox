import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/NavBar.css';

export const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    setAuthenticated(!!loggedInUser);
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('email');
    setAuthenticated(false);
    setEmail('');
    alert('Logged Out');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-button" onClick={() => handleNavigation('/')}>
          Home
        </button>
        <button className="nav-button" onClick={() => handleNavigation('/news')}>
          News
        </button>
      </div>
      <div className="nav-right">
        <ul className="nav-list">
          {authenticated ? (
            <li className="nav-item">
              <button className='nav-button' onClick={() => handleNavigation('/wishlist')}>
                Favourites
              </button>
              {" "}
              <span className="nav-email">
                {email}
              </span>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <button className="nav-button" onClick={() => handleNavigation('/signup')}>
                  SignUp
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-button" onClick={() => handleNavigation('/login')}>
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
