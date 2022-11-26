import React from 'react'
import { useParams } from "react-router-dom"
import './Pagination.css'
import GuestTrip from '../components/GuestTrip'
// import PassengerTrip from '../components/PassengerTrip'
// import DriverTrip from '../components/DriverTrip'
import { useState } from 'react'
import { useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import axios from 'axios'
import { getUserRoute, getDriverUpcomingTripsRoute, getDriverTripsRoute } from '../api/ApiRoutes'
import { NotFound } from '../components/NotFound'

export const Account = () => {
    const { id } = useParams();
    const [response, setResponse] = useState("");
    const [user, setUser] = useState({});
    const [trips, setTrips] = useState([]);
    const [helper, changeHelp] = useState(0);
    // const [curPage, setCurPage] = useState(1);
    // const [postPerpage] = useState(4);
    // const indexOfLastPost = curPage * postPerpage;
    // const indexOfFirstPost = indexOfLastPost - postPerpage;
    // const paginate = (pageNumber) => setCurPage(pageNumber);

    useEffect(() =>{
        async function getUser(){
            const requestJson = { userID: id };
            const response = await axios.post(getUserRoute, requestJson);
            setResponse(response.data.status);
            setUser(response.data.user);
        }
        getUser();
        async function fetchTrips(){
            if (user.type === "driver") {
                const requestJson = { driverID: id };
                const response = await axios.post(getDriverTripsRoute, requestJson);
                console.log(response);
                setTrips(response.data);
            } else if (user.type === "passenger") {
                // const requestJson = { passengerID: id };
                // const response = await axios.post(getPassengerTripsRoute, requestJson);
                // console.log(response);
                // setTrips(response.data);
            }
        }
        console.log(user)
        console.log(response)
        if (response === "Success") {
            fetchTrips();
        }
    }, [helper])
    console.log(user)
    console.log(trips)

    if (response === "Success") {
        return (
            <>
            <div>
            <h1>{id}</h1>
            <h1>{user.username}</h1>
            </div>
            <GuestTrip trips = {trips}  helper={helper} changeHelp = {changeHelp}/>
            </>
            
        );
    } else if (response === "Fail") {
        return (
            <>
            <NotFound/>
            </>
        )
    }
}