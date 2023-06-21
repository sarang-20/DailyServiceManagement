import React, { useEffect, useState }  from 'react'
import "./onereq.css"
export default function Onereq(props) {
    const [ans,setans]=useState();
    const [now,setnow]=useState();
    const sendrequest=async (e)=>{
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        var showdate=new Date();
        var month=showdate.getMonth()+1;
        var year=showdate.getFullYear();
          // console.log(user)
        const user_id=user.user_id;
        console.log(user_id);
        const milk=props.now.milk_provider_id;
        console.log(milk);
        const totalmilk=props.howmuchmilk;
        const res=await fetch('/sendrequest',{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            milk,user_id,month,year,totalmilk
          }),
        });
        const y=await res.json();
        setans(y);
      }
      const status=async()=>{
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
          // console.log(user)
        const user_id=user.user_id;
        const milk=props.now.milk_provider_id;
        var showdate=new Date();
        var month=showdate.getMonth()+1;
        var year=showdate.getFullYear();
        const res=await fetch('/checkreqstatus',{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              milk,user_id,month,year
            }),
          });
          const y=await res.json();
          console.log(y);
          setnow(y);
      };
      useEffect(()=>{
        console.log(props.howmuchmilk);
        status();
      },[ans])
      const tp=()=>{
      }
  return (
    <div className="onereq">
      <h3>Name: {props.now.username}</h3>
      <p>Prize/litre: {props.now.prize}</p>
      <button className="btn" onClick={now==="send request" ? sendrequest() : tp}>{now}</button>
</div>

  )
}
