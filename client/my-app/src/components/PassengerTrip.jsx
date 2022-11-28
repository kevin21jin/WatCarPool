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
import { getPassengerTripsRoute } from '../api/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import Rating from './Rating';

const PassengerTrip = ({ trips, currentUser, helper, changeHelp }) => {
  const [modal, setModel] = useState(-1);

  const toggleModal = (index) => {
    setModel(index)
  }

  const [mytrips, getMyTrips] = useState([])
  
  useEffect(() => {
    async function fetchMyTrips() {
      const requestJson = {
        passengerID: currentUser.userId
      }
      const response = await axios.post(getPassengerTripsRoute, requestJson)
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

  const compareDate = (str1) => {
    var tripday = new Date(str1);
    var today = new Date();
    if (tripday > today) {
      return true;
    } else {
      return false;
    }
  }

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
    else if (data.status === "Success") {
      toast.success("Trip joined successfully", toastOptions)
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
    else if (data.status === "Success") {
      toast.success("Trip quitted successfully", toastOptions)
      changeHelp(helper + 1)
    }
  }

  const rateTrip = async (e, trip, index) => {
    toggleModal(index)
    console.log(trip)
  }

  const navigate = useNavigate()

  const SearchTrip = (e) => {
    navigate("/search")
  }

  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", paddingLeft: "10rem", paddingTop: "5rem" }}>Hi, {currentUser.username}</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem", paddingBottom: "0rem" }}>
        <h1>My Trips</h1>
        <div className="border-top my-4"></div>
        {
          (mytrips.length === 0) ?
            <p style={{ fontSize: "20px" }}>You have not joined a trip yet:(</p>
            :
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
                      {(compareDate(trip.departTime)) ?
                        <Button id="quit" variant="primary" className="rounded" onClick={(e) => quitTrip(e, trip)}>Quit</Button>
                        :
                        <React.Fragment>
                          <Rating open={modal} onClose={() => toggleModal(-1)} trip={trip} currentUser={currentUser} index={index} />
                          <Button id="rate" variant="primary" className="rounded" onClick={(e) => rateTrip(e, trip, index)}>Rate</Button>
                        </React.Fragment>
                      }
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        }
      </div>

      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
        <h1>Trips Available
          <Button style={{ marginLeft: "5em" }} type='submit' variant='primary' onClick={SearchTrip}> Search Trips</Button>
        </h1>
        <div className="border-top my-4"></div>
        <Row>
          {trips.map((trip, index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px" }}>{trip.origin} → {trip.destination}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle stryle={{ fontSize: "16px" }} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text>
                    {trip.description}
                  </Card.Text>
                  <Button variant="primary" className="rounded" onClick={(e) => joinTrip(e, trip)}>Join</Button>
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