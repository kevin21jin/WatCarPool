import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Header = () => {
  const [currentUser,setUser] = useState(JSON.parse(localStorage.getItem('WatCarPool-User')))

  const logout = () => {
    localStorage.setItem('WatCarPool-User', null)
    setUser(null)
    window.location.reload(false)
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          {(currentUser == null) ?
          <Navbar.Brand href="/">WatCarpool</Navbar.Brand>
          :
          (currentUser.type === "driver")? 
          <Navbar.Brand href="/">WatCarpool Driver Center</Navbar.Brand>
          :
          <Navbar.Brand href="/">WatCarpool Passenger Center</Navbar.Brand>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {(currentUser == null) ?
              <Nav className="ms-auto">
                <Nav.Link href="/"><i className='fas fa-user'></i>Login</Nav.Link>
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