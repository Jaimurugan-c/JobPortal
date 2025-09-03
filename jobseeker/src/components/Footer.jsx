import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png"; // if you want to use your logo
  import '../components/footer.css'
const Footer = () => {
  return (
    <footer className=" pt-4 mt-auto">
      <Container>
        <Row className="mb-4">
       
          <Col md={4} className="mb-3">
            <img src={logo} alt="Job Portal Logo" style={{ width: "120px" }} />
            <p className="mt-2">
              Job Portal helps job seekers connect with recruiters easily.  
              Build your career with us!
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className=" text-decoration-none">Home</a></li>
              <li><a href="/jobs" className=" text-decoration-none">Jobs</a></li>
              <li><a href="/about" className="text-decoration-none">About</a></li>
              <li><a href="/contact" className=" text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@jobportal.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><FaFacebook /></a>
              <a href="#" className="text-white"><FaTwitter /></a>
              <a href="#" className="text-white"><FaLinkedin /></a>
              <a href="#" className="text-white"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center border-top pt-3">
            <p className="mb-0">&copy; 2025 Job Portal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
