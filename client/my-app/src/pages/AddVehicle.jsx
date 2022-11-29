import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'
import { registerVehicleRoute } from '../api/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { NotFound } from '../components/NotFound'
import { FormControl, TextField } from '@mui/material'

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
        var valid = true;
        if (model === "") {
            toast.error("Model cannot be empty", toastOptions);
            valid = false;
        }
        if (capacity < 1) {
            toast.error("Capacity must be greater than 0", toastOptions);
            valid = false;
        } else if (capacity > 10) {
            toast.error("Please call the customer service", toastOptions);
            valid = false;
        }
        if (valid) {
            const requestJson = { capacity: capacity, model: model, driverID: currentUser.userId }
            const { data } = await axios.post(registerVehicleRoute, requestJson);
            if (data.status === "Fail") {
                toast.error(data.errorMessage, toastOptions);
            }
            else if (data.status === "Success") {
                toast.success("Vehicle registered successfully", toastOptions)
                navigate("/account")
            }
        }
    }
    if (currentUser == null || currentUser.type !== "driver") {
        return (
            <>
                <NotFound></NotFound>
            </>
        );
    } else {
        return (
            <>
                <div style={{ position: "center", marginTop: "50px", marginBottom: "50px" }}>
                    <FormContainer>
                        <h1 style={{ textAlign: "center" }} >Register Vehicle</h1>
                        <br />
                        <Form >
                            <Form.Group controlId='Model'>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Model"
                                        value={model}
                                        placeholder='e.g. Tesla Model Y'
                                        onChange={(e) => changeModel(e.target.value)}
                                    />
                                </FormControl>
                            </Form.Group>
                            <br />
                            <Form.Group controlId='Capacity'>
                                <FormControl fullWidth>
                                    <TextField
                                        type="number"
                                        label="Capacity"
                                        value={capacity}
                                        onChange={(e) => changeCapacity(e.target.value)}
                                    />
                                </FormControl>
                            </Form.Group>
                            <br />
                            <center>
                                <Button type='submit' variant='primary' className="rounded" onClick={handleSubmit}>Register Vehicle</Button><br />
                            </center>
                            <br />
                        </Form>
                    </FormContainer>
                </div>

                <ToastContainer />
            </>
        )
    }
}
