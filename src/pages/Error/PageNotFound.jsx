import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="container-fluid p-0 d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        className="img-fluid w-100 h-100 position-relative"
        src="./image/home/404.png"
        alt="Page Not Found"
      />
      <Link to="/" className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x mb-4">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
