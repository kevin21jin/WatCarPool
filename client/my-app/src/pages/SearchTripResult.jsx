import PassengerTrip from '../components/PassengerTrip'
import DriverTrip from '../components/DriverTrip'
import { useLocation } from "react-router-dom";
import { useState } from 'react'
import { Pagination } from '../components/Pagination'
import GuestTrip from '../components/GuestTrip';

export const SearchTripResult = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('WatCarPool-User'))
    const [helper, changeHelp] = useState(0);
    const location = useLocation();
    const [curPage, setCurPage] = useState(1);
    const [postPerpage] = useState(10);
    const indexOfLastPost = curPage * postPerpage;
    const indexOfFirstPost = indexOfLastPost - postPerpage;
    const paginate = (pageNumber) => setCurPage(pageNumber);
    let tripResult = location.state.tripResult;
    const currentPost = tripResult.slice(indexOfFirstPost, indexOfLastPost)
    const totalPage = Math.ceil(tripResult.length / postPerpage);
    if (currentUser === null) {
        return (
            <>
                <GuestTrip trips={currentPost} title="Search Result" />
                <Pagination setCurPage={setCurPage} curPage={curPage} postPerpage={postPerpage} totalPage={totalPage} allPage={tripResult.length} paginate={paginate}></Pagination>
            </>
        )
    } else if (currentUser.type === "passenger") {
        return (
            <>
                <PassengerTrip trips={currentPost} currentUser={currentUser} helper={helper} changeHelp={changeHelp} title="Search Result" />
                <Pagination setCurPage={setCurPage} curPage={curPage} postPerpage={postPerpage} totalPage={totalPage} allPage={tripResult.length} paginate={paginate}></Pagination>
            </>
        )
    } else if (currentUser.type === "driver") {
        return (
            <>
                <DriverTrip trips={currentPost} title="Search Result" />
                <Pagination setCurPage={setCurPage} curPage={curPage} postPerpage={postPerpage} totalPage={totalPage} allPage={tripResult.length} paginate={paginate}></Pagination>
            </>
        )
    }
}