import React from 'react'
import { Header } from '../components/Header'
import { Card } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'

const GuestTrip = ({trips, helper, changeHelp}) => {
  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", paddingLeft: "10rem", paddingTop: "5rem"}}>Welcome to WatCarPool</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
        <h1>Trips Available</h1>
        <Row>
          {trips.map((trip,index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px"}}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Details:</Card.Subtitle>
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

export default GuestTrip