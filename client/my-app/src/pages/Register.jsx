import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'
import { registerRoute } from '../api/ApiRoutes'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
export const Register = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [pnum, setPnum] = useState('');
  const [driver, setDriver] = useState('passenger');
  const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestJson = { username: user, password: pwd, email: email, phone: pnum, isDriver: driver }
    console.log(requestJson)
    const { data } = await axios.post(registerRoute, requestJson)
    console.log(data);
    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    if (data.status === "Success") {
      navigate("/")
    }
  }




  return (
    <div style={{ padding: "80px" }}>
      
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
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId='Username'>
            <Form.Label>
              Username:
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your Username'
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
              placeholder='Enter Your Password'
              value={pwd}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId='PhoneNumber'>
            <Form.Label>
              Phone Number:
            </Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Your Phone Number'
              value={pnum}
              min="0"
              autoComplete="off"
              onChange={(e) => setPnum(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <br />
          <FormLabel>Are you a driver or passenger</FormLabel>
          <Form.Group controlId='Isdriver'>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="passenger"
                name="radio-buttons-group">
                <FormControlLabel value="driver" control={<Radio />} label="Driver" onChange={(e) => setDriver(e.target.value)} />
                <FormControlLabel value="passenger" control={<Radio />} label="Passenger" onChange={(e) => setDriver(e.target.value)} />
              </RadioGroup>
            </FormControl>
          </Form.Group>
          <br />
          <center>
            <Button type='submit' variant='primary' onClick={handleSubmit}> Create Account </Button>
          </center>

        </Form>
      </FormContainer>
      <ToastContainer />
    </div>

  )
}
