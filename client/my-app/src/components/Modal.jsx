import React from "react";
import { Login } from '../pages/Login';
const Modal = ({open,onClose}) =>{
  if(!open) return null
  return(
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalright">
        <p onClick={onClose} className="closebtn">x</p>
        <div className="modalcontent">
        <Login/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Modal