import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const Login = ({ accounts, setLoggedInUser, loggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {loggedInUser ? (
          <div>
            <Alert variant="success" className="text-center">
              Welcome, {loggedInUser.email}!
            </Alert>
            <Button variant="danger" className="w-100 mt-3" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default Login;
