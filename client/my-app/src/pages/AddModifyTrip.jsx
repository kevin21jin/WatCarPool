import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
export const AddModifyTrip = () => {
    const [origin, changeOrigin] = useState("")
    const [dest, changeDest] = useState("")
    const [time, changeTime] = useState(null)
    const [price, changePrice] = useState("")
    const [description, changeDescription] = useState("")

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

    }


    return (
        <>
            <div style={{ padding: "50px" }}>
                <FormContainer>
                    <h1>Create trip:</h1>
                    <br />
                    <Form >

                        <h2>Step 1: Set the time</h2>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Time"
                                value={time}
                                onChange={(newValue) => {
                                    changeTime(newValue)
                                }}
                                renderInput={(params) => <TextField  {...params} inputProps={{
                                    ...params.inputProps,
                                    placeholder: ""
                                }} />}
                            />
                        </LocalizationProvider>

                        <br />
                        <br />
                        <br />
                        <h2>Step 2: </h2>
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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                        </LocalizationProvider>

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
