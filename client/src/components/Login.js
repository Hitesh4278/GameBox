import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: 'http://localhost:8000/login',
      data: {
        email,
        password,
      },
    };

    axios(config)
      .then((result) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} email={email} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '500px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-danger " style={{ marginRight: '10px' }}>
            Submit
          </button>
          <Link to="/signup">
            <span>
              <button className="btn btn-outline-danger">New User</button>
            </span>
          </Link>
          {isLoggedIn ? (
            <p className="text-danger">You are logged in successfully.</p>
          ) : (
            <p className="text-danger">You are not logged in.</p>
          )}
        </form>
      </div>
    </div>
  );
};
