import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
  import NavBar from '../components/NavBar';
  import Footer from '../components/Footer';

  const Signup = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '', type: 'normal' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
      setError('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!credentials.username || !credentials.password || !['normal', 'premium'].includes(credentials.type)) {
        setError('All fields are required');
        return;
      }
      setIsLoading(true);
      try {
        await axios.post('http://localhost:5000/api/auth/recruiter/register', credentials);
        alert('Registration successful! Please log in.');
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Signup failed');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Container className="flex-grow-1 form-container">
          <Card className="mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Recruiter Signup</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" value={credentials.username} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={credentials.type} onChange={handleChange}>
                    <option value="normal">Normal</option>
                    <option value="premium">Premium</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Form>
              <p className="text-center mt-3">
                Have an account? <a href="/login">Log in</a>
              </p>
            </Card.Body>
          </Card>
        </Container>
        <Footer />
      </div>
    );
  };

  export default Signup;