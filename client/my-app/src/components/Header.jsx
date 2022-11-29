import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const [currentUser,setUser] = useState(JSON.parse(sessionStorage.getItem('WatCarPool-User')))
  const navigate = useNavigate()
  
  const account = () => {
    navigate("/account")
    window.location.reload(false)
  }

  const home = () => {
    navigate("/home")
    window.location.reload(false)
  }
  
  const logout = () => {
    sessionStorage.setItem('WatCarPool-User', null)
    setUser(null)
    navigate("/")
    window.location.reload(false)
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          {(currentUser == null) ?
          <Navbar.Brand href="/home">WatCarpool</Navbar.Brand>
          :
          (currentUser.type === "driver")? 
          <Navbar.Brand href="/home">WatCarpool Driver Center</Navbar.Brand>
          :
          <Navbar.Brand href="/home">WatCarpool Passenger Center</Navbar.Brand>
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {(currentUser == null) ?
              <Nav className="ms-auto">
                <Nav.Link href="/"><i className='fas fa-sign-in'>login</i></Nav.Link>
              </Nav>
              :
              <Nav className="ms-auto">
                <Nav.Link  onClick={home}><i className='fas fa-house'>home</i></Nav.Link>
                <Nav.Link  onClick={account}><i className='fas fa-user-circle'>account</i></Nav.Link>
                <Nav.Link  onClick={logout}><i className='fas fa-sign-out'>logout</i></Nav.Link>
              </Nav>
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}