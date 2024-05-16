import React, { useEffect, useState } from 'react';

const Score = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/scores', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const content = await response.json();
          console.log('Scores fetched successfully:', content);
          setScores(content.scores);
          setIsLoading(false);
          setName('Narthanan');
        } else {
          console.error('Failed to fetch scores');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#F0134D', minHeight: '100vh' }}>
      <div className="container mt-4">
        <h5 className="text-center mb-4">Score Viewer</h5>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          </div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Coins</th>
                <th>Level</th>
                <th>Life Count</th>
                <th>Time Remaining</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(scores) && scores.length > 0 ? (
                scores.map((score) => (
                  <tr key={score.id}>
                    <td>{score.id}</td>
                    <td>{score.user ? score.user.name : name}</td>
                    <td className="fw-bold text-warning">{score.coins}</td>
                    <td>{score.level}</td>
                    <td>{score.life_count}</td>
                    <td>{score.time_remaining}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No scores available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Score;
