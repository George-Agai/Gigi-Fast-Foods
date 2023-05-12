import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import './GigiFastFoods.css';
import lottie from 'lottie-web';
import phone from './images/phone.json';
import Loading from './Loading';


const OtpVerification = () => {
  const [ContinueTextFlag, setContinueTextFlag] = useState(true)
  const navigate = useNavigate();
  const location = useLocation()
  const { orderWithoutContact } = location.state ?? {};
  const containerRef = useRef(null);

  console.log(orderWithoutContact)
  if (!orderWithoutContact) {
    console.log("No order founddddd")
  }
  const [phoneNumber, setPhoneNumber] = useState()
  const countryCode = 254;
  const HandleBackArrowClick = () => {
    navigate('/OrdersPage')
  }

  let ws;
  const setUpConnection = () => {
    return new Promise((resolve, reject) => {
      ws = new WebSocket('wss://gigifoods.herokuapp.com')

      ws.onopen = function () {
        resolve(ws);
        console.log('ws connected')
        ws.send(JSON.stringify({messageName: 'new_order'}))
        console.log('order to be updated sent')
        ws.close()
      }
      ws.onclose = function () {
        console.log('ws closed')
      }
      ws.onerror = (error) => {
        reject(error); // Reject the promise with the error
      };
    });
  }

  let fullPhoneNumber;
  const HandleAddPhoneNumberContinueButtonClick = async (e) => {
    e.preventDefault()
    fullPhoneNumber = parseInt(`${countryCode}${phoneNumber}`, 10);
    setContinueTextFlag(false)
    const order = { contact: fullPhoneNumber, ...orderWithoutContact };
    console.log("order nigga", order)
    const sent = await axios.post('https://gigifoods.herokuapp.com/app/Home', order)
    if (sent) {
      navigate('/OrderComplete')
      setContinueTextFlag(true)
      setUpConnection()
    }
  }

  const onInputChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: phone,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);
  
  return (
    <div className='otp-verification'>
      <div style={{ textAlign: 'left', width: '100vw', height: '30vh' }} className='otp-top-div'>
        <div className='Complete-order-back-arrow-div'>
          <button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button>
        </div>
        <div ref={containerRef} className='phone-animation-div'></div>
      </div>
      <div className='otp-bottom-div'>
        <h3>Please enter the phone number  we'll call you on upon delivery {'\u{1F514}'}{'\u{1F919}'}</h3>

        <form onSubmit={(e) => HandleAddPhoneNumberContinueButtonClick(e)} className='form-full'>
          <div className='input-div'>
            <input
              placeholder={countryCode}
              value={countryCode}
              readOnly
              required
              className='country-code'
            />
            <input
              type="text"
              placeholder="712345678"
              value={phoneNumber}
              onChange={onInputChange}
              required
              className='phone-number-input'
            />
          </div>
          <div id='otp-verification-code-div'>
            <button className='complete-order-button' type='submit' value='Submit'> {ContinueTextFlag ? <h4>Continue</h4> : <Loading />}</button>
          </div>
        </form>

      </div>

    </div>
  )
}
export default OtpVerification;