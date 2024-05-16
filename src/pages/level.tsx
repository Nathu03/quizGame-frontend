import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LevelPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getCategory = localStorage.getItem('selectedCategory');
    if (getCategory) {
      setSelectedCategory(getCategory);
    }
    
  }, []);

  const handleLevelSelection = (level: string) => {
    localStorage.setItem('selectedLevel', level);
    let life = 3;
    localStorage.setItem('life', life.toString());
    navigate(`/game`);
  };
  

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <button className="btn" style={{ color: '#F0134D' }} type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100' style={{ backgroundColor: '#F0134D' }}>
      <div className='card p-4' style={{ backgroundColor: '#EEE2DE' }}>
        <h2 style={{ color: '#000000' }}>You selected: <b>{selectedCategory}</b> category</h2>
        <h3 style={{ color: '#000000', marginBottom: '20px' }}>Choose Your Level</h3>
        <div className="btn-group">
          <button className="btn btn-warning  me-2"   onClick={() => handleLevelSelection('low')}><b>Low</b></button>
          <button className="btn btn-warning  me-2"   onClick={() => handleLevelSelection('medium')}><b>Medium</b></button>
          <button className="btn btn-warning  "   onClick={() => handleLevelSelection('hard')}><b>Hard</b></button>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
