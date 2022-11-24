import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDriverTripsRoute } from '../api/ApiRoutes'
import axios from 'axios'

const DriverTrip = ({ trips, currentUser, helper, changeHelp }) => {

  const [mytrips, getMyTrips] = useState([])

  useEffect(() => {
    async function fetchDriverTrips() {
      const requestJson = {
        driverID: currentUser.userId
      }
      const response = await axios.post(getDriverTripsRoute, requestJson)
      getMyTrips(response.data)
    }
    fetchDriverTrips()
  }, [helper, currentUser])

  const navigate = useNavigate()

  const AddTrips = (e) => {
    navigate("/addmodify")
  }

  const AddVehicles = (e) => {
    navigate("/addvehicle")
  }

  const SearchTrip = (e) => {
    navigate("/searchtrip")
  }

  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", paddingLeft: "10rem", paddingTop: "5rem" }}>Hi, {currentUser.username}</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
      <Button style={{ marginBottom: "5em"}} type='submit' variant='primary' onClick={AddVehicles}> Add Vehicles </Button><br />
        <h1>
          My Trips
          <Button style={{ marginLeft: "5em"}} type='submit' variant='primary' onClick={AddTrips}> Add Trips </Button><br />
        </h1>
        <Row>
          {mytrips.map((trip, index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
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
        <h1 style={{ paddingTop: "5rem" }}>
          Trips Available
          <Button style={{ marginLeft: "5em"}} type='submit' variant='primary' onClick={SearchTrip}> Search Trips</Button>
        </h1>
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