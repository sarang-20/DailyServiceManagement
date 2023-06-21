import React, { useState } from "react";
import "./last.css";
// import {NavLink} from 'react-router-dom'
export default function Cuslogin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [mainerror, setmainerror] = useState();

  const handlechange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handlesignup = async (e) => {
    console.log("print yes ");
    e.preventDefault();
    const { password, username} =data;
    const res = await fetch("/customerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    console.log(res);
    const y = await res.json();
    if(y.error){
      setmainerror(y.error);
    }else if(y.username==="admin15"){
      localStorage.setItem("user", JSON.stringify(y));
      window.location.href='/'
    }else if(y.milk_provider_id){
      console.log("milk vado");
      setData(y);
      localStorage.setItem("user", JSON.stringify(y));
      window.location.href='/'
    }else if(y.news_provider_id){
      setData(y);
      localStorage.setItem("user", JSON.stringify(y));
      // window.location.href='/'
    }else if(y.user_id){
      console.log("customer ");
      setData(y);
      localStorage.setItem("user", JSON.stringify(y));
      // window.location.redirect('/milkproviders')
      window.location.href='/';
    }
    console.log(y);
    setData(y);
  };
  const sendmail=async(e)=>{
    e.preventDefault();
    const res=await fetch("/forgotpassword",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    });
    const y=await res.json();
    console.log(y);
  }

  return (
    <div class="main">
      <section class="signup">
        <div
          class="container"
          style={{ marginBottom: "35px", marginTop: "35px" }}
        >
          <div class="signup-content">
            <form
              method="POST"
              id="signup-form"
              class="signup-form"
              onSubmit={handlesignup}
            >
              <h2 class="form-title">Login</h2>
              <div class="form-group">
                <input
                  type="text"
                  onChange={handlechange}
                  value={data.username}
                  class="form-input"
                  name="username"
                  id="name"
                  placeholder="Your User Name"
                  required
                />
              </div>
              
              
              
              
              <div class="form-group">
                <input
                  type="password"
                  class="form-input"
                  onChange={handlechange}
                  value={data.password}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <span
                  toggle="#password"
                  class="zmdi zmdi-eye field-icon toggle-password"
                ></span>
              </div>
              
              
              <div class="form-group">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  class="form-submit"
                  value="Login"
                />
                <div style={{ color: "red" }}>{mainerror}</div>
              </div>
            </form>
            <div> <a href="/forgotpassword">Forgot password?</a></div><br/>
            <div>New Here ? <a href="/customerregister"> Sign Up</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}
