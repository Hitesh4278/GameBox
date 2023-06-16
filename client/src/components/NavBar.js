import React from 'react';

export const NavBar = ({ isLoggedIn, handleLogout, email }) => {
  const handleLogoutClick = (event) => {
    event.preventDefault();
    handleLogout();
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark " style={{ height: '80px' }}>
        <a className="navbar-brand text-white" style={{ fontSize: '30px' }} href="/">
         Home
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">{email}</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/" onClick={handleLogoutClick}>
                    Logout
                  </a>
                </li>
              </>
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