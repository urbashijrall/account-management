import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Registration from './components/RegistrationPage';
import Login from './components/LoginPage';
import ManageAccounts from './components/ManageAccounts';

const App = () => {
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = JSON.parse(localStorage.getItem('accounts'));
    return savedAccounts || [];
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Handle registering a new account
  const handleRegister = (newAccount) => {
    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  // Handle deleting an account
  const handleDeleteAccount = (email) => {
    const updatedAccounts = accounts.filter(account => account.email !== email);
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  // Handle updating an account's password
  const handleUpdatePassword = (email, newPassword) => {
    const updatedAccounts = accounts.map(account => 
      account.email === email ? { ...account, password: newPassword } : account
    );
    setAccounts(updatedAccounts);
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
              setAccounts={setAccounts}
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
