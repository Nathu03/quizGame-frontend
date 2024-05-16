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
import ErrorPage from './pages/Error/PageNotFound';
import Win from './pages/win';
import Loose from './pages/loose';
import Score from './components/scoredata';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function AppRouter() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        {name ? (
          <>
            <Navbar name={name} setName={setName} />
            <Routes>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/" element={<Home name={name} isLoading={isLoading} setName={setName} />} />
              <Route path="/category" element={<Category isLoading={isLoading} />} />
              <Route path="/game" element={<Game />} />
              <Route path="/level" element={<Level />} />
              <Route path="/timeout" element={<Timeout />} />
              <Route path="/gamewin" element={<Win />} />
              <Route path="/gameover" element={<Loose />} />
              <Route path="/score" element={<Score />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default AppRouter;
