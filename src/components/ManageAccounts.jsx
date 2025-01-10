import React, { useState } from 'react';

const ManageAccounts = ({ accounts, onDeleteAccount, onUpdatePassword }) => {
  // State to manage which account's password is being updated
  const [passwordUpdateIndex, setPasswordUpdateIndex] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      onDeleteAccount(email);
    }
  };

  const handleUpdatePassword = (email) => {
    if (newPassword) {
      onUpdatePassword(email, newPassword);
      setNewPassword('');
      setPasswordUpdateIndex(null); // Hide the password input field after update
    } else {
      alert('Please enter a new password!');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Manage Accounts</h2>
      <div className="list-group">
        {accounts.map((account, index) => (
          <div key={account.email} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p>Email: {account.email}</p>

              {/* Show password update input field only for the selected account */}
              {passwordUpdateIndex === index && (
                <>
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-success mb-2"
                    onClick={() => handleUpdatePassword(account.email)}
                  >
                    Save Password
                  </button>
                </>
              )}
            </div>
            <div>
              {/* Show "Update" button only if password update is not in progress */}
              {passwordUpdateIndex !== index ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setPasswordUpdateIndex(index)} // Show input field when Update is clicked
                >
                  Update
                </button>
              ) : null}

              <button
                className="btn btn-danger ms-2"
                onClick={() => handleDelete(account.email)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAccounts;
