import React from 'react'
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
    const navigate = useNavigate();
  return (
    <div className='OrderComplete'>
        <p>Order complete</p>
        <div></div>
        <button id='back-to-main-page-button' onClick={() => navigate('/Home')}>
            Back to main page
        </button>
    </div>
  )
}
export default OrderComplete;