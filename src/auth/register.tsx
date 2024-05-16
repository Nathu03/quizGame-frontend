import React, { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      return;
    }

    // Submit the form if validation passes
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F0134D' }}>
      <div className="card" style={{ width: '25rem' }}>
        <div className="card-body">
          <main className="form-signin">
            <form onSubmit={submit}>
              <h2 className="text-wrap h2" style={{ color: '#000000' }}>
                <b>Welcome to QuizHub</b>
              </h2>
              <h1 className="h3 mb-3 fw-normal text-center" style={{ color: '#000000' }}>
                Register
              </h1>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Username
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control my-3"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="btn btn-warning w-100 py-2" type="submit">
                Sign Up
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Register;
