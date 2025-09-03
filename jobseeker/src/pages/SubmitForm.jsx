import React, { useState, useEffect } from 'react';
     import axios from 'axios';
     import { jwtDecode } from 'jwt-decode';
     import { useNavigate } from 'react-router-dom';
     import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
     import NavBar from '../components/NavBar';
     import Footer from '../components/Footer';

     const SubmitForm = () => {
       const [formData, setFormData] = useState({
         name: '',
         email: '',
         address: '',
         experience: '',
         photo: null,
         resume: null,
         certifications: [],
       });
       const [isLoading, setIsLoading] = useState(false);
       const [error, setError] = useState('');
       const navigate = useNavigate();

       useEffect(() => {
         const token = localStorage.getItem('token');
         if (!token) {
           navigate('/login');
           return;
         }
         try {
           const decoded = jwtDecode(token);
           if (decoded.role !== 'user') throw new Error('Invalid role');
         } catch (err) {
           localStorage.removeItem('token');
           navigate('/login');
         }
       }, [navigate]);

       const handleChange = (e) => {
         const { name, value, files } = e.target;
         if (name === 'certifications') {
           const fileArray = Array.from(files);
           const validFiles = fileArray.filter(file => {
             const isValidType = ['application/pdf', 'image/jpeg'].includes(file.type);
             const isValidSize = file.size <= 5 * 1024 * 1024;
             if (!isValidType) setError('Certifications must be PDF or JPG');
             if (!isValidSize) setError('Certification files must be under 5MB');
             return isValidType && isValidSize;
           });
           setFormData({ ...formData, [name]: validFiles });
         } else if (files) {
           const file = files[0];
           if (name === 'photo' && file) {
             const isValidType = file.type.startsWith('image/');
             const isValidSize = file.size <= 2 * 1024 * 1024;
             if (!isValidType) setError('Photo must be an image');
             if (!isValidSize) setError('Photo must be under 2MB');
             setFormData({ ...formData, [name]: isValidType && isValidSize ? file : null });
           } else if (name === 'resume' && file) {
             const isValidType = file.type === 'application/pdf';
             const isValidSize = file.size <= 5 * 1024 * 1024;
             if (!isValidType) setError('Resume must be a PDF');
             if (!isValidSize) setError('Resume must be under 5MB');
             setFormData({ ...formData, [name]: isValidType && isValidSize ? file : null });
           }
         } else {
           setFormData({ ...formData, [name]: value });
           setError('');
         }
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         setError('');
         if (!formData.resume || !formData.name || !formData.email || !formData.address || !formData.experience) {
           setError('All fields except photo and certifications are required');
           return;
         }
         const data = new FormData();
         Object.keys(formData).forEach(key => {
           if (Array.isArray(formData[key])) {
             formData[key].forEach(file => data.append(key, file));
           } else if (formData[key]) {
             data.append(key, formData[key]);
           }
         });
         setIsLoading(true);
         try {
           await axios.post('http://localhost:5000/api/users/submit', data, {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
           });
           alert('Details submitted successfully!');
           setFormData({
             name: '',
             email: '',
             address: '',
             experience: '',
             photo: null,
             resume: null,
             certifications: [],
           });
           document.querySelectorAll('input[type="file"]').forEach(input => (input.value = ''));
         } catch (err) {
           setError(err.response?.data?.message || 'Submission failed');
         } finally {
           setIsLoading(false);
         }
       };

       return (
         <div className="d-flex flex-column min-vh-100">
           <NavBar />
           <Container className="flex-grow-1 form-container">
             <Card>
               <Card.Body>
                 <h2 className="text-center mb-4">Submit Your Details</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                   <Form.Group className="mb-3">
                     <Form.Label>Name</Form.Label>
                     <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Address</Form.Label>
                     <Form.Control name="address" value={formData.address} onChange={handleChange} required />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Experience</Form.Label>
                     <Form.Control as="textarea" name="experience" value={formData.experience} onChange={handleChange} required rows={4} />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Photo (Max 2MB)</Form.Label>
                     <Form.Control type="file" name="photo" onChange={handleChange} accept="image/*" />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Resume (PDF, Max 5MB)</Form.Label>
                     <Form.Control type="file" name="resume" onChange={handleChange} accept="application/pdf" required />
                   </Form.Group>
                   <Form.Group className="mb-3">
                     <Form.Label>Certifications (PDF/JPG, Max 5MB each)</Form.Label>
                     <Form.Control type="file" name="certifications" onChange={handleChange} multiple accept="application/pdf,image/jpeg" />
                   </Form.Group>
                   <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
                     {isLoading ? 'Submitting...' : 'Submit'}
                   </Button>
                 </Form>
               </Card.Body>
             </Card>
           </Container>
           <Footer />
         </div>
       );
     };

     export default SubmitForm;