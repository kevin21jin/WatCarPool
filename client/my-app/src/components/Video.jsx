import React from 'react';
import roadVideo from '../image/travel.mp4'
import { useState } from 'react';
import Modal from './Modal';
export const Video = () => {
    const [modal, setModel] = useState(false);
    const toggleModal = () => {
        setModel(!modal)
    }
    return (
        
        <div className='road'>
            
            <video autoPlay loop muted id='video'>
                <source src={roadVideo} type = 'video/mp4'/>å
            </video>
            <div className='slogan'>
                <h1>Watcarpool</h1>
                <p>LEAVING FOR THE WIDER WORLD</p>
                <br></br>
                
                <Modal open={modal} onClose={()=>toggleModal(false)}/>
                <button id='btn1' onClick={()=>toggleModal(true)}>start</button>
            </div>
        </div>
    )



}
