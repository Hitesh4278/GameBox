import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from '../Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginGoogle } from './LoginGoogle';
import '../../css/Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: process.env.REACT_APP_BACKEND_URL + 'login',
      data: {
        email,
        password,
      },
    };

    axios(config)
      .then((result) => {
        setIsLoggedIn(true);
        alert("Login Successful");

        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('email', email);
        navigate('/');
      })
      .catch((error) => {
        alert("Please Enter Correct Details!!");
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar authent={authenticated} />
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="button">Submit</button>
            <Link to="/signup">
              <button className="button" >New User</button>
            </Link>
            <Link to="/forgot-password">
              <button className="button">Forgot Password?</button>
            </Link>
          </div>
        </form>
        <div className="login-options">
          <LoginGoogle />
        </div>
      </div>
    </div>
  );
};
