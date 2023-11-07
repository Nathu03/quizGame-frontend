import React from 'react';
import { Link } from 'react-router-dom';

interface HomeProps {
  name: string;
  isLoading: boolean;
}

function Home(props: HomeProps) {
  if (props.isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 rounded">
        <h2 style={{color:"yellow"}}className="text-center mb-4">Welcome to QuizHub</h2>
        <div className="d-grid gap-3 col-md-6 mx-auto">
          <Link to="/category" className="btn btn-warning btn-lg">Start</Link>
          <Link to="/score" className="btn btn-warning btn-lg">Score</Link>
          <Link to="/exit" className="btn btn-warning btn-lg">Exit</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
