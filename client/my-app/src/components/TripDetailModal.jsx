import React from "react";
import {Button} from 'react-bootstrap'

const Modal = ({open, onClose, curTrip, index}) => {
    if(open != index) return null
    return (
        <div className="overlay">
            <div className="modalContainer">
                <div className="modalright">
                <button button onClick={onClose} className="closebtn"><i class="fa fa-times-circle"/></button> 
                <br/>
                <h2 align="center">Trip Detail</h2>
                <br/>

                <div >
                    <h6 className="mb-2 text-muted card-subtitle" style={{ fontSize: "16px" }}>
                    &nbsp;Origin: {curTrip.origin}
                    <p></p>
                    &nbsp;Destination: {curTrip.destination}
                    <p></p>
                    &nbsp;Price: ${curTrip.price}
                    <p></p>
                    &nbsp;Description: 
                    
                    </h6>
                    <box>{curTrip.description} </box>
                </div>

                <div align="center">
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
