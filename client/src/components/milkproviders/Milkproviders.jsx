import React, { useEffect, useState } from 'react'
import Onereq from '../reqmilk/Onereq';
import "./milkprovides.css";
export default function Milkproviders() {
  const [milkman,setmilkman]=useState();
  const [milk,setmilk]=useState();
  const [ans,setans]=useState();
  const [howmuchmilk,sethowmuchmilk]=useState(0.5);
  const chnagehowmuchmilk=(e)=>{
    sethowmuchmilk(e.target.value);
  }
  const now1=async  ()=>{
    // e.preventDefault();  
      const res =await fetch("/milkman", {
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
         <Onereq key={element.milk_provider_id} now={element} howmuchmilk={howmuchmilk} />
      )
    })
    console.log(now);
    setmilkman(now);
}
useEffect(()=>{
  now1();
},[howmuchmilk])
const changedon=(e)=>{
  console.log(e.target.value);
  const n=e.target.value;
  setmilk(n);
}
useEffect(()=>{
  now1();
  // console.log(milk);
}
  ,[]);

  return (
    <div className="milkprovider-container">
      <div className="select-container">
        <p className="howmuchmilk">How much milk do you want?</p>
        <select onChange={chnagehowmuchmilk} name="howmuchmilk" value={howmuchmilk}>
          <option value={0.5} defaultValue>0.5</option>
          <option value={0.75}>0.75</option>
          <option value={1}>1</option>
          <option value={1.5}>1.5</option>
          <option value={1.75}>1.75</option>
          <option value={2}>2</option>
          <option value={2.5}>2.5</option>
          <option value={3}>3</option>
          <option value={3.5}>3.5</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="onereq-container">{milkman}</div>
  </div>

  )
}
