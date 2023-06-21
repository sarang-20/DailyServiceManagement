import React, { useEffect, useState } from 'react'
import Req from '../req/Req'
import "./cus.css"

export default function Cusrequest() {
    const [requests,setrequest]=useState([]);
    const [do1,setdo]=useState(true);
    const rerender=()=>{
        setdo(!do1);
    }
    const now=async ()=>{
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        const provider_id=user.milk_provider_id;
        const res=await fetch("/customerandproviderlist",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                provider_id
            })
        });
        const y=await  res.json();
        setrequest([...y]);
        // console.log(y[0].username);
    }
    useEffect(()=>{
        now();
    },[do1])
    const print=requests.map((e,index)=>
            // <div key={index} value={e.customer_id}>{e.customer_id}<br/>{e.provider_id}</div>
<Req key={index} pass={rerender} value={e.customer_id}/>
            )
  return (
    <div className="cus-req-container">
                  <h1 className="title">Customer Requests</h1>
                  <div className="request-list">
                    {print}
                    
                  </div>
                </div>

  )
}
