import React from 'react'
import { Header } from '../components/Header'
import { Card } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'

const GuestTrip = ({trips, helper, changeHelp}) => {
  return (
    <>
      <Header />
      <div style={{ padding: "80px" }}>
        <h1>Welcome to WatCarPool</h1>
        <Row>
          {trips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF" }}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
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