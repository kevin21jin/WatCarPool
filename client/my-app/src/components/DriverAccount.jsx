import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  getVehiclesRoute,
  getDriverTripsRoute, 
  deleteTripRoute, 
  getDriverUpcomingTripsRoute
} from '../api/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios'

const DriverAccount = ({ currentUser, helper, changeHelp }) => {

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
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requestJsonVehicles = { driverID: currentUser.userId };
      const responseVehicles = await axios.post(getVehiclesRoute, requestJsonVehicles);
      setVehicles(responseVehicles.data);
      const requestJsonTrips = { driverID: currentUser.userId };
      const responseTrips = await axios.post(getDriverTripsRoute, requestJsonTrips);
      setTrips(responseTrips.data);
      const requestJsonUpcomingTrips = { driverID: currentUser.userId };
      const responseUpcomingTrips = await axios.post(getDriverUpcomingTripsRoute, requestJsonUpcomingTrips);
      setUpcomingTrips(responseUpcomingTrips.data);
    }
    fetchData();
  }, [helper, currentUser])
  console.log(trips)
  console.log(vehicles)
  console.log(upcomingTrips)

  const AddTrips = (e) => {
    navigate("/addmodify")
  }

  const AddVehicles = (e) => {
    navigate("/addvehicle")
  }

  const navigate = useNavigate()

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
    else if (data.status === "Success"){
      console.log("success")
      changeHelp(helper + 1)
    }
  }

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <h1 style={{ fontSize: "50px", paddingTop: "2.5rem" }}>{currentUser.username}</h1>
        <p>{currentUser.email} | {currentUser.phone}</p>
      </div>
      <div style={{ paddingLeft: "10rem", paddingTop: "2rem" }}>
        <h1>
          My Vehicles
        </h1>
        <div className="border-top my-4"></div>
        {
          (vehicles.length === 0)?
          <p style={{ fontSize: "20px" }}>
            You do not have a vehicle! Register one <Link to="/addvehicle">here</Link>!
          </p>
          :
          <Row>
            {vehicles.map((vehicle, index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card style={{ width: '35rem' }} className="rounded">
                <Card.Body>
                  <Card.Title style={{ color: "#2DA8D8FF", fontSize: "30px" }}>{vehicle.model}</Card.Title>
                  {/* <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Details:</Card.Subtitle>
                  <Card.Text>
                    {trip.description}
                  </Card.Text> */}
                  {/* <Button variant="primary" className="rounded" onClick={(e) => deleteTrip(e, trip)}>Delete</Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
          </Row>
          }
        </div>
        <div style={{ padding: "10rem", paddingTop: "1rem" }}>
        <h1 stype={{paddingTop: "2.5rem"}}>
          Upcoming Trips
        </h1>
        <div className="border-top my-4"></div>
        {
          (trips.length === 0)?
          <p style={{ fontSize: "20px" }}>
            You do not have a trip! Create one <Link to="/addmodify">here</Link>!
          </p>
          :
          <Row>
          {upcomingTrips.map((trip, index) => (
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
                  <Button variant="primary" className="rounded" onClick={(e) => deleteTrip(e, trip)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        }
        
        <h1 style={{ paddingTop: "5rem" }}>
          Trips History
        </h1>
        <div className="border-top my-4"></div>
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

      <ToastContainer />
    </>
  )
}

export default DriverAccount