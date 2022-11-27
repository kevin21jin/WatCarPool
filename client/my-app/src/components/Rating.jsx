import React from "react";
import {Fastar} from "react-icons/fa"
const Modal = ({open,onClose}) =>{
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
        <div>
            <h2 align="center">Rating for this trip</h2>
        </div>
        </div>
        </div>
        </div>
    </div>
  )

  const style = {
    container: {
        display : "flex",
        flexDirection: "column",
        alignItems: "center"

    }
  }
}

export default Modal