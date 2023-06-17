import React, { useEffect, useState } from 'react';

export const NavBar = ({ authent }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

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
    alert('Logged Out');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ height: '80px' }}>
        <a className="navbar-brand text-white" style={{ fontSize: '30px' }} href="/">
          Home
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {authenticated ? (
              <li className=" d-flex ">
                <span >
                  <p className="text-white mr-2 "  style={{marginTop:'15px'}}>{email}</p>
                </span>
                <button className="btn btn-dark" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/signup">
                    SignUp
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
