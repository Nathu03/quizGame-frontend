import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TimeoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let currentLife = localStorage.getItem('life');
  
    if (currentLife) {
      currentLife = ((parseInt(currentLife || '3', 10) || 0) - 1).toString();
      // Ensure life does not exceed the maximum value of 3
      currentLife = Math.min(parseInt(currentLife, 10), 3).toString();
      localStorage.setItem('life', currentLife);
      if (parseInt(currentLife, 10) === 0) {
        navigate('/timeout');
      } else {
        navigate('/game');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  const lifeCount = localStorage.getItem('life') ? parseInt(localStorage.getItem('life') || '0', 10) : 0;

  const handlePostData = () => {
    // Get values from localStorage
    const coins = localStorage.getItem('coins');
    const score = localStorage.getItem('score');
    const level = localStorage.getItem('level');
    const life = localStorage.getItem('life');
    const timeRemaining = localStorage.getItem('timeRemaining');
    const selectedLevel = localStorage.getItem('selectedLevel');
    const selectedCategory = localStorage.getItem('selectedCategory');

// Making the fetch request
fetch('http://localhost:8000/api/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    coins,
    score,
    level,
    life_count: life,
    time_remaining: timeRemaining,
    selected_level: selectedLevel,
    selected_category: selectedCategory,
  }),
})
  .then(response => {
    // Handle response if needed
    console.log('Data sent successfully');
  })
  .catch(error => {
    // Handle error if occurred
    console.error('Error sending data:', error);
  });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F0134D' }}>
      <div className="card p-4" style={{ background: "#EEE2DE" }}>
        <h2 style={{ color: '#000000' }}>{lifeCount > 0 ? 'Timeout: Session has expired' : 'Game Over'}</h2>
        {lifeCount > 0 ? (
          <Link to="/game" className="btn btn-warning my-2">Try Again</Link>
        ) : (
          <Link to="/" className="btn btn-warning my-2">Go to home</Link>
        )}
      </div>
    </div>
  );
};

export default TimeoutPage;
