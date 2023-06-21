import React, { useState,useEffect } from 'react'
// import {FaBeer} from 'react-icons/MdCancel'
import { AiOutlineCloseCircle } from "react-icons/ai";
import './one.css'
export default function Onedatenews(props) {
  const [showCrossButton, setShowCrossButton] = useState(false);
  const handleDelivery=async(e)=>{
    e.preventDefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const customer_id=user.user_id;
    const newsprovider_id=user.newsprovider_id;
    const date=props.value;
    const year=props.year;
    const month=props.month;
    const res = await fetch("/notdeliverynewsonthisdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,newsprovider_id,date,year,month
      })
    });
      const y=await res.json();
      console.log(y);
      props.onReRender();
      // console.log("working done");
  }
  const handleCancellation=async(e)=>{
    e.preventDefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const customer_id=user.user_id;
    const newsprovider_id=user.newsprovider_id;
    const date=props.value;
    const year=props.year;
    const month=props.month;
    const res = await fetch("/deletedatenews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,newsprovider_id,date,year,month
      })
    });
    const y=await res.json();
    props.onReRender();
  }/* es
  const now=()=>{
    if(props.ischecked){
      return <button style={{background:"red",border: "0px"}} onClick={dothis} ><AiOutlineCloseCircle style={{display: "block",width: "90px",height: "45px"}}/></button>
    }else if(props.ischecked1){
      return <button style={{background:"blue",border: "0px"}} onClick={dothis1}><AiOutlineCloseCircle style={{display: "block",width: "90px",height: "45px"}}/></button>
    }else{
      return 
    }
  }*/
  const handleMouseEnter = () => {
    setShowCrossButton(true);
  }

  const handleMouseLeave = () => {
    setShowCrossButton(false);
  }
  const getStatusColor = () => {
    if (props.ischecked) {
      return "yellow"; // Customer wants milk
    } else if (props.ischecked1 || props.ischecked2) {
      return "red"; // Customer doesn't want milk
    } else {
      return "green"; // No status set
    }
  }
  return (
    <div className="Onedate-container"
         style={{ backgroundColor: getStatusColor() }}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
      <h1>{props.value} </h1>
      <div className="Onedate-actions">
        {showCrossButton && props.ischecked1 &&
          <button className="cross-button" onClick={handleCancellation}>
            <AiOutlineCloseCircle style={{ display: "block", width: "90px", height: "45px" }} />
          </button>
        }
        {showCrossButton && props.ischecked &&
          <button className="cross-button" onClick={handleDelivery}>
            <AiOutlineCloseCircle style={{ display: "block", width: "90px", height: "45px" }} />
          </button>
        }
      </div>
</div>
)
}