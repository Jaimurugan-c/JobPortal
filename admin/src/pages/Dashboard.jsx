import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [recruiterType, setRecruiterType] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'recruiter') throw new Error('Invalid role');
      setRecruiterType(decoded.type);
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch users');
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="flex-grow-1">
        <Card className="mt-4">
          <Card.Body>
            <h2 className="text-center mb-4">Recruiter Dashboard</h2>
            <p className="text-center">Logged in as: {recruiterType} Recruiter</p>
            <Button variant="danger" onClick={handleLogout} className="mb-4">Logout</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading ? (
              <p>Loading...</p>
            ) : users.length === 0 ? (
              <p>No applicants found.</p>
            ) : (
              users.map(user => (
                <Card key={user.id} className="dashboard-card">
                  <Card.Body>
                    <h5>Applicant</h5>
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Resume:</strong> {user.resume ? <a href={`http://localhost:5000${user.resume}`} target="_blank" rel="noopener noreferrer">View</a> : 'N/A'}</p>
                    {recruiterType === 'premium' && (
                      <>
                        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                        {user.photo && <img src={`http://localhost:5000${user.photo}`} alt="Photo" className="user-photo mb-2" />}
                        <p><strong>Experience:</strong> {user.experience || 'N/A'}</p>
                        {user.certifications && user.certifications.length > 0 && (
                          <p><strong>Certifications:</strong>
                            {user.certifications.map((cert, index) => (
                              <a key={index} href={`http://localhost:5000${cert}`} target="_blank" rel="noopener noreferrer" className="me-2">Cert {index + 1}</a>
                            ))}
                          </p>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              ))
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;