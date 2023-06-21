import React, { useEffect, useState }  from 'react'
import "./onereq.css"
export default function Onereqfornews(props) {
    const [ans,setans]=useState();
    const [now,setnow]=useState();
    const sendrequest1=async (e)=>{
      console.log("user request send");
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        var showdate=new Date();
        var month=showdate.getMonth()+1;
        var year=showdate.getFullYear();
          // console.log(user)
        const user_id=user.user_id;
        console.log(user_id);
        const news=props.now.news_provider_id;
        const res=await fetch('/newssendrequest',{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            news,user_id,month,year
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
        const news=props.now.news_provider_id;
        var showdate=new Date();
        var month=showdate.getMonth()+1;
        var year=showdate.getFullYear();
        const res=await fetch('/newscheckreqstatus',{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              news,user_id,month,year
            }),
          });
          const y=await res.json();
          // console.log(y);
          setnow(y);
      };
      useEffect(()=>{
        status();
      },[ans])
      const tp=()=>{
      }
  return (
    <div className="onereq">
      <h3>Name: {props.now.username}</h3>
      <p>Prize/Month: {props.now.prize}</p>
      <button className="btn" onClick={now==="send request"?sendrequest1:tp}>{now}</button>
</div>

  )
}
