import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ accounts, setLoggedInUser, loggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );
    if (user) {
      setLoggedInUser(user); // Set logged-in user state
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null); // Log out by clearing logged-in user state
    setEmail(''); // Reset email field
    setPassword(''); // Reset password field
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5" style={{ width: '600px', height: '500px' }}>
        <h1 className="text-center mb-4">Login Page</h1>
        {loggedInUser ? (
          // Show welcome message and logout button if user is logged in
          <div className="text-center">
            <div className="alert alert-success">
              <h2>Welcome, {loggedInUser.email}!</h2>
            </div>
            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          // Show login form if no user is logged in
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
