import React, { useState, useEffect } from 'react';
import './scoreNav.css'

const Navbar = (props) => {
  const [lifes, setLifes] = useState(0);
  const [scores, setScores] = useState(0);
  const [coins, setCoins] = useState(0);
  const [levels, setLevels] = useState(0);
  

  useEffect(() => {
    const storedCoins = parseInt(localStorage.getItem('coins') || '0', 10);
    const storedLevels = parseInt(localStorage.getItem('level') || '0', 10);
    const storedScores = parseInt(localStorage.getItem('score') || '0', 10);
    const storedLifes = parseInt(localStorage.getItem('life') || '0', 10);

    setCoins(storedCoins);
    setLevels(storedLevels);
    setScores(storedScores);
    setLifes(storedLifes);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="navbar navbar-expand-lg py-2 d-flex justify-content-between" style={{ backgroundColor: '#EEE2DE'}}>
          <div className="navbar-nav w-100 d-flex flex-wrap justify-content-center justify-content-lg-start">
            <div className="nav-item d-flex align-items-center me-lg-5">
              <img src="./image/icons/heart.png" alt="" style={{ width: '30px', marginRight: '2px' }} className="heart-icon mx-2" />
              <span className="nav-link">Life: {lifes}</span>
            </div>
            <div className="nav-item d-flex align-items-center me-lg-5">
              <img src="./image/icons/score.png" alt="" style={{ width: '32px', marginRight: '2px' }} className="score-icon" />
              <span className="nav-link">Score: {scores}</span>
            </div>
            <div className="nav-item d-flex align-items-center me-lg-auto time-icon-container">
              <img src="./image/icons/time.png" alt="" style={{ width: '28px', marginRight: '2px' }} className="time-icon" />
              <span className="nav-link">Time Remaining: {Math.round(props.timeRemaining)} seconds remaining</span>
            </div>
            <div className="nav-item d-flex align-items-center me-lg-5 coin-icon-container">
              <img src="./image/icons/coin.png" alt="" style={{ width: '28px', marginRight: '2px' }} className="coin-icon" />
              <span className="nav-link">Coins: {coins}</span>
            </div>
            <div className="nav-item d-flex align-items-center level-icon-container">
              <img src="./image/icons/level.png" alt="" style={{ width: '28px', marginRight: '2px' }} className="level-icon" />
              <span className="nav-link">Level: {levels}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Navbar;
