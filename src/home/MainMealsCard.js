import React from 'react'
import './GigiFastFoods.css'
import { useCart } from 'react-use-cart'

const MainMealsCard = (props) => {
    const { addItem } = useCart();
    return (
        <div className='main-meals-sold-container'>

            <img
                src={props.img}
                alt='food'
                className='main-meals-sold'
            />

            <div className='chips-smokie-p-price-p-order-div'>
                <div className='chips-smokie-p-price-p'>
                    <p id='chips-smokie'>{props.food}</p>
                    <p id='one-thirty'>{props.price}</p>
                </div>
                <div className='main-meal-order-button-div'>
                    <button className='order-buttons' id='main-meal-order-button' onClick={() => addItem(props.item)}>Order</button>
                </div>
            </div>

        </div>
    )
}
export default MainMealsCard;