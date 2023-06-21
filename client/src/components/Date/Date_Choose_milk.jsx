import React, { useEffect, useState } from "react";
import Onedate from "../showdate/Onedate";
import'./datechoose.css'
function Date_Choose(){
  const [nextdates,setnextdates]=useState([]);
  const [predates,setpredates]=useState([]);
  const [notdelivered,setnotdelivered]=useState([]);
  const [reRender, setReRender] = useState(false);  
  const [month,setmonth]=useState();
  const [year,setyear]=useState();
 
const handleReRender = () => {  
  // console.log("now working");  
 setReRender(!reRender); // state change will re-render parent      
};   
  const doing1=async ()=>{
    // const date=data.selected_date;
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const customer_id=user.user_id;
    const milkprovider_id=user.milkprovider_id;
    const res = await fetch("/returndates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,milkprovider_id
      })
    })
      const y=await res.json();
      // console.log(y);
      setnotdelivered([...y]);
    // console.log(notdelivered);

  }
  function additem(c){
    setnextdates([...nextdates,...c]);
    // console.log(data);
  }
  function addprevitem(c){
    setpredates([...predates,...c]);
    // console.log(data);
  }
  useEffect(()=>{
    var showdate=new Date();
  var displaydate=showdate.getDate();
  setmonth(showdate.getMonth()+1);
  setyear(showdate.getFullYear());
  const pretemp=[];
  for(let i=1;i<displaydate+1;i++){
    pretemp.push(i);
  }
  addprevitem(pretemp);
  },[])
  useEffect(()=>{
    doing1();
    // console.log(notdelivered);
  },[reRender]);
   useEffect( ()=>{
    var showdate=new Date();
  const totalDays = new Date(showdate.getFullYear(), showdate.getMonth()+1, 0).getDate();
  var displaydate=showdate.getDate();
    // additem([0,1,2,3]);
    // setdata([]);
    // additem(5);
    
  const temp=[];
  for(let i=displaydate+1;i<totalDays+1;i++){
    temp.push(i);
    // console.log(i);
  }
  additem(temp);
  },[])
  const now=nextdates.map((e,index)=>
  notdelivered.includes(e)?<Onedate key={index} month={month} year={year} color="blue" onReRender={handleReRender} ischecked1={true}   value={e}/>:<Onedate key={index} month={month} year={year} color="red" onReRender={handleReRender} ischecked={true} value={e}/>
  )
  const now1=predates.map((e,index)=>
  notdelivered.includes(e)?<Onedate key={index} month={month} year={year} ischecked2={true} color="blue"  value={e}/> :<Onedate key={index} month={month} year={year} color="#08e908" value={e}/>)

  return (
    <div className="date-choose-main-container">
    <header>
  {/* <h1>Choose a Date</h1>
  <p>Select your preferred date below:</p> */}
  <h1>Help your milkman by informing them </h1>
  <p>Update dates accordingly</p>
</header>
    <div className="date-choose-container"> 
    {/* add a class to the container */}
      <div className="date-choose-grid">
        {/* add a class to the grid */}
        {now1}
        {now}
      </div>
    </div>
    </div>
  );
} 

export default Date_Choose;