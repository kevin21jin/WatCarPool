import React from 'react'
import {Row, Col} from 'react-bootstrap'
import cars from '../cars'
import Car from '../components/Car'

export const Home = () => {
  return (
    <>
    <h1>Car Pool</h1>
    <Row>
      {cars.map((car) => (
      <Col sm={10} md ={110} lg ={10} xl={5}>
          <Car car = {car}/>
      </Col>
      ))}
    </Row>
    </>
  )
}
