import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify"
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
  const [modal, setModal] = useState(-1);

  const navigate = useNavigate()

  const SearchTrip = (e) => {
    navigate("/search")
  }
  const toggleModal = (index) => {
    setModal(index)
  }

  return (
    <>
      <Header />
      <div style={{ padding: "10rem", paddingTop: "5rem" }}>
        <h1>
          Trips Available
          <Button style={{ marginLeft: "5em" }} type='submit' variant='primary' onClick={SearchTrip}> Search Trips</Button>
        </h1>
        <div className="border-top my-4"></div>
        <Row>
          {trips.map((trip, index) => (
            <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <Card border="secondary" className="cardClass" >
                <Card.Header style={{ color: '#2DA8D8' }} className="card-header">{trip.origin} → {trip.destination}</Card.Header>
                <Card.Body>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Time: {trip.departTime}</Card.Subtitle>
                  <Card.Subtitle style={{ fontSize: "16px" }} className="mb-2 text-muted">Price: {trip.price}</Card.Subtitle>
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
      </div>

      <ToastContainer />
    </>
  )
}

export default DriverTrip