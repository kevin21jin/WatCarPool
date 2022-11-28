import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import EditableLabel from 'react-inline-editing'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import moment from 'moment'
import { updateTripRoute } from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import "./Card.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const UpdateCard = ({ index, trip, deleteTrip, toast, helper, changeHelp }) => {
    const [origin, changeOrigin] = useState(trip.origin)
    const [dest, changeDest] = useState(trip.destination)
    const [price, changePrice] = useState(trip.price)
    const [time, changeTime] = useState(trip.departTime)
    const [description, changeDescription] = useState(trip.description)
    const today = new Date();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    };

    const updateTrip = async (e) => {
        e.preventDefault()
        let realTime = moment(new Date(time)).format("YYYY/MM/DD HH:mm")
        const requestJson = {
            driverID: trip.driverID,
            vehicleID: trip.vehicleID,
            tripID: trip.tripID,
            origin: origin,
            destination: dest,
            departTime: realTime,
            price: price,
            description: description
        }
        const { data } = await axios.post(updateTripRoute, requestJson);
        if (data.status === "Fail") {
            toast.error(data.errorMessage, toastOptions);
        }
        else if (data.status === "Success") {
            toast.success("Trip updated successfully", toastOptions)
            changeHelp(helper + 1)
        }
    }

    return (
        <>
            <Col key={index} sm={10} md={110} lg={100} xl={6} style={{ padding: 10 }}>
                <Card style={{ width: '100%' }} className="cardClass">
                    <Card.Header className='card-header'>
                        <Card.Title style={{ color: "#2DA8D8", fontSize: "30px", height: "100%", textTransform: "capitalize" }}>
                            FROM: <div style={{ display: "inline-block" }}><EditableLabel text={origin} inputWidth="100%" inputMaxLength={25} onFocusOut={(newValue) => {
                                changeOrigin(newValue)
                            }}></EditableLabel></div>
                        </Card.Title>

                        <Card.Title style={{ color: "#2DA8D8", fontSize: "30px", height: "100%", textTransform: "capitalize" }}>
                            TO: <div style={{ display: "inline-block" }}><EditableLabel text={dest} inputWidth="100%" inputMaxLength={25} onFocusOut={(newValue) => {
                                changeDest(newValue)
                            }}></EditableLabel></div>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                            <Card.Subtitle style={{ fontSize: "20px" }} className="mb-2 text-muted">
                                <div style={{ marginBottom: "0.5rem" }}>Price:</div>
                                <OutlinedInput
                                    id="outlined-number"
                                    type="number"
                                    value={price}
                                    onChange={(e) => changePrice(e.target.value)}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </Card.Subtitle>

                            <Card.Subtitle style={{ fontSize: "20px" }} className="mb-2 text-muted">
                                <div style={{ marginBottom: "0.5rem" }}>Time:</div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={time}
                                        inputFormat="YYYY/MM/DD HH:mm"
                                        onChange={(newValue) => {
                                            changeTime(newValue)
                                        }}
                                        renderInput={(params) => <TextField {...params} inputProps={{
                                            ...params.inputProps
                                        }}
                                        />}
                                    />
                                </LocalizationProvider>
                            </Card.Subtitle>
                        </div>

                        <Card.Subtitle style={{ fontSize: "20px", marginTop: "1rem" }} className="mb-2 text-muted">Details:</Card.Subtitle>
                        <textarea placeholder="Add some details to your trip!" className="form-control" id="exampleFormControlTextarea1" rows="4"
                            style={{ display: "block", marginBottom: "1rem", resize: "none" }} defaultValue={description}
                            onChange={(e) => changeDescription(e.target.value)}>
                        </textarea>
                        <Button variant="primary" className="rounded" style={{ margin: "0.5rem" }} onClick={(e) => updateTrip(e, trip)}>Update</Button>
                        {
                            (today > new Date(trip.departTime)) ?
                                <Button disabled variant="primary" className="rounded" onClick={(e) => deleteTrip(e, trip)}>Delete</Button>
                                :
                                <Button variant="primary" className="rounded" onClick={(e) => deleteTrip(e, trip)}>Delete</Button>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default UpdateCard