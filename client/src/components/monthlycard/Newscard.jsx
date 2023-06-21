import React, { useEffect, useState } from 'react'
import Onecardnews from '../onecard/Onecardnews';
import Onedate from '../showdate/Onedate';
import "./monthly.css"
export default function Monthlycard() {
    const [proname,setproname]=useState();
    const [notdelivered,setnotdelivered]=useState([]);
    const [item,setitem]=useState([]);
    const [predates,setpredates]=useState([]);
    const [prize,setprize]=useState();
    function addprevitem(c){
      setpredates([...predates,...c]);
      // console.log(data);
    }
    useEffect(()=>{
      var showdate=new Date();
    var displaydate=showdate.getDate();
    const totalDays = new Date(showdate.getFullYear(), showdate.getMonth()+1, 0).getDate();
    const pretemp=[];
    for(let i=1;i<displaydate+1;i++){
      pretemp.push(i);
    }
    addprevitem(pretemp);
    },[])
    const providername=async ()=>{
        const user_id=JSON.parse(localStorage.getItem("user")).newsprovider_id;
        const res=await fetch('/getnewsprousername',{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id
            }),
          });
          const y=await res.json();
          console.log(y);
          setproname(y);
    }
    const doing1=async ()=>{
        // const date=data.selected_date;
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        const customer_id=user.user_id;
        const newsprovider_id=user.newsprovider_id;
        const res = await fetch("/returnnewsdates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id,newsprovider_id
          })
        })
          const y=await res.json();
          // console.log(y);
          setnotdelivered([...y]);
        // console.log(notdelivered);
        var showdate=new Date();
        const totalDays = new Date(showdate.getFullYear(), showdate.getMonth()+1, 0).getDate();
}

    
const milkprize_fun=async()=>{
  var user=localStorage.getItem("user");
  user=JSON.parse(user);
  const  newsprovider_id=user.newsprovider_id;
  const res = await fetch("/newsprize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newsprovider_id
    })
  });
  const y=await res.json();
  setprize(y);
};
    useEffect( ()=>{
        providername();
        doing1();
        milkprize_fun();
    },[]);
    var totaldays=0;
    var showdate=new Date();
    var displaydate=showdate.getDate();
    const totalDays = new Date(showdate.getFullYear(), showdate.getMonth()+1, 0).getDate();
    const now1=predates.map((e,index)=>
          notdelivered.includes(e)? <Onecardnews key={index} prize={prize} totalDays={totalDays} value={e} /> :<Onecardnews key={index}  prize={prize}  totalDays={totalDays} value={e} />
);
const temp=predates.map((e)=>{
    notdelivered.includes(e)?totaldays+=0:totaldays+=1
})
  return (
    <div className="monthly-card">
      <div className="customer-name">Customer Name:-{JSON.parse(localStorage.getItem("user")).fname} {JSON.parse(localStorage.getItem("user")).lname}</div>
      <div className="provider-name">Provider Name:- {proname}</div>
      <div className="card-main-body">{now1}</div>
      <div className="total-rupees">Total Rupees to pay :- {prize}</div>
    </div>
  )
}
