import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import { BsArrowRight } from 'react-icons/bs'
//import { useNavigate } from 'react-router-dom'
import CompleteOrder from './CompleteOrder'
import { useNavigate } from 'react-router-dom'

const Cart = (props) => {

  //Function To Handle Number of orders button clicked to proceed to checkout
  //const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleProceedToOrderClick=(e)=>{
    setIsActive(true);
  }
  const handleOrderDivClick =(e) =>{
    if(items){
      setIsActive(false)
    }
    else{
      setIsActive(true)
    }
  }

  const HandleOnClick=(e)=>{
    document.innerHTML('Whats happening');
  }
  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity

  } = useCart();
  if (isEmpty === false) return (
    <section>
      <div>
      <div onClick={HandleOnClick}>
        <p>Testjvdkjsbvkjabsdvjkbaskjdv</p>
      </div>
        <button className='cart-orders-button' onClick={ handleProceedToOrderClick }>
          <div id='order-quantity-div'>
            <h4>Orders <br />[ {totalItems} ]</h4>
          </div>
          <div id='order-right-arrow-div'>
            <BsArrowRight id='order-button-arrow' />
          </div>
        </button>

        <div style={{display: isActive ? 'block' : 'none'}} onClick={HandleOnClick}>
          <CompleteOrder items={items} isEmpty={isEmpty} totalItems={totalItems} updateItemQuantity={updateItemQuantity} cartTotal={cartTotal} onClick={ handleOrderDivClick }/>
        </div>
      </div>
      

    </section>
  )
}
export default Cart;