import React from 'react'
import { useCart } from 'react-use-cart'
import { BsArrowRight } from 'react-icons/bs'
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import GoogleMapComponent from './GoogleMapComponent'
const ProceedToOrder = () => {
  
    const { isEmpty,
            totalItems
          } = useCart();

  if (isEmpty === false) return (
    <div>
        <button className='cart-orders-button' >
        <div id='order-quantity-div'>
          <h4>Orders <br />( {totalItems} )</h4>
        </div>
        <div id='order-right-arrow-div'>
          <BsArrowRight id='order-button-arrow' />
        </div>
      </button>
      <GoogleMapComponent/>
    </div>
    
  )
}
export default ProceedToOrder;