import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Header } from '../components/Header'
import fakeTrips from '../fakeTrips'
import PassengerTrip from '../components/PassengerTrip'

export const Home = () => {
  return (
    <>
      <Header />
      <div style={{padding: "80px"}}>
        <h1>Trips Available</h1>
        <Row>
          {fakeTrips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <PassengerTrip trip={trip} />
            </Col>
          ))}
        </Row>
      </div>

    </>
  )
}
