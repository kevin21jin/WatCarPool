import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { AddModifyTrip } from '../pages/AddModifyTrip'
import { Link, useNavigate } from 'react-router-dom'

const DriverTrip = ({ trips, currentUser }) => {
  const navigate = useNavigate()

  const AddTrips = (e) => {
    navigate("/addmodify")
  }

  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", paddingLeft: "10rem", paddingTop: "5rem" }}>Hi, {currentUser.username}</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
      <Button style={{ margin: "0 0 5rem 0 "}} type='submit' variant='primary' onClick={ AddTrips }> Add Trips </Button><br />
        <h1>Trips Available</h1>
        <Row>
          {trips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px" }}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text>
                    {trip.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default DriverTrip