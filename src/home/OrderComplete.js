import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from 'lottie-web';
import complete from './images/complete.json';
import { BiArrowBack } from 'react-icons/bi'
import './GigiFastFoods.css';

const OrderComplete = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      animationData: complete,
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  const HandleBackArrowClick = () => {
    navigate('/Home')
  }
  return (
    <div className='loading-container'>
      <div className='order-complete-back-arrow-div'>
        <button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button>
        <div>{'\u{1F680}'}</div>
      </div>
      <div><p>Order complete</p></div>
      <div ref={containerRef} className='loading'>
      </div>

      {/* <button className='back-to-main-page' onClick={handleBackHomeButtonClick}><div><BsArrowLeftShort style={{ fontSize: "22px", marginRight: "4px", marginTop: "4px" }} /></div>Back to main page</button> */}
    </div>
  )
}


export default OrderComplete;