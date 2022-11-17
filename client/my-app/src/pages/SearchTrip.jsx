import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Stack} from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField, Slider, Box, Typography } from '@mui/material'

function valuetext(value) {
    return `${value}`;
}

export const SearchTrip = () => {
    const [origin, changeOrigin] = useState("")
    const [dest, changeDest] = useState("")
    const [depDate, changeDepDate] = useState(null)
    const [arrDate, changeArrDate] = useState(null)
    const [priceRange, setPriceRange] = useState([0, 150])

    const handlePriceChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setPriceRange([Math.min(newValue[0], priceRange[1] - 10), priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + 10)]);
        }
    }

    return (
        <div style={{ margin: "50px" }}>
            <FormContainer>
                <h1>Search trip:</h1>
                <br />
                <Form>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2}>
                            <DateTimePicker
                                label="Departure Date"
                                value={depDate}
                                onChange={(newValue) => {
                                    changeDepDate(newValue)
                                }}
                                renderInput={(params) => <TextField  {...params} inputProps={{
                                    ...params.inputProps,
                                    placeholder: "mm/dd/yyyy hh:mm"
                                }} />}
                            />
                            <br />
                            <DateTimePicker
                                label="Arrival Date"
                                value={arrDate}
                                onChange={(newValue) => {
                                    changeArrDate(newValue)
                                }}
                                renderInput={(params) => <TextField  {...params} inputProps={{
                                    ...params.inputProps,
                                    placeholder: "mm/dd/yyyy hh:mm"
                                }} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <br />
                    <Box sx={{ width: 450}}> 
                        <Typography gutterBottom>Price Range</Typography>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            step={10}
                            marks
                            min={0}
                            max={150}
                        />
                    </Box>
                <br />
                <center>
                    <Button type='submit' variant='primary'> Search </Button>
                </center>
                </Form>

            </FormContainer>
        </div>
    )
}