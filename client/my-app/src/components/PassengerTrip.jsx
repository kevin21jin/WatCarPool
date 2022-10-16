import React from 'react'
import { Card, Typography} from '@mui/material'

const PassengerTrip = ({trip}) => {
  return (
    <>
        <Card>
            <Typography variant="h5" component="div">
                {trip.from}
            </Typography>
        </Card>
    </>
  )
}

export default PassengerTrip