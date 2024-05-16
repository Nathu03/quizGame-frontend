import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  name: string;
  setName: (name: string) => void;
}

function Navbar(props: NavbarProps) {
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

  let menu;

  if (props.name === '') {
    menu = (
      <>
        <li><Link className="dropdown-item" to="/login">Login</Link></li>
        <li><Link className="dropdown-item" to="/register">Register</Link></li>
      </>
    );
  } else {
    menu = (
      <>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={logout}>Sign out</button></li>
      </>
    );
  }

  return (
    <header className="py-2 mb-2 border-bottom" style={{background: "#EEE2DE"}}>
      <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="dropdown">
          <h2 style={{ fontFamily: "YourChosenFont, sans-serif", margin: '0' }}>
            <Link to="/" className="text-dark" style={{ textDecoration: 'none' }}>
              <b>QuizHub</b>
            </Link>
          </h2>
        </div>

        <div className="d-flex align-items-center">
          <form className="w-100 me-3" role="search">
          </form>

          <div className="flex-shrink-0 dropdown">
            <a href="/#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <span style={{ color: "#000000" }}><b>{props.name}</b></span> <img src="./image/auth/apply-png--1600.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="userDropdown">
              {menu}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
