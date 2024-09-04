import '../../css/SignUp.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../Navbar/NavBar';
import { GoogleSignup } from './GoogleSignup';
import { Link } from 'react-router-dom';


export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      method: "post",
      url: process.env.REACT_APP_BACKEND_URL + '/signup',
      data: {
        email,
        password,
      },
    }

    axios(config)
      .then((result) => {
        setRegister(true);
        alert("Signed Up Successfully");
        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('email', email);
        navigate('/');

      })
      .catch((error) => {
        error = new Error();
      });
  }

  return (
    <div>
      <NavBar authent={authenticated} />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <Link to="/login" className="login-link">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </form>
        <div className="google-signup-container">
          <GoogleSignup />
        </div>
      </div>
    </div>
  );
}
