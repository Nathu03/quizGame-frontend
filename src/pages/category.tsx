import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = ({ isLoading }: { isLoading: boolean }) => {
  const handleCategorySelection = (selectedCategory: string) => {
    localStorage.setItem('selectedCategory', selectedCategory);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <button className="btn" style={{ color: '#F0134D' }} type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F0134D' }}>
      <div className="card p-4" style={{background: "#EEE2DE"}}>
        <div className="text-center">
          <h2><b>Choose Your Category</b></h2>
        </div>
        <div className="d-grid gap-3 col-md-6 mx-auto">
          <div className="btn-group d-flex justify-content-center" role="group" aria-label="Category buttons">
            <Link
              className="btn btn-warning me-2"
              to="/level"
              onClick={() => handleCategorySelection('child')}
            >
              <b>Child</b>
            </Link>
            <Link
              className="btn btn-warning me-2"
              to="/level"
              onClick={() => handleCategorySelection('adult')}
            >
              <b>Adult</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
