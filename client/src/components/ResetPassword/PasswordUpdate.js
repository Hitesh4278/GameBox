import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/PasswordUpdate.css'; 

export const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `reset-password/${id}/${token}`, { password });
      setMessage('Password updated successfully!');
      setTimeout(() => navigate('/login'), 2000); // Slight delay before navigating
    } catch (error) {
      setMessage('An error occurred while updating the password. Please try again.');
    }
  };

  return (
    <div className="password-update-container">
      <h2>Update Password</h2>
      <form className="password-update-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && <p className="password-update-message">{message}</p>}
    </div>
  );
};
