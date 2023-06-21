import React, { useEffect, useState } from 'react'
import Onereqfornews from '../reqmilk/Onereqfornews';
// import "./milkprovides.css";
export default function Newsproviders() {
  const [newsman,setnewsman]=useState();
  const [ans,setans]=useState();
  const now1=async  ()=>{
    // e.preventDefault();  
      const res =await fetch("/newsman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    // console.log(res);
    const y =await  res.json();
    console.log(y);
    const now=y.map((element)=>{
      return (
         <Onereqfornews key={element.news_provider_id} now={element} />
      )
    })
    console.log(now);
    setnewsman(now);
}

useEffect(()=>{
  now1();
  // console.log(milk);
}
  ,[]);

  return (
    <div className="milkprovider-container">
      <div className="onereq-container">{newsman}</div>
      {/* <div className="onereq-container">{newsman}</div>
      <div className="onereq-container">{newsman}</div> */}
    </div>

  )
}
