import React from "react";
import { FaStar } from "react-icons/fa"
import { useState } from 'react';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { rateRoute } from '../api/ApiRoutes'
import { toast } from "react-toastify"
const Modal = ({open,onClose, trip, currentUser}) =>{
    const stars = Array(5).fill(0);
    const [currentValue, setcurrentValue] = useState(false);
    const [hoverValue, sethoverValue] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      };
    var rateNum;
    const handleClick = value =>{
        setcurrentValue(value)
        rateNum = value;
    };
    const handleMouseOver = value =>{
        sethoverValue(value)
    }
    const handleMouseLeave = value =>{
        sethoverValue(undefined)
    }
    const handleSubmit = async (e, trip) => {
        e.preventDefault();
        const requestJson = {
            driverID: trip.driverID,
            vehicleID: trip.vehicleID,
            tripID: trip.tripID,
            passengerID: currentUser.userId,
            rating: rateNum
          }
          const { data } = await axios.put(rateRoute, requestJson);
          if (data.status === "Fail") {
            toast.error(data.errorMessage, toastOptions);
          }else if (data.status === "Success") {
            console.log("success")
            console.log(data)
            onClose={onClose}
          }
    }

    const color = {
        orange: "#ffba5a",
        grey: "#a9a9a9"
    }
  if(!open) return null
  return(
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalright">
        <div className="modalcontent">
        <button button onClick={onClose} className="closebtn">x</button> 
            <h2 align="center">Rating for this trip</h2>
            <p></p><p></p><p></p>
            <div align="center">
                {
                    stars.map((_, index) => {
                        return(
                            <FaStar
                            key={index}
                            size={56}
                            style= {{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            color={(hoverValue||currentValue) > index ? color.orange: color.grey}
                            onClick={()=> handleClick(index+1)}
                            onMouseOver={()=>handleMouseOver(index + 1)}
                            onMouseLeave = {handleMouseLeave}
                            />
                        
                        )
                    })
                }
                <></>
                

            </div>
            
            <div align="center">
            <p></p>
            <textarea 
                placeholder="Please give us your feedback!"
                rows={10}
                cols = {50}
                maxLength = {300}

                />
                </div>
        </div>
        <div align = "center">
        <Button  type='submit' onClick={(e) => handleSubmit(e, trip, currentUser)}> Submit</Button>
        </div>
        </div>
        </div>
        </div>
  )

}

export default Modal