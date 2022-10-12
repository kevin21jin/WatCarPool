import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Header = () => {
  return (
    <header>
    <Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/home">WatCarpool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/home"><i class="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link href="/aboutus"><i class="fa-solid fa-circle-info"></i>About</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
            <Nav.Link href="/register"><i class="fa-regular fa-id-card"></i>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}