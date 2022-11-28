import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDriverTripsRoute, deleteTripRoute,finishTripRoute } from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'
import UpdateCard from './UpdateCard'
import "./Card.css";
import TripDetailModal from './TripDetailModal';
const DriverTrip = ({ trips, currentUser, helper, changeHelp }) => {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };

  const [mytrips, getMyTrips] = useState([])
  const [modal, setModal] = useState(-1);
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
      changeHelp(helper + 1)
    }
  }
  const toggleModal = (index) => {
    setModal(index)
  }
  const finishTrip = async (e, trip) => {
    e.preventDefault();
    const requestJson = {
      driverID: trip.driverID,
      vehicleID: trip.vehicleID,
      tripID: trip.tripID,
    }

    const { data } = await axios.post(finishTripRoute, requestJson);

    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    }
    else if (data.status === "Success") {
      changeHelp(helper + 1)
    }
  }

  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50xpx", paddingLeft: "10rem", paddingTop: "5rem" }}>Hi, {currentUser.username}</h1>
      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
        <Button style={{ marginBottom: "5em" }} type='submit' variant='primary' onClick={AddVehicles}> Add Vehicles </Button><br />
        <h1>
          My Trips
          <Button style={{ marginLeft: "5em" }} type='submit' variant='primary' onClick={AddTrips}> Add Trips </Button><br />
        </h1>
        <div className="border-top my-4"></div>
        {
          (mytrips.length === 0) ?
            <p style={{ fontSize: "20px" }}>You do not have a trip! Create one!</p>
            :
            <Row>
              {mytrips.map((trip, index) => (
                <UpdateCard key={index} index = {index} trip = {trip} deleteTrip = {deleteTrip} finishTrip = {finishTrip} toast = {toast} helper = {helper} changeHelp = {changeHelp}></UpdateCard>
              ))}
            </Row>
        }

        <h1 style={{ paddingTop: "5rem" }}>
          Trips Available
          <Button style={{ marginLeft: "5em" }} type='submit' variant='primary' onClick={SearchTrip}> Search Trips</Button>
        </h1>
        <div className="border-top my-4"></div>
        <Row>
          {trips.map((trip, index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
               <Card border="secondary" className="cardClass" >
                <Card.Header style={{ color: '#2DA8D8'}} className="card-header">{trip.origin} → {trip.destination}</Card.Header>
                <Card.Body>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text className="card-description">
                    {trip.description}
                  </Card.Text>
                  <React.Fragment>
                      <TripDetailModal 
                        open={modal} 
                        onClose={() => toggleModal(-1)} 
                        curTrip = {trip}
                        index={index}/>
                      <button className="open-button"
                        onClick={() => toggleModal(index)}>See More</button>
                  </React.Fragment>
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

export default DriverTrip