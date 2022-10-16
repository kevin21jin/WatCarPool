import React from 'react'
import {Card} from 'react-bootstrap'

const Car = ({car}) => {
  return (
    <Card className='my-1 p-2 rounded'>
      <a href= {`/car/${car._id}`}>
        <Card.Img src={car.image} variant = "top"/>
      </a>
    </Card>
  )
}

export default Car