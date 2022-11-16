import React from 'react'
import GuestTrip from '../components/GuestTrip'
import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { getTripRoute } from '../api/ApiRoutes'

export const Home = () => {
  const [trips, setTrips] = useState([]);
  const [helper, changeHelp] = useState(0);
  const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
  
  useEffect(() =>{
    async function fetchTrips(){
      const response = await axios.get(getTripRoute)
      setTrips(response.data)
    }
    fetchTrips()
  }, [helper])

  if(currentUser == null){
    return (
      <>
        <GuestTrip trips = {trips} helper={helper} changeHelp = {changeHelp}></GuestTrip>
      </>
    )
  }
  else if(currentUser.type === "passenger"){
    return (
      <>
        <PassengerTrip trips = {trips} currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
      </>
    )
  }
  else if(currentUser.type === "driver"){
    return (
      <>
        <DriverTrip trips = {trips} currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
      </>
    )
  }
  
}
