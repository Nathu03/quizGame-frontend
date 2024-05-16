import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WinPage = () => {
  // Array of success quotes
  const successQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. - Helen Keller",
    "Whoever is happy will make others happy too. - Anne Frank",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
    "You will face many defeats in life, but never let yourself be defeated. - Maya Angelou",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "Life is either a daring adventure or nothing at all. - Helen Keller",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh"
  ];

  const [coins, setCoins] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [life, setLife] = useState<number>(0);
  const maxLife = 3;

  // Randomly select a quote
  const randomQuote =
    successQuotes[Math.floor(Math.random() * successQuotes.length)];

  useEffect(() => {
    // Fetch values from localStorage
    const coinsFromLocalStorage = parseInt(localStorage.getItem('coins') || '0', 10);
    const levelFromLocalStorage = parseInt(localStorage.getItem('level') || '0', 10);
    const scoreFromLocalStorage = parseInt(localStorage.getItem('score') || '0', 10);
    const lifeFromLocalStorage = parseInt(localStorage.getItem('life') || '0', 10);

    // Update state with retrieved values
    setCoins(coinsFromLocalStorage);
    setLevel(levelFromLocalStorage);
    setScore(scoreFromLocalStorage);
    setLife(lifeFromLocalStorage);
  }, []);

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center vh-100 text-white" style={{ backgroundColor: '#F0134D' }}>
      <h1 className="display-4 mb-4">Congratulations! You Win!</h1>
      <img
        src="./image/auth/winner.png"
        style={{ width: '300px', marginRight: '2px' }}
        className="img-fluid rounded-circle mb-4"
        alt="Winner"
      />
      <p className="lead mb-4">You have successfully won the game. Well done!</p>
      <div className="mb-4">
        <p>Coins: {coins}</p>
        <p>Level: {level}</p>
        <p>Score: {score}</p>
        <p>
          Life: {life}/{maxLife}
        </p>
      </div>
      <div className="quote">
        <h3><b>{randomQuote}</b></h3>
      </div>
      <Link to="/game" className="btn btn-light btn-lg">Go to next level</Link>
    </div>
  );
};

export default WinPage;
