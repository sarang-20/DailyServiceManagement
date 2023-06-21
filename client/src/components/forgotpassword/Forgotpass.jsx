import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Forgotpass() {
    const navigate = useNavigate();
    const [email,setemail]=useState();
    const [error,seterror]=useState();
    const handlechange=(e)=>{
        setemail(e.target.value);
    }
    const forgotpassword=async()=>{
        const otp=Math.floor(100000 + Math.random() * 900000)
        const res=await fetch("/forgotpassword",{
            method:"Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,otp
            }),
        });
        const y=await res.json();
        seterror(y.msg);
        navigate("/otp",{state: {forgot:otp,email:email}});
    };  
  return (<div className='home-container border'>
    <div className="border border-dark" style={{borderWidth:"5px"}}>
    <div>
      <h2> Email</h2> <input style={{height:"25px"}} type="email" name="email" value={email} onChange={handlechange}/>
    </div><br/> 
    <div><button onClick={forgotpassword} className='button milk-button'>forgot</button></div>
    <div>
   {error}
 </div>
 </div>
 </div>
  )
}
