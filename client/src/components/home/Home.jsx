import React from 'react'
import "./home.css"
export default function Home() {
  const next1=async (e)=>{
    // e.preventdefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const user_id=user.user_id;
    console.log(user_id);
    const res=await fetch('/milkproviderpresent',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id
      }),
    });
    // console.log(res);
    const y=await res.json();
    console.log(y);
    if(y=="not"){
      window.location.href='/milkproviders';
    }else{
      window.location.href="/card"
    }
  }
  const newsproviders=async (e)=>{
    // e.preventdefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const user_id=user.user_id;
    console.log(user_id);
    const res=await fetch('/newsproviderpresent',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id
      }),
    });
    // console.log(res);
    const y=await res.json();
    console.log(y);
    if(y=="not"){
      window.location.href='/newsproviders';
    }else{
      window.location.href="/newscard"
    }
  }
  const profile=()=>{
    window.location.href="/profile";
  }
  const date=()=>{
    window.location.href="/date";
  }
  const datenews=()=>{
    window.location.href="/datenews";
  }

  const handlelogout=async()=>{
    localStorage.removeItem("user")
    window.location.href="/";
  }
  return (
    <div className="home-container">
     
    <header>
      <h1>Welcome to Our Site</h1>
      <p><b>Find the best suitable milkman and paperboy in your area</b> 
</p>
      <p>Stay up-to-date on local events and happenings</p>
      <p>Connect with your community and neighbour</p>
    </header>
    <div className="button-container">
      <button className="button milk-button" onClick={next1}>
      Find milkman 
      </button>
    </div>
    <div className="button-container">
      <button className="button news-button" onClick={newsproviders}>
      Find paperboy
      </button>
    </div>
    <div className="button-container">
      <button className="button profile-button" onClick={profile}>
        Update Profile
      </button>
    </div>
    <div className="button-container">
      <button className="button date-button" onClick={date}>
      Update your dates for milk delivery 
      </button>
    </div>
    <div className="button-container">
      <button className="button date-button" onClick={datenews}>
      Update your dates for newspaper delivery
      </button> 
    </div>
    <button type="button" class="btn btn-danger" onClick={handlelogout}>Log Out</button>
  </div>

  )
}
