import React from "react";
import { FaStar } from "react-icons/fa"
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { rateRoute } from '../api/ApiRoutes'
import { toast } from "react-toastify"

const Modal = ({ open, onClose, trip, currentUser, index }) => {
  const stars = Array(5).fill(0);
  const [currentValue, setcurrentValue] = useState(false);
  const [hoverValue, sethoverValue] = useState(false);
  const [rating, setRating] = useState(0)
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  };
  const handleClick = value => {
    setcurrentValue(value)
    setRating(value)
  };
  const handleMouseOver = value => {
    sethoverValue(value)
  }
  const handleMouseLeave = value => {
    sethoverValue(undefined)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestJson = {
      driverID: trip.driverID,
      vehicleID: trip.vehicleID,
      tripID: trip.tripID,
      passengerID: currentUser.userId,
      rating: rating
    }
    const { data } = await axios.put(rateRoute, requestJson);
    if (data.status === "Fail") {
      toast.error(data.errorMessage, toastOptions);
    } else if (data.status === "Success") {
      toast.success("Rating submitted successfully", toastOptions);
      onClose();
    }
  }

  const color = {
    orange: "#ffba5a",
    grey: "#a9a9a9"
  }
  if (open != index) return null
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalright">
          <div className="modalcontent">
            <button onClick={onClose} className="closebtn"><i className="fa fa-times-circle" /></button>
            <h2 align="center">Rating for this trip</h2>
            <p></p><p></p><p></p>
            <div align="center">
              {
                stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={56}
                      style={{
                        marginRight: 10,
                        cursor: "pointer"
                      }}
                      color={(hoverValue || currentValue) > index ? color.orange : color.grey}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                    />
                  )
                })
              }
              <></>
            </div>
            <div align="center">
              <p></p>
              <textarea
                style={{ resize: "none", height: "250px", width: "80%" }}
                placeholder="Please give us your feedback!"
                maxLength={1000}
              />
            </div>
          </div>
          <div align="center">
            <Button type='submit' onClick={(e) => handleSubmit(e)}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Modal