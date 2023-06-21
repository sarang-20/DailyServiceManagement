import React, { useEffect, useState } from "react";
// import "./style.css";
// import {NavLink} from 'react-router-dom'
export default function Milk() {
  const [data, setData] = useState({
    milk_provider_id: "",
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
    PhoneNumber: "",
    address: "",
    prize: "",
    morning_start:"",
    morning_end: "",
    evening_start: "",
    evening_end: "",
  });
  const [error, seterror] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    PhoneNumber: "",
  });
  const [mainerror, setmainerror] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [evening,setevening]=useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const handleOnChanges = () => {
    setevening(!evening);
  };
  const handlechange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  }; 
  useEffect(() => {
    const now = "password";
    if (!data.password) {
      console.log("password is null");
      const p = "password is null";
      const name = "password";
      seterror({ ...error, [name]: p });
    } else if (data.password.length < 4) {
      const p = "password length must be greater than 4";
      seterror({ ...error, [now]: p });
    } else if (data.password.match(/[a-z]/) === null) {
      seterror({
        ...error,
        [now]: "password must contain one lowercase alphabet",
      });
    } else if (data.password.match(/[A-Z]/) === null) {
      seterror({
        ...error,
        [now]: "password must contain one uppercase alphabet",
      });
    } else if (data.password.match(/[0-9]/) === null) {
      seterror({ ...error, [now]: "password must contain one digit" });
    } else if (data.password.match(/[!@#$%^&*]/) == null) {
      seterror({
        ...error,
        [now]: "password must contain one special character",
      });
    } else {
      seterror({ ...error, [now]: "" });
    }
  }, [data.password]);
  useEffect(() => {
    const now = "confirm_password";
    // const test=reg.test(data.password);
    if (!data.confirm_password) {
      console.log("password is null");
      const p = "password is null";
      const name = "confirm_password";
      seterror({ ...error, [name]: p });
    } else if (data.confirm_password.length < 4) {
      console.log("password length must be greater than 4");
      seterror({ ...error, [now]: "password length must be greater than 4" });
    } else if (data.confirm_password.match(/[a-z]/) === null) {
      seterror({
        ...error,
        [now]: "password must contain one lowercase alphabet",
      });
    } else if (data.confirm_password.match(/[A-Z]/) === null) {
      seterror({
        ...error,
        [now]: "password must contain one uppercase alphabet",
      });
    } else if (data.confirm_password.match(/[0-9]/) === null) {
      seterror({ ...error, [now]: "password must contain one digit" });
    } else if (data.confirm_password.match(/[!@#$%^&*]/) === null) {
      seterror({
        ...error,
        [now]: "password must contain one special character",
      });
    } else if (data.confirm_password !== data.password) {
      seterror({
        ...error,
        [now]: "password and confirm password must be match",
      });
    } else {
      seterror({ ...error, [now]: "" });
    }
  }, [data.confirm_password]);
  useEffect(() => {
    var k = data.PhoneNumber;
    const now = "PhoneNumber";
    if (isNaN(k)) {
      seterror({ ...error, [now]: "phone number must not have any alphabets" });
    }else if (!data.PhoneNumber) {
      seterror({ ...error, [now]: "Phone Number Can not be empty" });
    } else if (data.PhoneNumber.length < 10 || data.PhoneNumber.length > 10) {
      seterror({ ...error, [now]: "PhoneNumber length must be equal to 10" });
    } else if (data.PhoneNumber.match(/[a-z]/) !== null) {
      seterror({ ...error, [now]: "phone number must not have any alphabets" });
    } else {
      seterror({ ...error, [now]: "" });
    } 
  }, [data.PhoneNumber]);
  useEffect(() => {
    const now = "email";
    if (!data.email) {
      seterror({ ...error, [now]: "Email Can not be empty" });
    } else if (
      data.email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/) !== null
    ) {
      seterror({ ...error, [now]: "Please enter valid email address" });
    } else {
      seterror({ ...error, [now]: "" });
    }
  }, [data.email]);


  const handlesignup = async (e) => {
    console.log("print yes");
    e.preventDefault();
    const { username, fname,prize, lname, address, password, email, PhoneNumber,evening_start,evening_end,morning_start,morning_end} =
      data;
      const morning=isChecked;
    const res = await fetch("/milkproviderregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fname,
        lname,
        email,
        password,
        prize,
        PhoneNumber,
        address,
        morning_start,
        morning_end,
        evening_start,
        evening_end,
        morning,
        evening,
      }),
    });
    console.log(res);
    const y = await res.json();
    if (y.message === "PhoneNumber") {
      setmainerror(
        "user with " + PhoneNumber + " phone number already exists"
      );
      setData({ ...data, [y.message]: "" });
    } else if (y.message === "email") {
      setmainerror("user with " + email + " Email already exists");
    } else if (y.message === "username") {
      setmainerror("user with " + username + " Username already exists");
    } else {
      // console.log(data);
      window.location.href = "/adminhome";
    }
  };
  const mor = isChecked===true ? <div class="form-group"><div class="form-group">From :- <input type="time" id="morning_start" onChange={handlechange} value={data.morning_start} name="morning_start" min="07:00" max="11:00" required></input></div><div class="form-group">To :- <input type="time" onChange={handlechange} value={data.morning_end} id="morning_end" name="morning_end" min="08:00" max="11:00" required></input></div></div> : "";
  const eve=evening===true?<div class="form-group"><div class="form-group">From :- <input type="time" id="evening_start" onChange={handlechange} value={data.evening_start} name="evening_start" min="13:00" max="22:00" required></input></div><div class="form-group">To :- <input type="time" onChange={handlechange} value={data.evening_end} id="evening_end" name="evening_end" min="14:00" max="22:00" required></input></div></div>:"";


  return (
    <div class="main">
      <section class="signup">
        <div
          class="container"
         
        >
          <div class="signup-content">
            <form
              method="POST"
              id="signup-form"
              class="signup-form"
              onSubmit={handlesignup}
            >
              <h2 class="form-title">Create account</h2>
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
                <div style={{ color: "red" }}>{error.username}</div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  onChange={handlechange}
                  value={data.fname}
                  class="form-input"
                  name="fname"
                  id="fname"
                  placeholder="Your First Name"
                  required
                />
                {/* <div style={{color:'red'}}>{error.username}</div> */}
              </div>
              <div class="form-group">
                <input
                  type="text"
                  onChange={handlechange}
                  value={data.lname}
                  class="form-input"
                  name="lname"
                  id="lname"
                  placeholder="Your Last Name"
                  required
                />
                {/* <div style={{color:'red'}}>{error.username}</div> */}
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  onChange={handlechange}
                  value={data.PhoneNumber}
                  name="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Your Phone Number"
                  max="9999999999"
                  required
                />
                <div style={{ color: "red" }}>{error.PhoneNumber}</div>
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-input"
                  onChange={handlechange}
                  value={data.email}
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                />
                <div style={{ color: "red" }}>{error.email}</div>
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
                <div style={{ color: "red" }}>{error.password}</div>
                <span
                  toggle="#password"
                  class="zmdi zmdi-eye field-icon toggle-password"
                ></span>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-input"
                  onChange={handlechange}
                  value={data.confirm_password}
                  name="confirm_password"
                  id="re_password"
                  placeholder="Repeat your password"
                  required
                />
                <div style={{ color: "red" }}>{error.confirm_password}</div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  onChange={handlechange}
                  value={data.address}
                  name="address"
                  id="address"
                  placeholder="Your address"
                  required
                />
                {/* <div style={{color:'red'}}>{error.}</div> */}
              </div>
              <div class="form-group">
                <div>Prize Per liter :- </div>  
                <select onChange={handlechange} name="prize" value={data.prize}>
                  <option value={40} defaultChecked>40</option>
                  <option value={41}>41</option>
                  <option value={42}>42</option>
                  <option value={43}>43</option>
                  <option value={44}>44</option>
                  <option value={45}>45</option>
                  <option value={46}>46</option>
                  <option value={47}>47</option>
                  <option value={48}>48</option>
                  <option value={49}>49</option>
                  <option value={50}>50</option>
                  <option value={51}>51</option>
                  <option value={52}>52</option>
                  <option value={53}>53</option>
                  <option value={54}>54</option>
                  <option value={55}>55</option>
                  <option value={56}>56</option>
                  <option value={57}>57</option>
                  <option value={58}>58</option>
                  <option value={59}>59</option>
                </select>
                {/* <input
                  type="number"
                  class="form-input"
                  onChange={handlechange}
                  value={data.prize}
                  name="prize"
                  id="prize"
                  placeholder="Your milk prize per liter"
                  required
                /> */}
                {/* <div style={{color:'red'}}>{error.}</div> */}
              </div>
              
              
              
              <div class="form-group">
                <input
                  type="checkbox"
                  id="when"
                  name="morning"
                  value="morning"
                  onChange={handleOnChange}
                ></input>
                morning

                <input
                  type="checkbox"
                  id="when"
                  name="evening"
                  value="evening"
                  onChange={handleOnChanges}
                ></input>
                evening
              </div>
              <div class="form-group">{mor}   {eve}</div>
              <div class="form-group">
                <input
                 
                  type="submit"
                  name="submit"
                  id="submit"
                  class="form-submit"
                  value="Sign up"
                />
                <div style={{ color: "red" }}>{mainerror}</div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
