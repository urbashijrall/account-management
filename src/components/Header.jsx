// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark p-3">
      <nav className="text-center">
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="mx-3">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/manage-accounts">
              <button className="btn btn-primary">Manage Accounts</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
