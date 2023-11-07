import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Game() {
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [lifeCount, setLifeCount] = useState<number>(3);
  const [winCount, setWinCount] = useState<number>(0);
  const [isGameWin, setIsGameWin] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);
  const navigate = useNavigate();
  const { category, level } = useParams();

  const handleNextLevelClick = () => {
    navigate(`/game/${category}-child/${level}-medium`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/game', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const content = await response.json();
          console.log('Game data fetched successfully:', content);
          setQuestion(content.question);
          setSolution(content.solution.toString());
          setRandomNumbers(getRandomNumber(Number(content.solution)));
          setIsLoading(false);
        } else {
          console.error('Failed to fetch game data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
        setIsLoading(false);
      }
    };

    const handleNextLevelClick = () => {
      navigate(`/game/${category}-child/${level}-medium`);
    };

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
    }, 30000); // 30 seconds

    fetchData();

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [category, level]);

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
    if (isGameActive) {
      if (number.toString() === solution) {
        setWinCount(prevWinCount => prevWinCount + 1);
        setIsGameWin(true);
        // Navigate to the next level when the player wins
        navigate(`/game/${category}-child/${level}-medium`);
      } else {
        setLifeCount(prevLifeCount => prevLifeCount - 1);
        if (lifeCount - 1 === 0) {
          setIsGameActive(false);
        } else {
          alert(`Wrong answer! ${lifeCount - 1} ${lifeCount - 1 === 1 ? 'life' : 'lives'} remaining.`);
        }
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: Game data not found</div>;
  }

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100 text-white">
      {isGameWin && (
        <div className="bg-success d-flex flex-column justify-content-center align-items-center vh-100 text-white">
          <h1 className="display-4 mb-4">Congratulations! You Win!</h1>
          <img
            src="https://placekitten.com/300/200"
            className="img-fluid rounded-circle mb-4"
            alt="Winner"
          />
          <p className="lead mb-4">You have successfully won the game. Well done!</p>
          <div onClick={handleNextLevelClick} className="btn btn-light btn-lg">Next level</div>
        </div>
      )}
      {!isGameWin && isGameActive && (
        <>
          <div className="text-warning fs-3 mb-4">Choose the correct answer:</div>
          <div className="border border-warning p-4 mb-4">
            <img src={question} className="img-fluid" alt="game" />
          </div>
          <div className="d-flex">
            {randomNumbers.map((number, index) => (
              <button
                className="btn btn-warning my-2 mx-2"
                key={index}
                onClick={() => handleButtonClick(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <p>Life Count: {lifeCount}</p>
            <p>Win Count: {winCount}</p>
          </div>
        </>
      )}
      {!isGameWin && !isGameActive && (
        <div className="mt-3">
          Game Over. You lose!
        </div>
      )}
    </div>
  );
}

export default Game;
