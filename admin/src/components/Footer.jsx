import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';  
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <Container>
        <Row className="py-4">
        
          <Col md={4} className="mb-3 text-center text-md-start">
            <img 
              src={logo} 
              alt="Job Portal Logo" 
              className="footer-logo mb-2" 
            />
            <p>Your trusted partner for finding the best jobs and top talent.</p>
          </Col>

      
          <Col md={4} className="mb-3 text-center text-md-start">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Jobs</a></li>
              <li><a href="/">Recruiters</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Contact</a></li>
            </ul>
          </Col>

         
          <Col md={4} className="mb-3 text-center text-md-start">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        <hr />
        <p className="text-center">&copy; 2025 Job Portal. All rights reserved.Designed By jai</p>
      </Container>
    </footer>
  );
};

export default Footer;
