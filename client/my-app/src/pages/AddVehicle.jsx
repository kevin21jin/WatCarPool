import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'
import { loginRoute, registerVehicleRoute } from '../api/ApiRoutes'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
export const AddVehicle = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))

    const [model, changeModel] = useState("")
    const [capacity, changeCapacity] = useState(0)
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

        const requestJson = { capacity: capacity, model: model, driverID: currentUser.userId }
        const { data } = await axios.post(registerVehicleRoute, requestJson);
        if (data.status === "Fail") {
            toast.error(data.errorMessage, toastOptions);
        }
        else if (data.status === "Success") {
            console.log(data)
            navigate("/mainpage")
        }
    }
    return (
        <>
            <div style={{ padding: "20px" }}>
                <FormContainer>
                    <h2 style={{ padding: "20px 0px 20px px" }}>Add Vehicles:</h2>
                    <Form >
                        <Form.Group controlId='Model'>
                            <Form.Label>
                                Model:
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='eg. Tesla'
                                value={model}
                                autoComplete="off"
                                onChange={(e) => changeModel(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group controlId='Capacity'>
                            <Form.Label>
                                Capacity:
                            </Form.Label>
                            <Form.Control
                                type='number'
                                value={capacity}
                                autoComplete="off"
                                onChange={(e) => changeCapacity(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <br />
                        <center>
                            <Button type='submit' variant='primary' onClick={handleSubmit}> Submit </Button><br />
                        </center>
                        <br />
                    </Form>
                </FormContainer>
            </div>

            <ToastContainer />
        </>

    )
}
