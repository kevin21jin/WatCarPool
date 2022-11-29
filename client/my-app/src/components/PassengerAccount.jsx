import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  getPassengerTripsRoute,
  getPassengerUpcomingTripsRoute
} from '../api/ApiRoutes'
import { quitRoute } from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'
import Rating from './Rating';
import TripDetailModal from './TripDetailModal';

const PassengerAccount = ({ currentUser, helper, changeHelp }) => {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  const [rateModal, setRateModal] = useState(-1);
  const toggleRateModal = (index) => {
    setRateModal(index)
  }

  const rateTrip = async (e, trip, index) => {
    toggleRateModal(index)
    console.log(trip)
  }

  const [moreModal1, setMoreModel1] = useState(-1);
  const toggleMoreModal1 = (index) => {
    setMoreModel1(index)
  }

  const [moreModal2, setMoreModel2] = useState(-1);
  const toggleMoreModal2 = (index) => {
    setMoreModel2(index)
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

  useEffect(() => {
    async function fetchData() {
      const requestJson = { passengerID: currentUser.userId };
      const responseTrips = await axios.post(getPassengerTripsRoute, requestJson);
      setTrips(responseTrips.data);
      const responseUpcomingTrips = await axios.post(getPassengerUpcomingTripsRoute, requestJson);
      setUpcomingTrips(responseUpcomingTrips.data);
    }
    fetchData();
  }, [helper, currentUser])

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <h1 style={{ fontSize: "50px", paddingTop: "2.5rem" }}>{currentUser.username}</h1>
        <p>{currentUser.email} | {currentUser.phone}</p>
      </div>
      <div style={{ paddingLeft: "10rem", paddingRight: "10rem" }}>
        <h1>Upcoming Trips</h1>
        <div className="border-top my-4"></div>
        {
          (upcomingTrips.length === 0) ?
            <p style={{ fontSize: "20px" }}>
              You do not have any upcoming trips! Join one <Link to="/home">here</Link>!
            </p>
            :
            <Row>
              {upcomingTrips.map((trip, index) => (
                <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 10 }}>
                  <Card className="cardClass">
                    <Card.Header style={{ color: '#2DA8D8' }} className="card-header">{trip.origin} → {trip.destination}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: ${trip.price}</Card.Subtitle>
                      <React.Fragment>
                        <TripDetailModal
                          open={moreModal1}
                          onClose={() => toggleMoreModal1(-1)}
                          trip={trip}
                          index={index} />
                        <button className="open-button"
                          onClick={() => toggleMoreModal1(index)}>See More</button>
                      </React.Fragment>
                      <Button id="quit" variant="primary" className="rounded" onClick={(e) => quitTrip(e, trip)}>Quit</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        }
      </div>
      <div style={{ paddingLeft: "10rem", paddingRight: "10rem", paddingTop: "3rem" }}>
        <h1>Trips History</h1>
        <div className="border-top my-4"></div>
        {
          (trips.length === 0) ?
            <p style={{ fontSize: "20px" }}>You have not joined any trips! Join one <Link to="/home">here</Link>!</p>
            :
            <Row>
              {trips.map((trip, index) => (
                <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
                  <Card className="cardClass">
                    <Card.Header style={{ color: '#2DA8D8' }} className="card-header">{trip.origin} → {trip.destination}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: ${trip.price}</Card.Subtitle>
                      <Card.Text className="card-description">
                        {trip.description}
                      </Card.Text>
                      <React.Fragment>
                        <TripDetailModal
                          open={moreModal2}
                          onClose={() => toggleMoreModal2(-1)}
                          trip={trip}
                          index={index} />
                        <button className="open-button"
                          onClick={() => toggleMoreModal2(index)}>See More</button>
                      </React.Fragment>
                      <React.Fragment>
                        <Rating open={rateModal} onClose={() => toggleRateModal(-1)} trip={trip} currentUser={currentUser} index={index} />
                        <Button id="rate" variant="primary" className="rounded" onClick={(e) => rateTrip(e, trip, index)}>Rate</Button>
                      </React.Fragment>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        }
      </div>

      <ToastContainer />
    </>
  )
}

export default PassengerAccount