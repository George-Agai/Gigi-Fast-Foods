import React from 'react';
import { useNavigate } from "react-router-dom";
import './GigiFastFoods.css';
import { useState } from 'react'
import FoodCard from './FoodCard.js';
import data from './data'
import chipsSmokieData from './chipsSmokieData.js';
import MainMealsCard from './MainMealsCard.js';
import Cart from './Cart';
import { CartProvider, useCart } from 'react-use-cart'



const Home = () => {
    
    const navigate = useNavigate();
    const [SodaActive, setSodaActive] = useState('true');
    const [FruitJuicesActive, setFruitJuicesActive] = useState('');
    const [WaterActive, setWaterActive] = useState('');
    const [YoghurtActive, setYoghurtActive] = useState('');

    const HandleSodaClick = (e) => {
        setSodaActive(true);
        setFruitJuicesActive(false);
        setWaterActive(false);
        setYoghurtActive(false);
    }
    const HandleFruitJuicesClick = (e) => {
        setFruitJuicesActive(true);
        setSodaActive(false);
        setWaterActive(false);
        setYoghurtActive(false);
    }
    const HandleWaterClick = (e) => {
        setWaterActive(true);
        setFruitJuicesActive(false);
        setSodaActive(false);
        setYoghurtActive(false);
    }
    const HandleYoghurtClick = (e) => {
        setYoghurtActive(true);
        setFruitJuicesActive(false);
        setSodaActive(false);
        setWaterActive(false);
    }

    // const {
    //     isEmpty,
    //     items,
    //     totalItems,
    //     cartTotal,
    //     updateItemQuantity

    // } = useCart();
    

    return (

        <div className='Home'>

            <CartProvider>
                <div className='home-header'>
                    <h2>Gigi Fast Foods</h2>
                </div>

                <div className='chips-smokie-main-container'>
                    {chipsSmokieData.chipsSmokieDescription.map((item, index) => {
                        return (
                            <MainMealsCard img={item.img} food={item.food} price={item.price} item={item} />
                        )
                    })}
                </div>
                <div className='fast-foods-main-container'>
                    {data.foodSoldData.map((item, index) => {
                        return (
                            <FoodCard img={item.img} food={item.food} price={item.price} item={item} />
                        )
                    })}
                </div>

                <div className='home-main-body-container'>
                    <h2>Main Meals</h2>
                    <div className='chips-smokie-main-container' id='ugali-fish-main-container'>
                        {chipsSmokieData.ugaliFishDescription.map((item, index) => {
                            return (
                                <MainMealsCard img={item.img} food={item.food} price={item.price} item={item} />
                            )
                        })}
                    </div>

                    <div id='available-drinks-main-container'>
                        <div id='available-drinks-button-container'>
                            <button className='available-drinks-button' onClick={HandleSodaClick}>Soda</button>
                            <button className='available-drinks-button' onClick={HandleFruitJuicesClick}>Fruit Juices</button>
                            <button className='available-drinks-button' onClick={HandleWaterClick}>Water</button>
                            <button className='available-drinks-button' onClick={HandleYoghurtClick}>Yoghurt</button>
                        </div>
                        <hr id='available-drinks-main-container-hr'></hr>

                        {SodaActive &&
                            <div className='available-drink-container'>
                                <div className='available-drink-image-div'>

                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-orange-300ml'>
                                        <p>Fanta orange</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-orange-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-passion-300ml'>
                                        <p>Fanta passion</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-passion-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                    <div className='available-drink-name-price-div'>
                                        <div id='coke-baridi-300ml'>
                                            <p>Coke baridi</p>
                                            <p>300 ml</p>
                                        </div>
                                        <div id='coke-baridi-50-order-button'>
                                            <p>50</p>
                                            <button className='soda-order-buttons'>Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {/* FRUIT JUICES */}

                        {FruitJuicesActive &&
                            <div className='available-drink-container'>
                                <div className='available-drink-image-div'>

                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-orange-300ml'>
                                        <p>Orange Juice</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-orange-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-passion-300ml'>
                                        <p>Mango Juice</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-passion-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                    <div className='available-drink-name-price-div'>
                                        <div id='coke-baridi-300ml'>
                                            <p>Passion Juice</p>
                                            <p>300 ml</p>
                                        </div>
                                        <div id='coke-baridi-50-order-button'>
                                            <p>50</p>
                                            <button className='soda-order-buttons' onClick={() => navigate('/CompleteOrder')}>Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {/* WATER */}

                        {WaterActive &&
                            <div className='available-drink-container'>
                                <div className='available-drink-image-div'>

                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-orange-300ml'>
                                        <p>Dasani</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-orange-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-passion-300ml'>
                                        <p>Dasani</p>
                                        <p>1 litre</p>
                                    </div>
                                    <div id='fanta-passion-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                    <div className='available-drink-name-price-div'>
                                        <div id='coke-baridi-300ml'>
                                            <p>Kinangop</p>
                                            <p>300 ml</p>
                                        </div>
                                        <div id='coke-baridi-50-order-button'>
                                            <p>50</p>
                                            <button className='soda-order-buttons' onClick={() => navigate('/CompleteOrder')}>Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        {/* YOGHURT */}
                        {YoghurtActive &&
                            <div className='available-drink-container'>
                                <div className='available-drink-image-div'>

                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-orange-300ml'>
                                        <p>Vanilla Yoghurt</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-orange-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                </div>
                                <div className='available-drink-name-price-div'>
                                    <div id='fanta-passion-300ml'>
                                        <p>Plain Yoghurt</p>
                                        <p>300 ml</p>
                                    </div>
                                    <div id='fanta-passion-50-order-button'>
                                        <p>50</p>
                                        <button className='soda-order-buttons'>Order</button>
                                    </div>
                                    <div className='available-drink-name-price-div'>
                                        <div id='coke-baridi-300ml'>
                                            <p>Strawberry yoghurt</p>
                                            <p>300 ml</p>
                                        </div>
                                        <div id='coke-baridi-50-order-button'>
                                            <p>50</p>
                                            <button className='soda-order-buttons' onClick={() => navigate('/CompleteOrder')}>Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>


                    <div className='home-footer-div'>
                        <p className='home-footer-div-content'>Gigi Fast Foods</p>
                        <p className='home-footer-div-content'>0702619486</p>
                        <p className='home-footer-div-content'>Utawala</p>
                        <button id='manage' onClick={() => navigate('/EmployeePageOrders')}>Manage</button>
                    </div>
                </div>
                
            
                

                <Cart />
            </CartProvider>

        </div>
    )
}
export default Home;