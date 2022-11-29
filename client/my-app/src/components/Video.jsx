import React from 'react';
import roadVideo from '../image/travel.mp4'
import { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
export const Video = () => {
    const [modal, setModel] = useState(false);
    const toggleModal = () => {
        setModel(!modal)
    }
    const navigate = useNavigate()
    const redirect = () => {
        navigate("/home")
    }
    return (
        
        <div className='road'>
            
            <video autoPlay loop muted id='video'>
                <source src={roadVideo} type = 'video/mp4'/>å
            </video>
            <div className='slogan'>
                <h1>WatCarPool</h1>
                <p>LEAVING FOR THE WIDER WORLD</p>
                <br></br>
                
                <Modal open={modal} onClose={()=>toggleModal(false)}/>
                <button id='btn1' onClick={()=>toggleModal(true)}>login</button>
                &nbsp;&nbsp;&nbsp;
                <button id='btn1' onClick={redirect}>explore</button>
            </div>
        </div>
    )



}
