import React from 'react'
import { Header } from '../components/Header'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TripDetailModal from './TripDetailModal';
import "./Card.css";
import { ToastContainer, toast } from "react-toastify"

const GuestTrip = ({ trips, title = "Trips Available" }) => {

  const navigate = useNavigate()
  const SearchTrip = (e) => {
    navigate("/search")
  }

  const [modal, setModal] = useState(-1);
  const toggleModal = (index) => {
    setModal(index)
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };

  const joinError = () => {
    toast.error("ERROR: You must login first to join a trip", toastOptions)
  }

  const checkTime = (time) => {
    const curTime = Date.now()
    const departTime = new Date(time)
    return curTime < departTime
  }

  return (
    <>
      <Header />
      <div style={{ padding: "5rem 10rem 2.5rem 10rem" }}>
        <h1>
          {title}
          <Button style={{ marginLeft: "3em" }} type='submit' variant='primary' className='rounded' onClick={SearchTrip}>Search Trips</Button>
        </h1>
        <div className="border-top my-4"></div>
        {
          (trips.length === 0) ?
            <p style={{ fontSize: "20px" }}>Sorry, there are no available trips at the moment. Please try again later!</p>
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
                      {
                        (checkTime(trip.departTime)) ?
                          <Button id="join" variant="primary" className="rounded" onClick={joinError}>Join</Button>
                          :
                          <Button disabled id="join" variant="primary" className="rounded" onClick={joinError}>Join</Button>
                      }
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

export default GuestTrip