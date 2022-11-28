import React from "react";
import "./Card.css";

const Modal = ({ open, onClose, trip, index }) => {
    if (open != index) return null
    return (
        <div className="overlay">
            <div className="modalContainer">
                <div className="modalright">
                    <button onClick={onClose} className="closebtn"><i className="fa fa-times-circle" /></button>
                    <br />
                    <h2 align="center">Trip Details</h2>
                    <div style={{ fontSize: "20px", margin: "15px 20px 20px 20px" }}>
                        <p style={{ height: "20px" }}>
                            <span style={{ fontSize: "18px", color: '#2DA8D8', fontWeight: 'bold', textTransform: "uppercase" }}>
                                Origin:</span> {trip.origin}
                        </p>
                        <p style={{ height: "20px" }}>
                            <span style={{ fontSize: "18px", color: '#2DA8D8', fontWeight: 'bold', textTransform: "uppercase" }}>
                                Destination:</span> {trip.destination}
                        </p>
                        <p style={{ height: "20px" }}>
                            <span style={{ fontSize: "18px", color: '#2DA8D8', fontWeight: 'bold', textTransform: "uppercase" }}>
                                Time:</span> {trip.departTime}
                        </p>
                        <p style={{ height: "20px" }}>
                            <span style={{ fontSize: "18px", color: '#2DA8D8', fontWeight: 'bold', textTransform: "uppercase" }}>
                                Price:</span> ${trip.price}
                        </p>
                        {
                            (trip.description !== null) ?
                                <p><span style={{ fontSize: "18px", color: '#2DA8D8', fontWeight: 'bold', textTransform: "uppercase" }}>
                                    Description:</span> {trip.description}</p>
                                :
                                <p></p>
                        }
                    </div>

                    <div align="center">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
