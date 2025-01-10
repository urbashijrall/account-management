import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const ManageAccounts = ({ accounts, setAccounts }) => {
  const [show, setShow] = useState(false);
  const [accountToUpdate, setAccountToUpdate] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const handleDelete = (account) => {
    if (window.confirm(`Are you sure you want to delete ${account.email}?`)) {
      const updatedAccounts = accounts.filter((acc) => acc.email !== account.email);
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    }
  };

  const handleUpdatePassword = (account) => {
    setAccountToUpdate(account);
    setShow(true);
  };

  const handleSavePassword = () => {
    if (!newPassword) {
      alert('Password cannot be empty!');
      return;
    }
    const updatedAccounts = accounts.map((acc) =>
      acc.email === accountToUpdate.email
        ? { ...acc, password: newPassword }
        : acc
    );
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    setShow(false);
    setNewPassword('');
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Manage Accounts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.email}>
              <td>{account.email}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleUpdatePassword(account)}
                >
                  Update Password
                </Button>
                <Button variant="danger" onClick={() => handleDelete(account)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Password Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSavePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAccounts;
