import React from 'react'
import {Row, Col} from 'react-bootstrap'

import fakeTrips from '../fakeTrips'
import PassengerTrip from '../components/PassengerTrip'

export const Home = () => {
  return (
    <>
    <br/>
    <h1>Trips Available</h1>
    <br/>
    <Row>
      {fakeTrips.map((trip) => (
      <Col sm={10} md ={110} lg ={10} xl={6} style={{padding: 20}}>
          <PassengerTrip trip = {trip}/>
      </Col>
      ))}
    </Row>
    </>
  )
}
