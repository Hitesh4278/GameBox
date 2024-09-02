import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/Signup/SignUp';
import { Login } from './components/Login/Login';
import { Home } from './components/Homepage/Home';
import { GamePage } from './components/Gamepage/GamePage';
import { ReviewPage } from './components/ReviewPage/ReviewPage';
import { News } from './components/News/News';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ForgotPassword } from './components/ResetPassword/ForgotPassword'
import { PasswordUpdate } from './components/ResetPassword/PasswordUpdate';


function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/gamepage/:gameId" element={<GamePage />} />
            <Route path="/reviewPage/:gameId" element={<ReviewPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id/:token" element={<PasswordUpdate />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
