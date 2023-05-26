import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import './GigiFastFoods.css';
import Loading from './Loading';
import { useCart } from 'react-use-cart'
import PhoneAnimation from './PhoneAnimation';

const OtpVerification = () => {
  const [ContinueTextFlag, setContinueTextFlag] = useState(true)
  const navigate = useNavigate();
  const location = useLocation()
  const { orderWithCustomerLocation } = location.state ?? {};
  const {
    emptyCart
  } = useCart()


  if (!orderWithCustomerLocation) {
    console.log("No order founddddd")
  }
  const [phoneNumber, setPhoneNumber] = useState()
  const countryCode = 254;
  const HandleBackArrowClick = () => {
    navigate('/OrdersPage')
  }

  let fullPhoneNumber;
  const HandleAddPhoneNumberContinueButtonClick = async (e) => {
    e.preventDefault()
    fullPhoneNumber = `+${countryCode}${phoneNumber}`;
    localStorage.setItem('phoneNumber', fullPhoneNumber);
    setContinueTextFlag(false)
    const order = { contact: fullPhoneNumber, ...orderWithCustomerLocation };
    console.log("order nigga", order)
    const sent = await axios.post('https://gigifoods.herokuapp.com/app/Home', order)
    if (sent) {
      navigate('/OrderComplete')
      setContinueTextFlag(true)
      emptyCart()
    }
  }

  const onInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length === 1 && inputValue.charAt(0) === '0') {
      setPhoneNumber('');
    } else {
      setPhoneNumber(inputValue);
    }
  }

  return (
    <div className='otp-verification'>
      <div className='otp-top-div'>
        <div className='Complete-order-back-arrow-div'>
          <button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button>
        </div>
        <div style={{ paddingRight: '20px' }}>
          <PhoneAnimation />
        </div>
      </div>
      <div className='otp-bottom-div'>
        <h3>Please enter the phone number  we'll call you on upon delivery {'\u{1F514}'}</h3>

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
              pattern="[0-9]{9,}"
              title="Please enter a valid phone number"
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