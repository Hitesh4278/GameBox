import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from './NavBar';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const config = {
      method: "post",
      url: "http://localhost:8000/signup",
      data: {
        email,
        password,
      },
    }

    axios(config)
      .then((result) => {
        setRegister(true);
        window.location.href = '/login';
      })
      .catch((error) => {
        error = new Error();
      });
  }

  return (
    <div>
      <NavBar />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'10px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '500px' }} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-outline-danger" onClick={handleSubmit}>Submit</button>
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </form>
    </div>
    </div>
  );
}
