import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Header } from '../components/Header'
import PassengerTrip from '../components/PassengerTrip'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { getTripRoute } from '../api/ApiRoutes'

export const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() =>{
    async function fetchTrips(){
      const response = await axios.get(getTripRoute)
      setTrips(response.data)
    }
    fetchTrips()
  }, [])

  return (
    <>
      <Header />
      
      <div style={{padding: "80px"}}>
        <h1>Trips Available</h1>
        <Row>
          {trips.map((trip) => (
            <Col key={trip.description} sm={10} md={110} lg={10} xl={6} style={{ padding: 20 }}>
              <PassengerTrip trip={trip} />
            </Col>
          ))}
        </Row>
      </div>

    </>
  )
}
