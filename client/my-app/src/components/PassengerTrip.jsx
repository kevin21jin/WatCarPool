import React from 'react'
import {Card, Button} from 'react-bootstrap'

const PassengerTrip = ({trip}) => {
  return (
    <>
        <Card style={{ width: '35rem'}} className="rounded">
            <Card.Body>
              <Card.Title style={{color: "#2DA8D8FF"}}>{trip.from} to {trip.to}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Time: {trip.dapartTime}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Model: {trip.model}</Card.Subtitle>
              <Card.Text>
              {trip.description}
              </Card.Text>
              <Button variant="primary" className="rounded">Join</Button>
            </Card.Body>
        </Card>
    </>
  )
}

export default PassengerTrip