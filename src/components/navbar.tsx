import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  name: string;
  setName: (name: string) => void;
}

function Navbar(props: NavbarProps) {
  const navigate = useNavigate();

  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    props.setName('');
    navigate('/login');
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
    <header className="py-3 mb-3 border-bottom bg-dark">
      <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="dropdown">
          {/* Dropdown content */}
        </div>

        <div className="d-flex align-items-center">
          <form className="w-100 me-3" role="search">
            {/* Search form */}
          </form>

          <div className="flex-shrink-0 dropdown">
            <a href="/#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <span style={{color:"white"}}>{props.name} </span>   <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
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
