import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface HomeProps {
  name: string;
  isLoading: boolean;
  setName: (name: string) => void;
}

function Home(props: HomeProps) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      props.setName('');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedLevel');
      localStorage.removeItem('timeRemaining');
      localStorage.removeItem('coins');
      localStorage.removeItem('life');
      localStorage.removeItem('score');
      localStorage.removeItem('level');
    };
  }, []);

  if (props.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <button className="btn" style={{ backgroundColor: '#F0134D' }} type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>
      </div>
    );
  }
  

  if (!props.name) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F0134D' }}>
      <div className='card' style={{background: "#EEE2DE"}}>
      <div className="border p-5 rounded text-center" style={{ color: '#00000', fontFamily: 'YourChosenFont, sans-serif' }}>
        <h1 className="h3 mb-4" style={{ fontSize: '2.5rem' }}>
          <b>Welcome to QuizHub</b>
        </h1>
        <div className="d-grid gap-4 col-md-6 mx-auto">
          <Link to="/category" className="btn btn-warning btn-lg">
           <b>Start</b>
          </Link>
          <Link to="/score" className="btn btn-warning btn-lg">
          <b>Score</b>
          </Link>
          <button onClick={logout} className="btn btn-warning btn-lg">
          <b>Exit</b>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
  
}

export default Home;
