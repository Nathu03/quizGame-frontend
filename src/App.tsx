import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Login from './auth/login';
import Register from './auth/register';
import Home from './pages/home';
import Game from './pages/game';
import Category from './pages/category';
import Level from './pages/level';
import Timeout from './pages/timeout';
import Error from './pages/Error/404';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const content = await response.json();
          console.log('User data fetched successfully:', content);
          setName(content.name);
          setIsLoggedIn(true);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar name={name} setName={setName} />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setName={setName} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={<Home name={name} isLoading={isLoading} />} />
          <Route path="/game/:category/:level" element={<Game />} />
          <Route path="/category" element={<Category />} />
          <Route path="/level/:category" element={<Level />} />
          <Route path="/timeout" element={<Timeout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
