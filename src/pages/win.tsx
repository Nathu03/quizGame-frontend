import React from 'react';
import { Link } from 'react-router-dom';

const WinPage = () => {
  return (
    <div className="bg-success d-flex flex-column justify-content-center align-items-center vh-100 text-white">
      <h1 className="display-4 mb-4">Congratulations! You Win!</h1>
      <img
        src="https://placekitten.com/300/200"
        className="img-fluid rounded-circle mb-4"
        alt="Winner"
      />
      <p className="lead mb-4">You have successfully won the game. Well done!</p>
      <Link to="/" className="btn btn-light btn-lg">Play Again</Link>
    </div>
  );
};

export default WinPage;
