import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Changepass() {
  const location = useLocation();
  const navigate=useNavigate();
    const [password,setpassword]=useState();
    const handlechange=(e)=>{
        // console.log("keyur");
        setpassword(e.target.value);
        console.log(password);
    };
    const changepass=async(e)=>{
      const email=location.state.email;
        e.preventDefault();
        const res=await fetch("/changepassword",{
          method:"Post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email,password
          }),
      });
      const y=await res.json();
      console.log(y);
      
      navigate("/");
    }
    return (
        <div className='home-container'>
        <Form>
        
         <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2" >
        <h2>Enter New Password</h2>
        </Form.Label>
        <Col sm="50">
          <Form.Control style={{height:"23px"}} type="password" onChange={handlechange}  />
        </Col>
      </Form.Group>
      <br/>
      </Form>
      <button className='btn btn-secondary' style={{backgroundColor:"white"}} onClick={changepass} type="submit">
        Submit
      </button>
    </div>
  )
}
