import React from "react";
import { Login } from '../pages/Login';

const Modal = ({open,onClose}) =>{
  if(!open) return null
  return(
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalright">
        <div className="modalcontent">
        <p onClick={onClose} className="closebtn" style={{ color: "black" }}><i className="fa fa-times-circle" /></p> 
        <Login/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Modal