import React from 'react'
import { useCart } from 'react-use-cart'

const ProceedToOrder = () => {
  
    const { isEmpty,
            totalItems
          } = useCart();

  if (isEmpty === false) return (
    <div>
        <button className='cart-orders-button' >
        <div id='order-quantity-div'>
          <h4>Orders ( {totalItems} )</h4>
        </div>
      </button>
    </div>
    
  )
}
export default ProceedToOrder;