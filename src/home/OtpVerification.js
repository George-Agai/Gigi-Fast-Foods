import React from 'react';
import { useNavigate } from "react-router-dom";


const OtpVerification = () => {
    const navigate = useNavigate();
  return (
    <div className='otp-verification'>
        <p>Enter code</p>
        <p>We've sent it to <br/>+254792271915</p>
        <div id='otp-verification-code-div'>
            <button onClick={() => navigate('/OrderComplete')} >Code</button>
        </div>
    </div>
  )
}
export default OtpVerification;