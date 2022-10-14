import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FormContainer } from  '../components/FormContainer'
export const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form >
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
        </Form.Group><br />
        <Button type= 'submit' variant='primary'> Login </Button><br/>
        <p> Need a account?<br/>
        <span className="line">
          {/*router link*/}
          <a href='../register'>Sign Up</a>
          </span></p>
      </Form>
    </FormContainer>
  )
}
