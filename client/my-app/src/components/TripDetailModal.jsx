import React from "react";

const Modal = ({open, onClose, curTrip, index}) => {
    if(open != index) return null
    return (
        <div className="overlay">
            <div className="modalContainer">
                <div className="modalright">
                <button onClick={onClose} className="closebtn"><i className="fa fa-times-circle"/></button> 
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
                    <div>{curTrip.description} </div>
                </div>

                <div align="center">
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
