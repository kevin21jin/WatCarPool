import React from 'react'
import { Header } from '../components/Header'
import { Card, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import "./Card.css";
import TripDetailModal from './TripDetailModal';

const DriverTrip = ({ trips, title = "Trips Available" }) => {

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
      <div style={{ padding: "5rem 10rem 2.5rem 10rem" }}>
        <h1>
          {title}
          <Button style={{ marginLeft: "3em" }} type='submit' variant='primary' className='rounded' onClick={SearchTrip}>Search Trips</Button>
        </h1>
        <div className="border-top my-4"></div>
        {
          (trips.length === 0) ?
            <p style={{ fontSize: "20px" }}>
              Sorry, there are no available trips at the moment. You can create one <Link to="/addtrip">here</Link>!
            </p>
            :
            <Row>
              {trips.map((trip, index) => (
                <Col key={index} sm={10} md={110} lg={10} xl={6} style={{ padding: 10 }}>
                  <Card border="secondary" className="cardClass" >
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

export default DriverTrip