import React, { SyntheticEvent, useState } from 'react';
import './login_register.css';
import { useNavigate } from 'react-router-dom';

function Login(props: { setName: (name: string) => void; }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const content = await response.json();
        props.setName(content.name);
        console.log('Login successful');

        // Redirect to the home page using href="/"
        window.location.href = "/";
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <img className="mb-4" src="/image/auth/auth-logo.png" alt="" width="57" height="57" />
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
      </main>
    </div>
  );
}

export default Login;
