import React from 'react';
import { Link } from 'react-router-dom';

const TimeoutPage = () => {
  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 style={{ color: 'yellow' }}>Timeout: Session has expired</h2>
      <Link to="/" className="btn btn-warning my-2">
        Go to Home Page
      </Link>
    </div>
  );
};

export default TimeoutPage;
