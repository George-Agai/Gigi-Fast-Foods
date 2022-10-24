import React from 'react'
import { useCart } from 'react-use-cart'

const FoodCard = (props) => {
    const { addItem } = useCart();
  return (
    <div className='food-sold-container'>
        <div>
            <img 
                src={props.img} 
                alt='food'
                className='foods-sold'
            />
        </div>
        <div className='food-name-food-price-order-button'>
            <div >
                <p>{props.food}</p>
                <p>{props.price}</p>
            </div>
            <div>
                <button className='order-buttons' onClick={()=> addItem(props.item)}>Order</button>
            </div>
        </div>
        
    </div>
  )
}
export default FoodCard;