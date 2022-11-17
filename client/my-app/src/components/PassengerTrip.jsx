import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { joinRoute } from '../api/ApiRoutes'
import { quitRoute } from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { useState, useEffect } from 'react'
import { getMyTripsRoute } from '../api/ApiRoutes'

const PassengerTrip = ({ trips, currentUser, helper, changeHelp }) => {
  console.log(trips)
  const [mytrips, getMyTrips] = useState([])
  

  useEffect(() =>{
    async function fetchMyTrips(){
      const requestJson = { 
        passengerID: currentUser.userId 
      }
      const response = await axios.post(getMyTripsRoute, requestJson)
      getMyTrips(response.data)
    }
    fetchMyTrips()
  }, [helper, currentUser])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };

  const joinTrip = async (e, trip) => {
    e.preventDefault();
    const requestJson = { 
      driverID: trip.driverID, 
      vehicleID: trip.vehicleID,
      tripID: trip.tripID,
      passengerID: currentUser.userId 
    }

    const { data } = await axios.post(joinRoute, requestJson);

    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    else if (data.status === "Success"){
      console.log("success")
      changeHelp(helper + 1)
    }
  }

  const quitTrip = async (e, trip) => {
    e.preventDefault();
    const requestJson = { 
      driverID: trip.driverID, 
      vehicleID: trip.vehicleID,
      tripID: trip.tripID,
      passengerID: currentUser.userId 
    }

    const { data } = await axios.post(quitRoute, requestJson);

    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    else if (data.status === "Success"){
      console.log("quit success")
      changeHelp(helper + 1)
    }
  }

  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", paddingLeft: "10rem", paddingTop: "5rem"}}>Hi, {currentUser.username}</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem", paddingBottom: "0rem" }}>
        <h1>My Trips</h1>
        <Row>
          {mytrips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px"}}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text>
                    {trip.description}
                  </Card.Text>
                  <Button variant="primary" className="rounded" onClick={(e) =>quitTrip(e, trip)}>Quit</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
        <h1>Trips Available</h1>
        <Row>
          {trips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px"}}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle stryle={{ fontSize: "16px"}} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px"}} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text>
                    {trip.description}
                  </Card.Text>
                  <Button variant="primary" className="rounded" onClick={(e) =>joinTrip(e, trip)}>Join</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <ToastContainer />
    </>
  )
}

export default PassengerTrip