import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/NavBar.css'; // Create a CSS file for your navbar styles

export const NavBar = ({ setIsLoggedIn }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    setAuthenticated(!!loggedInUser);
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('email');
    setAuthenticated(false);
    setEmail('');
    setIsLoggedIn(false);
    alert('Logged Out');
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleNews = () => {
    navigate('/news');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-button" onClick={handleHome}>
          Home
        </button>
        <button className="nav-button" onClick={handleNews}>
          News
        </button>
      </div>
      <div className="nav-right">
        <ul className="nav-list">
          {authenticated ? (
            <li className="nav-item">
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
                <button className="nav-button" onClick={handleSignUp}>
                  SignUp
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-button" onClick={handleLogin}>
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
