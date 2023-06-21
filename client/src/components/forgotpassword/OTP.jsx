import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OTP() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate=useNavigate();
    useEffect(()=>{
        if(otp==location.state.forgot){
            navigate("/changepass",{state:{email:location.state.email}});
        }
    })
  return (
    <div className='home-container'>
      <h3>Enter Otp</h3>
    {/* <div>{location.state.forgot}</div> */}
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    </div>
  );
}