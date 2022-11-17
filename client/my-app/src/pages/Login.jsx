import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'
import { loginRoute } from '../api/ApiRoutes'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
export const Login = () => {
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
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

    const requestJson = { username: user, password: pwd }
    const { data } = await axios.post(loginRoute, requestJson);
    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    else if (data.status === "Success") {
      let userinfo = {
        userId: data.user.userID,
        username: data.user.username,
        email: data.user.email,
        phone: data.user.phone,
        type: data.user.type,
        joined_at: data.user.joinedAt
      }
      sessionStorage.setItem('WatCarPool-User', JSON.stringify(userinfo));
      console.log(userinfo)
      navigate("/home")
    }
  }

  
  return (
    <>
      <div style={{ padding: "20px" }}>
        <FormContainer>
          <h2 style={{ padding: "20px 0px 20px px" }}>Sign In</h2>
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
            <p style={{ fontSize: "16px" }}>Need a account?<br />
              <span className="line">
                <Link to='/register'>Register here!</Link>
              </span></p>
          </Form>
        </FormContainer>
      </div>

      <ToastContainer />
    </>

  )
}
