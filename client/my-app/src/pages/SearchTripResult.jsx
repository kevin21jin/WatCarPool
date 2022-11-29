import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useLocation } from "react-router-dom";
import { useState } from 'react'
import { Pagination } from '@mui/material'
import GuestTrip from '../components/GuestTrip';

export const SearchTripResult = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
    const [helper, changeHelp] = useState(0);
    const location = useLocation();
    const [curPage, setCurPage] = useState(1);
    const postPerpage = 10;
    const indexOfLastPost = curPage * postPerpage;
    const indexOfFirstPost = indexOfLastPost - postPerpage;
    const paginate = (ChangeEvent, page) => {
        setCurPage(page);
      }
    let tripResult = location.state.tripResult;
    const currentPost = tripResult.slice(indexOfFirstPost, indexOfLastPost)
    const totalPage = Math.max(Math.ceil(tripResult.length / postPerpage), 1);
    if (currentUser == null) {
        return (
            <>
                <GuestTrip trips={currentPost} title="Search Result" />
                <div className='Pagination'>
                    <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
                </div>
            </>
        )
    } else if (currentUser.type === "passenger") {
        return (
            <>
                <PassengerTrip trips={currentPost} currentUser={currentUser} helper={helper} changeHelp={changeHelp} title="Search Result" />
                <div className='Pagination'>
                    <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
                </div>
            </>
        )
    } else if (currentUser.type === "driver") {
        return (
            <>
                <DriverTrip trips={currentPost} title="Search Result" />
                <div className='Pagination'>
                    <Pagination count={totalPage} page={curPage} onChange={paginate} shape="rounded" size="large" />
                </div>
            </>
        )
    }
}