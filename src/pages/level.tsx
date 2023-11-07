import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const LevelPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const handleLevelSelection = (level: string) => {
    // Handle level selection logic if needed
    // For now, navigate to the /game route with the selected category and level
    navigate(`/game/${category}/${level}`);
  };

  return (
    <div className='bg-dark d-flex flex-column justify-content-center align-items-center vh-100'>
      <h2 style={{ color: 'yellow' }}>You selected: {category} category</h2>
      <h3 style={{ color: 'yellow', marginBottom: '20px' }}>Choose Your Level</h3>
      <div className="btn-group">
        <button className="btn btn-warning me-2" onClick={() => handleLevelSelection('low')}>Low</button>
        <button className="btn btn-warning me-2" onClick={() => handleLevelSelection('medium')}>Medium</button>
        <button className="btn btn-warning" onClick={() => handleLevelSelection('hard')}>Hard</button>
      </div>
    </div>
  );
};

export default LevelPage;
