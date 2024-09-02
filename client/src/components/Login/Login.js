import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from '../Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/Login.css'
import { LoginGoogle } from './LoginGoogle';


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
        alert("Login SuccessFull")

        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('email', email);
        navigate('/');
      })
      .catch((error) => {
        alert("Please Enter Correct Details!!")
        console.log(error);
      });
  };

  return (
    <div className='mainDiv'>
      <div >
        <NavBar authent={authenticated} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginTop: '100px', color: 'white' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" style={{ fontWeight: 'bold', color: 'white' }}>Email address</label>
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
              <label htmlFor="exampleInputPassword1" style={{ fontWeight: 'bold', color: 'white' }}>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-danger " style={{ marginRight: '10px' }}>
              Submit
            </button>
            <Link to="/signup">
              <button className="btn btn-danger">New User</button>
            </Link>
            {
              " "
            }
            <Link to="/forgot-password">
              <button className="btn btn-danger">Forgot Password ?</button>
            </Link>

            {/* <LoginGoogle /> */}
            {/* {isLoggedIn ? (
              <p className="text-dark">You are logged in successfully.</p>
            ) : (
              <p className="text-dark">You are not logged in.</p>
            )} */}
          </form>
        </div>
        <div style={{ color: 'blue' , display:'flex', justifyContent:'center', marginTop :'5px' }}>
          <LoginGoogle />
        </div>
      </div>
    </div>
  );
};
