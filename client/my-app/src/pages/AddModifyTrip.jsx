import React from 'react'
import { createTripRoute, getVehicle } from '../api/ApiRoutes'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment'
export const AddModifyTrip = () => {
    const [origin, changeOrigin] = useState("")
    const [dest, changeDest] = useState("")
    const [time, changeTime] = useState(null)
    const [price, changePrice] = useState(0)
    const [description, changeDescription] = useState("")

    const [vehicles, changeVehicles] = useState([])
    const [vehicle, changeVehicle] = useState("")
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))

    useEffect(() => {
        async function fetchMyVehicle() {
            const requestJson = {
                driverID: currentUser.userId
            }
            const response = await axios.post(getVehicle, requestJson)
            console.log(response.data)
            changeVehicles(response.data)
        }
        fetchMyVehicle()
    }, [])

    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    };

    const handleChange = (e) => {
        changeVehicle(e.target.value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        let realTime = moment(new Date(time)).format("YYYY/MM/DD HH:MM")
        console.log(realTime)
        const requestJson = {
            driverID: currentUser.userId,
            vehicleID: vehicle,
            origin: origin,
            destination: dest,
            departTime: realTime,
            price: price,
            description: description
        }
        const { data } = await axios.post(createTripRoute, requestJson);
        if (data.status === "Fail") {
            toast.error(data.errorMessage, toastOptions);
        }
        else if (data.status === "Success") {
            navigate("/mainpage")
        }
    }


    return (
        <>
            <div style={{ margin: "50px" }}>
                <FormContainer>
                    <h1>Create trip:</h1>
                    <br />
                    <Form >
                        <h2>Step 1: Set your time and vehicle</h2>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date & Time"
                                value={time}
                                inputFormat="YYYY/MM/DD HH:MM"
                                onChange={(newValue) => {
                                    changeTime(newValue)
                                    console.log(time)
                                }}
                                renderInput={(params) => <TextField  {...params} inputProps={{
                                    ...params.inputProps,
                                    placeholder: ""
                                }} />}
                            />
                        </LocalizationProvider>

                        <Box sx={{ marginTop: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Vehicle</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Vehicle"
                                    value={vehicle}
                                    onChange={handleChange}
                                >
                                    {vehicles.map((v) => (
                                        <MenuItem key={v.vehicleID} value={v.vehicleID}>Vehicle {v.vehicleID} {v.model}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <br />
                        <p style={{ fontSize: "16px" }}>Have not register a vehicle?<br />
                            <span className="line">
                                <Link to='/addvehicle'>Add vehicle!</Link>
                            </span></p>
                        <br />
                        <h2>Step 2: Travel details</h2>
                        <br />
                        <Form.Group controlId='Origin'>
                            <Form.Label>
                                Origin
                            </Form.Label>
                            <Form.Control
                                type='text'
                                value={origin}
                                autoComplete="off"
                                onChange={(e) => changeOrigin(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <br />

                        <Form.Group controlId='Destination'>
                            <Form.Label>
                                Destination
                            </Form.Label>
                            <Form.Control
                                type='text'
                                value={dest}
                                autoComplete="off"
                                onChange={(e) => changeDest(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <br />

                        <Form.Group controlId='Price'>
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                autoComplete="off"
                                onChange={(e) => changePrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <br />
                        <br />
                        <br />
                        <h2>Step Optional: Travel details</h2>
                        <br />
                        <Form.Group controlId='Description'>
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                type='text'
                                value={description}
                                autoComplete="off"
                                onChange={(e) => changeDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <br />
                        <center>
                            <Button type='submit' variant='primary' onClick={handleSubmit}> Submit </Button><br />
                        </center>
                    </Form>
                </FormContainer>
            </div>
            <ToastContainer />
        </>
    )
}
