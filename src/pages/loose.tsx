import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WrongAnswerPage = () => {
  const [randomQuote, setRandomQuote] = useState<string>('');
  const navigate = useNavigate();

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "The secret of getting ahead is getting started. - Mark Twain",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. - Helen Keller",
    "Don’t let yesterday take up too much of today. - Will Rogers",
    "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "You are braver than you believe, stronger than you seem, and smarter than you think. - A.A. Milne",
    "Difficult roads often lead to beautiful destinations. - Unknown"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  // Retrieve values from localStorage or set default values
  const coins = parseInt(localStorage.getItem('coins') || '100', 10);
  const level = parseInt(localStorage.getItem('level') || '1', 10);
  const score = parseInt(localStorage.getItem('score') || '20', 10);
  const life = parseInt(localStorage.getItem('life') || '1', 10);
  const maxLife = 3;

  if(life == 0){
navigate('/timeout');
  }

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center vh-100 text-white" style={{ backgroundColor: '#F0134D' }}>
      <h1 className="display-4 mb-4">Oops! Wrong Answer!</h1>
      <img
        src="./image/auth/oopss.png"
        style={{ width: '300px', marginRight: '2px' }}
        className="img-fluid rounded-circle mb-4"
        alt="Wrong Answer"
      />
      
      <p className="mb-4">Unfortunately, that was the wrong answer.</p>
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
      <Link to="/game" className="btn btn-light btn-lg">Try Again</Link>
    </div>
  );
};

export default WrongAnswerPage;
