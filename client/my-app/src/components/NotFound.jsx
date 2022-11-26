import React from 'react'
import { Header } from '../components/Header'
import { Card } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'

export const NotFound = ({}) => {
  return (
    <>
      <Header />
      <h1 style={{ fontSize: "50px", textAlign: "center", paddingTop: "5rem"}}>404: Page Not Found</h1>
    </>
  )
}
