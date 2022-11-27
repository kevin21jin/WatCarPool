import React from "react";
import { Login } from '../pages/Login';
const Modal = ({open,onClose}) =>{
  if(!open) return null
  return(
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalright">
        
        <div className="modalcontent">
        <button button onClick={onClose} className="closebtn">x</button> 
        
        </div>
        </div>
        </div>
    </div>
  )
}

export default Modal