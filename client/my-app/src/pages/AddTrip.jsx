import React from 'react';
import { createTripRoute, getVehiclesRoute } from '../api/ApiRoutes';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import {
    TextField,
    Box,
    MenuItem,
    FormControl,
    Select,
    OutlinedInput,
    InputAdornment,
    InputLabel
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import moment from 'moment';

export const AddTrip = () => {
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
            const response = await axios.post(getVehiclesRoute, requestJson)
            changeVehicles(response.data)
        }
        fetchMyVehicle()
    }, [currentUser])

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
        let realTime = moment(new Date(time)).format("YYYY/MM/DD HH:mm")
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
            navigate("/account")
        }
    }

    return (
        <>
            <div style={{ position: "center", marginTop: "50px", marginBottom: "50px" }}>
                <FormContainer>
                    <h1 style={{ textAlign: "center" }}>Create Trip</h1>
                    <br />
                    <Form>
                        <Form.Group controlId='Vehicle'>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Vehicle</InputLabel>
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
                        </Form.Group>
                        <p style={{ fontSize: "16px" }}>
                            Have not registered a vehicle? Register one <Link to='/addvehicle'>here</Link>!
                        </p>
                        <Form.Group controlId='Time&Price'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Departure Time"
                                    value={time}
                                    inputFormat="YYYY/MM/DD HH:mm"
                                    onChange={(newValue) => {
                                        changeTime(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} inputProps={{
                                        ...params.inputProps
                                    }} />}
                                />
                            </LocalizationProvider>
                            <FormControl sx={{ width: "calc(100% - 240px)", float: "right" }}>
                                <InputLabel>Price</InputLabel>
                                <OutlinedInput
                                    label="Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => changePrice(e.target.value)}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                        </Form.Group>
                        <br />
                        <Form.Group controlId='Origin'>
                            <FormControl fullWidth>
                                <TextField
                                    label="Origin"
                                    value={origin}
                                    onChange={(e) => changeOrigin(e.target.value)}
                                />
                            </FormControl>
                        </Form.Group>
                        <br />
                        <Form.Group controlId='Destination'>
                            <FormControl fullWidth>
                                <TextField
                                    label="Destination"
                                    value={dest}
                                    onChange={(e) => changeDest(e.target.value)}
                                />
                            </FormControl>
                        </Form.Group>
                        <br />
                        <Form.Group controlId='Description'>
                            <FormControl fullWidth>
                                <TextField
                                    label="Description (Optional)"
                                    multiline
                                    rows={5}
                                    value={description}
                                    onChange={(e) => changeDescription(e.target.value)}
                                />
                            </FormControl>
                        </Form.Group>

                        <br />
                        <center>
                            <Button type='submit' variant='primary' className="rounded" onClick={handleSubmit}>Create Trip</Button><br />
                        </center>
                    </Form>
                </FormContainer>
            </div>
            <ToastContainer />
        </>
    )
}