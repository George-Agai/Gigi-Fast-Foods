import React from 'react'
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();
  return (
    <div className='LogIn'>
        <p id='gigi-fast-foods-header'>GIGI FAST FOODS</p>
        <p>Please enter the number we'll call you on</p>
        <div id='country-code-div'>
            <p>+254</p>
        </div>
        <div id='log-in-phone-number-div'>
            <p>0792271915</p>
        </div>
        <button id='log-in-continue-button' onClick={() => navigate('/OtpVerification')}>Continue</button>
    </div>
  )
}

export default  LogIn;
