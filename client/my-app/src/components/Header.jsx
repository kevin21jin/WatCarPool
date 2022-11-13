import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Header = () => {
  console.log(localStorage.getItem('WatCarPool-User'))
  const [currentUser,setuser] = useState(JSON.parse(localStorage.getItem('WatCarPool-User')))
  const logout = () => {
    localStorage.setItem('WatCarPool-User', null)
    setuser(null)
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          {(currentUser == null) ?
          <Navbar.Brand href="/">WatCarpool</Navbar.Brand>
          :
          (currentUser.type === "driver")? 
          <Navbar.Brand href="/">WatCarpool Driver</Navbar.Brand>
          :
          <Navbar.Brand href="/">WatCarpool Passenger</Navbar.Brand>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto">
              <Nav.Link href="/"><i className="fa-solid fa-house"></i>{" Home"}</Nav.Link>
              <Nav.Link href="/aboutus"><i className="fa-solid fa-circle-info"></i>{" About"}</Nav.Link>
            </Nav> */}
            {(currentUser == null) ?
              <Nav className="ms-auto">
                <Nav.Link href="/login"><i className='fas fa-user'></i>Login</Nav.Link>
              </Nav>
              :
              <Nav className="ms-auto">
                <Nav.Link  onClick={logout}><i className='fas fa-user'>logout</i></Nav.Link>
              </Nav>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}