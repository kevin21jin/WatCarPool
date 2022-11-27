import React from 'react'
import './Pagination.css'
import GuestTrip from '../components/GuestTrip'
import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useState } from 'react'
import { useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import axios from 'axios'
import { getTripsRoute } from '../api/ApiRoutes'

export const Home = () => {
  const [trips, setTrips] = useState([]);
  const [helper, changeHelp] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [postPerpage] = useState(6);
  const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
  const indexOfLastPost = curPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const paginate = (pageNumber) => setCurPage(pageNumber);
  
  useEffect(() =>{
    async function fetchTrips(){
      const response = await axios.get(getTripsRoute)
      setTrips(response.data)
    }
    fetchTrips()
  }, [helper])
  const currentPost = trips.slice(indexOfFirstPost, indexOfLastPost)
  
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
        <PassengerTrip trips = {currentPost} currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
        <Pagination setCurPage={setCurPage} curPage ={curPage} postPerpage={postPerpage} totalPage = {trips.length} paginate ={paginate}></Pagination>
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
