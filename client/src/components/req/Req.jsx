import React, { useEffect, useState } from 'react'
import "./req.css"
import user from './1.jpg';
export default function Req(props) {
    const [data,setdata]=useState();
    const [ans,setans]=useState();
    const now=async ()=>{
        const user_id=props.value;
        const res=await fetch("/customeridtoname",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id
            })
        });
        const y=await res.json();
        console.log(y);
        setdata(y.username);
        // console.log(data);
    }
    useEffect(()=>{
        now();
        // console.log(data);
    },[ans])
    const rejected=async(e)=>{
        e.preventDefault();
        const user_id=props.value;
        var provider=localStorage.getItem("user");
        provider=JSON.parse(provider);
        const provider_id=provider.milk_provider_id;
        const res=await fetch("/requestreject",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id,provider_id
            })
        });
        const y=await res.json();
        console.log(y);
        setans(y);
        alert("request rejected");
        props.pass();
    }
    const accepted= async (e)=>{
        e.preventDefault();
        const user_id=props.value;
        var provider=localStorage.getItem("user");
        provider=JSON.parse(provider);
        var showdate=new Date();
  var month=showdate.getMonth()+1;
  var year=showdate.getFullYear();
        const provider_id=provider.milk_provider_id;
        const res=await fetch("/requestaccept",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id,provider_id,month,year
            })
        });
        const y=await res.json();
        console.log(y);
        setans(y);
        alert("request accpected");
        props.pass();
    }
  return (
    <div className="req-container">
        
    <div className="user-info">
      <img src={user} alt="User Avatar" />
      <h3 className='username'>{data}</h3>
    </div>
    <div className="buttons">
      <button class="button-21" onClick={accepted}>Accept</button>
      <button class="button-21" onClick={rejected}>Reject</button>
    </div>
 </div>


  )
}
