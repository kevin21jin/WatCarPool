import React from 'react'
import { useState } from 'react'

export const Pagination = ({curPage, postPerpage, totalPage, paginate, setCurPage})=>{
    const pageNumber = [];
    const [max, setmax] = useState(5);
    const [min, setmin] = useState(0);
    const [limit, setlimit] = useState(5);
    const handlenxt =()=>{
        
        setCurPage(curPage +1);
        if((curPage + 1) > max){
            setmax(max + limit);
            setmin(min + limit);
         }
    };

    const handlepre =()=>{
        if(curPage > 1){
        setCurPage(curPage -1);
        if((curPage - 1)%limit==0){
            setmax(max - limit);
            setmin(min - limit);
         }
        }
    };

    for(let i = 1; i <= Math.ceil(totalPage/ postPerpage); i++){
        pageNumber.push(i);
    }
    return(
            <div className='Container' >
            <ul className='Pagination'>
                <li><p onClick={handlepre}>{'<'}</p></li>
                {pageNumber.map((number) => {
                    if(number < max+1 && number > min){
                        return(
                        <li key = {number} className = {curPage == number ? "active" : null}>
                        <a onClick={()=>paginate(number)} href= "/mainpage/#!" className='page-link'>
                            {number}
                        </a>
                    </li>);
                    }else{
                        return null;
                    }
                    })}
                    <li><p onClick={handlenxt}> {'>'} </p></li>
            </ul>
            </div>
    )
}

