import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/NavBar.css';

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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ height: '80px', minWidth: '100%' }}>
        <button className="btn btn-dark" style={{ fontSize: '30px' }} onClick={handleHome}>
          Home
        </button>
        <button className="btn btn-dark" style={{ fontSize: '30px' }} onClick={handleNews}>
          News
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {authenticated ? (
              <li className="d-flex">
                <span>
                  <p className="text-white mr-2" style={{ marginTop: '15px' }}>{email}</p>
                </span>
                <button className="btn btn-dark" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-dark" onClick={handleSignUp}>
                    SignUp
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-dark" onClick={handleLogin}>
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
