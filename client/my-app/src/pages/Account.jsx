import React from 'react'
import './Pagination.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Pagination } from '../components/Pagination'
import { NotFound } from '../components/NotFound'
import DriverAccount from '../components/DriverAccount'

export const Account = () => {
    const [helper, changeHelp] = useState(0);
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'));
    if (currentUser == null) {
        return (
            <>
            <NotFound/>
            </>
        );
    } else if (currentUser.type === "driver") {
        return (
            <>
            <DriverAccount currentUser = {currentUser}  helper={helper} changeHelp = {changeHelp}/>
            </>
            
        );
    } else if (currentUser.type === "passenger") {
        
    }
}