import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    return (
        <div className="bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
            <h2 style={{ color: "yellow" }}>Choose Your Category</h2>
            <div className="btn-group" role="group" aria-label="Category buttons">
                <Link className="btn btn-warning me-2" to="/level/child">Child</Link>
                <Link className="btn btn-warning me-2" to="/level/adult">Adult</Link>
            </div>
        </div>
    );
};

export default CategoryPage;
