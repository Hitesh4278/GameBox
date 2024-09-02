import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../Navbar/NavBar';
import { GoogleSignup } from './GoogleSignup';
import { Link } from 'react-router-dom';
import '../../css/SignUp.css'

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
        alert("Signed Up Successfull")
        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
        localStorage.setItem('email', email);
        navigate('/')

      })
      .catch((error) => {
        error = new Error();
      });
  }

  return (
    <div className='signUpDiv'>
      <NavBar authent={authenticated} />
      <div className=' no-scrollbar' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ marginTop: '100px' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ fontWeight: 'bold' }}>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '500px' }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{ fontWeight: 'bold' }}>Password</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-danger" onClick={handleSubmit}>Submit</button>
          <Link to="/login">
            <button className="btn btn-danger" style={{marginLeft :'5px'}}>Login</button>
          </Link>
        </form>
      </div>
      <div style={{ color: 'blue', display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <GoogleSignup />
      </div>
    </div>
  );
}