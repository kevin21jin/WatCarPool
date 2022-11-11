import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from 'react-router-dom';
import roadVideo from '../image/travel.mp4'

export const Video = () => {
    return (
        <div className='road'>
            <video autoPlay loop muted id='video'>
                <source src={roadVideo} type = 'video/mp4'/>å
            </video>
            <div className='slogan'>
                <h1>Watcarpool</h1>
                <p>I AM LEAVING FOR THE WIDER WORLD</p>
                <br></br>
                <div className='container'>
                    <a href="./login"><button id='btn1'><div id='btn1-box'></div>Start</button></a>
                    <a href="./mainpage"><button id='btn1'><div id='btn1-box'></div>home</button></a>
                </div>
                
            </div>
        </div>
    )



}
