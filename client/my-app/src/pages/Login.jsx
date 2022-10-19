import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'
import { loginRoute } from '../api/ApiRoutes'
export const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestJson = {username: user, password: pwd}
    const { data } = await axios.post(loginRoute, requestJson);
    if(data.status === "Fail"){
      alert(data.errorMessage)
    }
    if(data.status === "Success"){
      alert("login in successful")
    }
  }


  return (
    <FormContainer>
      <br />
      <h1>Sign In</h1>
      <br />
      <Form >
        <Form.Group controlId='Username'>
          <Form.Label>
            Username:
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            value={user}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='Password'>
          <Form.Label>
            Password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={pwd}
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}>
          </Form.Control>
        </Form.Group>
        
        <br />
        <center>
        <Button type='submit' variant='primary' onClick={handleSubmit}> Login </Button><br />
        </center>
        <br />
        <p> Need a account?<br />
          <span className="line">
            {/*router link*/}
            <a href='../register'>Sign Up</a>
          </span></p>
      </Form>
    </FormContainer>
  )
}
