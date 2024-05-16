import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreNav from './components/scoreNav';

function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();
  let timer: NodeJS.Timeout;

  useEffect(() => {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const level = localStorage.getItem('selectedLevel');

    if (selectedCategory && level) {
      if (selectedCategory === 'child') {
        if (level === 'medium') {
          setTimeRemaining(110);
        } else if (level === 'low') {
          setTimeRemaining(120);
        } else if (level === 'hard') {
          setTimeRemaining(100);
        }
      } else if (selectedCategory === 'adult') {
        if (level === 'low') {
          setTimeRemaining(80);
        } else if (level === 'medium') {
          setTimeRemaining(60);
        } else if (level === 'hard') {
          setTimeRemaining(40);
        }
      }
    } else {
      setTimeRemaining(60);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/game', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }
  
        const data = await response.json();
        console.log(data);
        setAnswer(data.solution);
        setQuestion(data.question);
        const solution: number = data.solution;
        const numbers: number[] = getRandomNumber(solution);
        setRandomNumbers(numbers);
        setIsLoading(false);

        startTimer();
      } catch (error: any) {
        console.error('Error fetching data:', (error as Error).message);
        setIsLoading(false);
      }
    };

    fetchData();
  
    return () => clearInterval(timer);
  }, []);
  
  const startTimer = () => {
    timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        const updatedTime = Math.max(prevTime - 1, 0);
        if (updatedTime === 0) {
          clearInterval(timer);
          navigate('/timeout');
        }
        return updatedTime;
      });
    }, 2000);
  };
  

  const getRandomNumber = (solution: number): number[] => {
    const uniqueNumbers: number[] = [solution];
    while (uniqueNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * 10);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    return uniqueNumbers.sort(() => Math.random() - 0.5);
  };

  const handleButtonClick = (number: number) => {
    if (number === answer) {
      let currentCoins = localStorage.getItem('coins');
      currentCoins = ((parseInt(currentCoins || '0', 10) || 0) + 100).toString();
      localStorage.setItem('coins', currentCoins);

      let currentLevel = localStorage.getItem('level');
      currentLevel = ((parseInt(currentLevel || '0', 10) || 0) + 1).toString();
      localStorage.setItem('level', currentLevel);

      let currentScore = localStorage.getItem('score');
      currentScore = ((parseInt(currentScore || '0', 10) || 0) + 10).toString();
      localStorage.setItem('score', currentScore);

      let currentLife = localStorage.getItem('life');
      currentLife = Math.min(((parseInt(currentLife || '0', 10) || 0) + 1), 3).toString();
      localStorage.setItem('life', currentLife);

      let currentTime = localStorage.getItem('timeRemaining');
      currentTime = ((parseInt(currentTime || '0', 10) || 0) - 5).toString();
      localStorage.setItem('timeRemaining', currentTime);

      navigate('/gamewin');
    } else {
      let currentCoins = localStorage.getItem('coins');
      currentCoins = ((parseInt(currentCoins || '0', 10) || 0) - 50).toString();
      localStorage.setItem('coins', currentCoins);

      let currentScore = localStorage.getItem('score');
      currentScore = ((parseInt(currentScore || '0', 10) || 0) - 5).toString();
      localStorage.setItem('score', currentScore);

      let currentLife = localStorage.getItem('life');
      currentLife = Math.min(((parseInt(currentLife || '0', 10) || 0) - 1), 3).toString();
      localStorage.setItem('life', currentLife);navigate('/gameover');
      
      let currentTime = localStorage.getItem('timeRemaining');
      currentTime = ((parseInt(currentTime || '0', 10) || 0) - 10).toString();
      localStorage.setItem('timeRemaining', currentTime);

      
    }
  };

  return (
    <>
      <ScoreNav timeRemaining={Math.max(timeRemaining, 0)} />
      <div className="game-container d-flex justify-content-center align-items-center vh-90 mx-2" style={{ backgroundColor: '#F0134D' }}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <button className="btn" style={{ backgroundColor: '#F0134D' }} type="button" disabled>
              <span className="spinner-border me-2" role="status" aria-hidden="true"></span>
              <span>Loading...</span>
            </button>
          </div>
        ) : (
          <div className="container-fluid my-3">
            <div className="row justify-content-center align-items-center h-90">
              <div className="col-lg-8 mt-4">
                <div className="card border-0 p-3" style={{ backgroundColor: '#FF6F5E' }}>
                  <div className="h2 text-bold text-dark fs-3 mb-4 text-center">Choose the correct answer:</div>
                  <div className="border border-dark border-5 p-4 mb-4 d-flex justify-content-center">
                    <img src={question} className="img-fluid" alt="game" />
                  </div>
                  <p className="h3 text-dark text-center">Answers</p>
                  <div className="d-flex justify-content-center flex-wrap">
                    {randomNumbers.map((number, index) => (
                      <button
                        className="btn btn-dark border border-warning my-3 mx-1"
                        key={index}
                        style={{ width: '150px' }}
                        onClick={() => handleButtonClick(number)}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-center"><b>Click the button to select your answer</b></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
