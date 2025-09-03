import React from 'react';
     import { Navbar, Nav, Container } from 'react-bootstrap';
     import { Link, useNavigate } from 'react-router-dom';
  import logo from '../assets/logo.png'
  import '../components/navbar.css'
     const NavBar = () => {
       const token = localStorage.getItem('token');
       const navigate = useNavigate();

       const handleLogout = () => {
         localStorage.removeItem('token');
         navigate('/login');
       };

       return (
         <Navbar  variant="dark" expand="lg" className="mb-4">
           <Container>
             <Navbar.Brand as={Link} to="/"><img className='image' src={logo}/></Navbar.Brand>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                 {!token && <Nav.Link as={Link} to="/signup">Signup</Nav.Link>}
                 {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                 {token && <Nav.Link as={Link} to="/submit">Submit Details</Nav.Link>}
               </Nav>
               {token && <Nav.Link onClick={handleLogout} className='nav-link ' >Logout</Nav.Link>}
             </Navbar.Collapse>
           </Container>
         </Navbar>
       );
     };

     export default NavBar;