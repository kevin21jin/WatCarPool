import React from 'react'
import { useState } from 'react'

export const Pagination = ({curPage, postPerpage, totalPage, paginate, setCurPage})=>{
    const pageNumber = [];
    const [max, setmax] = useState(5);
    const [min, setmin] = useState(0);
    const [limit, setlimit] = useState(5);

    var curhref = window.location.href

    const handlenxt =()=>{
        console.log(curPage)
        console.log(totalPage)
        if(curPage < totalPage){
        setCurPage(curPage +1)
            if((curPage + 1) > max){
                setmax(max + limit);
                setmin(min + limit);
             }
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

    let pageIncrementButton = null;
    if(totalPage > max && curPage < totalPage){
        pageIncrementButton = <li onClick={handlenxt}> ... </li>
    }

    let pageDecrementButton = null;
    if(totalPage > max  && curPage > 1){
        pageDecrementButton = <li onClick={handlepre}> ... </li>
    }
    for(let i = 1; i <= totalPage; i++){
        pageNumber.push(i);
    }
    return(
        
            <div className='Container' >
            <ul className='Pagination'>
                <li><p onClick={handlepre}>{'<'}</p></li>
                {pageDecrementButton}
                {pageNumber.map((number) => {
                    if(number < max+1 && number > min){
                        return(
                        <li key = {number} className = {curPage == number ? "active" : null}>
                        <a onClick={()=>paginate(number)} href= "/home/#" className='page-link'>
                            {number}
                        </a>
                    </li>);
                    }else{
                        return null;
                    }
                    })}
                    {pageIncrementButton}
                    <li><p onClick={handlenxt}> {'>'} </p></li>
            </ul>
            </div>
    )
}

