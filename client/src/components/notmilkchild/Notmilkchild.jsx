import React, { useEffect, useState } from 'react'
import "./notmilkchild.css"
export default function Notmilkchild(props) {
    const [now,setnow]=useState({
        username:"",
    });
    const dothis=async()=>{
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
        setnow(y);
        console.log(y.username);
    };
    useEffect(()=>{
        dothis();
    },[]);
  return (
    <div className="notmilkchild-container">
        <div className="notmilkchild-username">{props.key} {now.username}</div>
    </div>
  )
}
