import React from 'react'
import { useCart } from 'react-use-cart'

const DrinksCard = (props) => {
    const { addItem } = useCart();
    return (
        <div className='drinks-sold-main-container'>
            
                <img
                    src={props.img}
                    alt='food'
                    className='drinks-sold'
                />
            
            <div className='drink-name-drink-price-drink-description-order-button'>
                <p style={{fontSize: '15px'}}>{props.food}</p>
                <p style={{color: 'rgb(54, 52, 52)', fontSize: '14px'}}>{props.description}</p>
                <p style={{color: 'rgb(85, 79, 79)', fontSize: '13px'}}>{props.price}</p>
            </div>
            <div className='drinks-order-button-div'>
                <button className='order-buttons' onClick={() => addItem(props.item)}>Add</button>
            </div>


        </div>
    )
}
export default DrinksCard;