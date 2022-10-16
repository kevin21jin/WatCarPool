import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FormContainer } from  '../components/FormContainer'
export const Register = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [pnum, setPnum] = useState('');
  return (
    <FormContainer>
      <h1>Sign Up:</h1>
      <Form >
      <Form.Group controlId='EmailAddress'>
         <Form.Label>
          Email Address:
          </Form.Label> 
        <Form.Control 
        type='email' 
        placeholder='Enter EmailAddress' 
        value={email}
        autoComplete = "off"
        onChange = {(e) => setEmail(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId='Username'>
         <Form.Label>
          Username:
          </Form.Label> 
        <Form.Control 
        type='text' 
        placeholder='Enter Username' 
        value={user}
        autoComplete = "off"
        onChange = {(e) => setUser(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId='Password'>
         <Form.Label>
          Password:
          </Form.Label> 
        <Form.Control 
        type='password' 
        placeholder='Enter Password' 
        value={pwd}
        autoComplete = "off"
        onChange = {(e) => setPwd(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId='PhoneNumber'>
         <Form.Label>
          Phone Number:
          </Form.Label> 
        <Form.Control 
        type='number' 
        placeholder='Enter Username' 
        value={pnum}
        autoComplete = "off"
        onChange = {(e) => setPnum(e.target.value)}>
        </Form.Control>
        </Form.Group><br />
        <Button type= 'submit' variant='primary'> Create Account </Button><br/>
      </Form>
    </FormContainer>
  )
}
