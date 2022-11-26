import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useLocation } from "react-router-dom";
import { useState } from 'react'

export const SearchTripResult = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
    const [helper, changeHelp] = useState(0);
    const location = useLocation();
    let tripResult = location.state.tripResult;

    if (currentUser.type === "passenger") {
        return (
            <>
              <PassengerTrip trips = {tripResult} currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
            </>
        )
    } else if (currentUser.type === "driver") {
        return (
            <>
              <DriverTrip trips = {tripResult} currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
            </>
        )
    }
}