import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FormContainer } from  '../components/FormContainer'
import axios from 'axios'
import { registerRoute } from '../api/ApiRoutes'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export const Register = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [pnum, setPnum] = useState('');
  const [driver, setDriver] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestJson = {username: user, password: pwd, email: email, phone: pnum,  isDriver: driver}
    const { data } = await axios.post(registerRoute, requestJson);
    if(data.status === false){
      alert("Sign up unsuccessful")
    }
    if(data.status === true){
      alert("Sign up successful")
    }
  }




  return (
    <FormContainer>
      <h1><center>Sign Up</center></h1>
      <Form >
      <Form.Group controlId='EmailAddress'>
         <Form.Label>
          Email Address:
          </Form.Label> 
        <Form.Control 
        type='email' 
        placeholder='Enter Your Email Address' 
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
        placeholder='Enter Your Username' 
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
        placeholder='Enter Your Password' 
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
        placeholder='Enter Your Phone Number' 
        value={pnum}
        min="0"
        autoComplete = "off"
        onChange = {(e) => setPnum(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <FormLabel>Are you a driver or passenger</FormLabel>
        <Form.Group controlId='Isdriver'>
        <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="passenger"
        name="radio-buttons-group">
        <FormControlLabel value="driver" control={<Radio />} label="Driver" onChange = {(e) => setDriver(e.target.value)}/>
        <FormControlLabel value="passenger" control={<Radio />} label="Passenger" onChange = {(e) => setDriver(e.target.value)}/>
      </RadioGroup>
    </FormControl>
        </Form.Group>
        <br />
        <Button type= 'submit' variant='primary' onClick={handleSubmit}> Create Account </Button><br/>
      </Form>
    </FormContainer>
  )
}
