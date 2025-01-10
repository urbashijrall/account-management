import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Importing the CSS
import Header from './components/Header';
import Registration from './components/RegistrationPage';
import Login from './components/LoginPage';
import ManageAccounts from './components/ManageAccounts';

const App = () => {
  // Load accounts from localStorage or initialize an empty array
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = JSON.parse(localStorage.getItem('accounts'));
    return savedAccounts || [];
  });

  const [loggedInUser, setLoggedInUser] = useState(null); // Manage logged-in user state

  // Function to handle registering a new account
  const handleRegister = (newAccount) => {
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    // Save to localStorage
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  // Function to delete an account
  const handleDeleteAccount = (email) => {
    const updatedAccounts = accounts.filter(account => account.email !== email);
    setAccounts(updatedAccounts);
    // Save to localStorage
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  // Function to update an account's password
  const handleUpdatePassword = (email, newPassword) => {
    const updatedAccounts = accounts.map(account => 
      account.email === email ? { ...account, password: newPassword } : account
    );
    setAccounts(updatedAccounts);
    // Save to localStorage
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={<Registration onRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={
            <Login
              accounts={accounts}
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route
          path="/manage-accounts"
          element={
            <ManageAccounts
              accounts={accounts}
              onDeleteAccount={handleDeleteAccount}
              onUpdatePassword={handleUpdatePassword}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
