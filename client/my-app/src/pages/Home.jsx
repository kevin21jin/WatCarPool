import React from 'react'
import './Pagination.css'
import GuestTrip from '../components/GuestTrip'
import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { getTripsRoute } from '../api/ApiRoutes'
import { Pagination } from '@mui/material'

export const Home = () => {
  const [trips, setTrips] = useState([]);
  const [helper, changeHelp] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const postPerpage = 10;
  const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
  const indexOfLastPost = curPage * postPerpage;
  const indexOfFirstPost = indexOfLastPost - postPerpage;
  const paginate = (ChangeEvent, page) => {
    setCurPage(page);
  }
  const totalPage = Math.max(Math.ceil(trips.length / postPerpage), 1);
  useEffect(() => {
    async function fetchTrips() {
      const response = await axios.get(getTripsRoute)
      setTrips(response.data)
    }
    fetchTrips()
  }, [helper])

  const currentPost = trips.slice(indexOfFirstPost, indexOfLastPost)

  if (currentUser == null) {
    return (
      <>
        <GuestTrip trips={currentPost} />
        <div className='Pagination'>
          <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
        </div>
      </>
    )
  }
  else if (currentUser.type === "passenger") {
    return (
      <>
        <PassengerTrip trips={currentPost} currentUser={currentUser} helper={helper} changeHelp={changeHelp} />
        <div className='Pagination'>
          <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
        </div>
      </>
    )
  }
  else if (currentUser.type === "driver") {
    return (
      <>
        <DriverTrip trips={currentPost} />
        <div className='Pagination'>
          <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
        </div>
      </>
    )
  }

}
