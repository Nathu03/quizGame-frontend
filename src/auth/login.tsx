import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const content = await response.json();
        console.log('Login successful');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ backgroundColor: '#F0134D' }}>
      <div className="card" style={{ width: '25rem'}}>
        <div className="card-body my-3">
          <main className="form-signin">
            <form onSubmit={handleSubmit}>
              <h2 className="text-wrap h2" style={{ color: "#000000"}}><b>Welcome to QuizHub</b></h2>
              <h4 className="mb-3 text-center" style={{ color: "#000000"}}>Login</h4>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control my-3"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="btn btn-warning w-100 py-2 mb-3" type="submit">
                Sign in
              </button>
              <p className="text-center">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  Register here
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
