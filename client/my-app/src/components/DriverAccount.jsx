import React from 'react'
import { Header } from '../components/Header'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  getVehiclesRoute,
  getDriverTripsRoute,
  deleteTripRoute,
  getDriverUpcomingTripsRoute,
  getDriverRatingRoute
} from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'
import UpdateCard from './UpdateCard'
import "./Card.css";
import TripDetailModal from './TripDetailModal';
import { useNavigate } from 'react-router-dom'

const DriverAccount = ({ currentUser, helper, changeHelp }) => {
  const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };
  const [rating, setRating] = useState(0);
  const [trips, setTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const requestJson = { driverID: currentUser.userId };
      const responseRating = await axios.post(getDriverRatingRoute, requestJson);
      setRating(responseRating.data.rating);
      const responseVehicles = await axios.post(getVehiclesRoute, requestJson);
      setVehicles(responseVehicles.data);
      const responseTrips = await axios.post(getDriverTripsRoute, requestJson);
      setTrips(responseTrips.data);
      const responseUpcomingTrips = await axios.post(getDriverUpcomingTripsRoute, requestJson);
      setUpcomingTrips(responseUpcomingTrips.data);
    }
    fetchData();
  }, [helper, currentUser])

  const deleteTrip = async (e, trip) => {
    e.preventDefault();
    const requestJson = {
      driverID: trip.driverID,
      vehicleID: trip.vehicleID,
      tripID: trip.tripID,
    }

    const { data } = await axios.post(deleteTripRoute, requestJson);

    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    else if (data.status === "Success") {
      toast.success("Trip deleted successfully", toastOptions)
      changeHelp(helper + 1)
    }
  }
  const toggleModal = (index) => {
    setModal(index)
  }

  const AddTrips = (e) => {
    navigate("/addtrip")
  }

  const AddVehicles = (e) => {
    navigate("/addvehicle")
  }

  const SearchTrip = (e) => {
    navigate("/search")
  }

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <h1 style={{ fontSize: "50px", paddingTop: "2.5rem" }}>{currentUser.username}</h1>
        {
          (rating === null) ?
            <p>{currentUser.email} | {currentUser.phone} | <i className='fas fa-star' />0</p>
            :
            <p>{currentUser.email} | {currentUser.phone} | <i className='fas fa-star' />{rating}</p>
        }
      </div>


      <div style={{ paddingLeft: "10rem", paddingRight: "10rem" }}>
        <div style={{ paddingBottom: "3rem", paddingTop: "2rem" }}>
          <Button style={{ display: "inline-block" }} type='submit' variant='primary' className='rounded' onClick={AddVehicles}>Register Vehicle</Button>
          <Button style={{ marginLeft: "2em", display: "inline-block" }} type='submit' variant='primary' className='rounded' onClick={AddTrips}>Create Trip</Button>
          <Button style={{ marginLeft: "2em", display: "inline-block" }} type='submit' variant='primary' className='rounded' onClick={SearchTrip}>Search Trips</Button>
        </div>

        <h1>My Vehicles</h1>
        <div className="border-top my-4"></div>
        {
          (vehicles.length === 0) ?
            <p style={{ fontSize: "20px" }}>
              You do not have a vehicle! Register one <Link to="/addvehicle">here</Link>!
            </p>
            :
            <Row>
              {vehicles.map((vehicle, index) => (
                <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 10 }}>
                  <Card className="cardClass">
                    <Card.Header style={{ color: "#2DA8D8FF", fontSize: "25px" }} className="card-header">{vehicle.model}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle style={{ fontSize: "16px", height: "10px" }} className="mb-2 text-muted">
                        {(vehicle.capacity > 1) ?
                          <p>Capacity: {vehicle.capacity} people</p> :
                          <p>Capacity: {vehicle.capacity} person</p>
                        }
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
        }
      </div>
      <div style={{ paddingLeft: "10rem", paddingRight: "10rem", paddingTop: "3rem" }}>
        <h1>Upcoming Trips</h1>
        <div className="border-top my-4"></div>
        {
          (upcomingTrips.length === 0) ?
            <p style={{ fontSize: "20px" }}>You do not have any upcoming trips! Create one <Link to="/addtrip">here</Link>!</p>
            :
            <Row>
              {upcomingTrips.map((trip, index) => (
                <UpdateCard key={index} index={index} trip={trip} deleteTrip={deleteTrip} toast={toast} helper={helper} changeHelp={changeHelp}></UpdateCard>
              ))}
            </Row>
        }
      </div>
      <div style={{ paddingLeft: "10rem", paddingRight: "10rem", paddingTop: "3rem" }}>
        <h1>Trips History</h1>
        <div className="border-top my-4"></div>
        {
          (trips.length === 0) ?
            <p style={{ fontSize: "20px" }}>You have not created any trips! Create one <Link to="/addtrip">here</Link>!</p>
            :
            <Row>
              {trips.map((trip, index) => (
                <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 10 }}>
                  <Card className="cardClass">
                    <Card.Header style={{ color: '#2DA8D8' }} className="card-header">{trip.origin} → {trip.destination}</Card.Header>
                    <Card.Body>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                      <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: ${trip.price}</Card.Subtitle>
                      <React.Fragment>
                        <TripDetailModal
                          open={modal}
                          onClose={() => toggleModal(-1)}
                          trip={trip}
                          index={index} />
                        <button className="open-button"
                          onClick={() => toggleModal(index)}>See More</button>
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



export default DriverAccount