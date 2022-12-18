import React from 'react'
import { useCart } from 'react-use-cart'

const FoodCard = (props) => {
    const { addItem } = useCart();
  return (
    <div className='food-sold-container'>
        
            <img 
                src={props.img} 
                alt='food'
                className='foods-sold'
            />
        
        <div className='food-name-food-price-order-button'>
            <div>
                <p style={{color: 'rgb(54, 52, 52)', fontSize: '15px', marginTop: '10px'}}>{props.food}</p>
                <p  style={{color: 'rgb(85, 79, 79)', fontSize: '13px'}}>{props.price}</p>
            </div>
            <div id='order-buttons-div'>
                <button className='order-buttons' onClick={()=> addItem(props.item)}>Order</button>
            </div>
        </div>
        
    </div>
  )
}
export default FoodCard;