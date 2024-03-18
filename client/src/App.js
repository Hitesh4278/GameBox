import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { GamePage} from './components/GamePage';
import { ReviewPage } from './components/ReviewPage';
import { News } from './components/News';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/gamepage/:gameId" element={<GamePage />} />
          <Route path="/reviewPage/:gameId" element={<ReviewPage/>}/> 
          <Route path="/news" element={<News/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
