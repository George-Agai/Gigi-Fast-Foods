import React, { useState, createContext } from 'react';
import { useNavigate } from "react-router-dom";
import './GigiFastFoods.css';
import FoodCard from './FoodCard.js';
import data from './data'
import MainMealsCard from './MainMealsCard.js';
import { CartProvider } from 'react-use-cart'
import ProceedToOrder from './ProceedToOrder';
import OrdersPage from './OrdersPage';
import DrinksCard from './DrinksCard';
import { BiArrowBack } from 'react-icons/bi'
import softdrink from './images/soft-drink.png'
import burger from './images/burger.png'
import mainmeal from './images/fish.png'
import { BsTwitter } from 'react-icons/bs'
import { GrFacebookOption } from 'react-icons/gr'
import { BsInstagram } from 'react-icons/bs'
import cooking from './images/cooking.png'
import freedelivery from './images/free-delivery.png'
import meal from './images/meal.png'
import panda from './images/panda.png'

//create a context object
export const MyContext = createContext();

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
    const [homeIsActive, setHomeIsActive] = useState(true);
    const [cartIsActive, setCartIsActive] = useState('');
    const [ordersButtonActive, setOrdersButtonActive] = useState(true)
    const [backArrow, setBackArrow] = useState(true)

    //Pass the value of the state and the function to update the state to the context object
    const contextValue = {
        homeIsActive, setHomeIsActive,
        ordersButtonActive, setOrdersButtonActive,
        backArrow, setBackArrow
    };

    const HandleBackArrowClick = (e) => {
        setHomeIsActive(true)
        setCartIsActive(false)
        setOrdersButtonActive(true)
    }
    const HandleProceedToOrderButtonClicked = (e) => {
        setHomeIsActive(false)
        setCartIsActive(true)
        setOrdersButtonActive(false)
    }
    const handleScrollToMainMeals = (e) => {
        const element = document.getElementById('main-meals');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleScrollToDrinks = (e) => {
        const element = document.getElementById('drinks');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleScrollToFastFoods = (e) => {
        const element = document.getElementById('fast-foods');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    let today = new Date().getFullYear()

    return (
        <div>
            <MyContext.Provider value={contextValue}>
                <CartProvider>
                    <div className='Home' style={{ display: homeIsActive ? 'flex' : 'none' }}>
                        <div className='home-header'>
                            <h2 id='fast-foods'>Gigi Fast Foodss</h2>

                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className='svgheader'><path fill="#8a2be2" fill-opacity="1" d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                        <div className='navigation-buttons-div-container' >
                            <button className='softdrink-button' style={{ width: '130px', marginLeft: '5px' }} onClick={handleScrollToFastFoods}><div className='navigation-buttons-div' style={{ marginLeft: '-14px' }}><img src={burger} alt='fastfood' className='softdrink' /></div>&ensp;<p>Fast Food</p></button>
                            <button className='softdrink-button' onClick={handleScrollToMainMeals}><div className='navigation-buttons-div'><img src={mainmeal} alt='mainmeal' className='softdrink' /></div>&ensp;<p>Meals</p></button>
                            <button className='softdrink-button' onClick={handleScrollToDrinks}><div className='navigation-buttons-div'><img src={softdrink} alt='softdrink' className='softdrink' /></div>&ensp;<p>Drinks</p></button>
                        </div>

                        <div className='chips-smokie-main-container'>
                            {data.chipsSmokieDescription.map((item, index) => {
                                return (

                                    <MainMealsCard img={item.img} food={item.food} price={item.price} item={item} key={item.id} />
                                )
                            })}
                        </div>

                        <div className='fast-foods-main-container'>
                            {data.foodSoldData.map((item, index) => {
                                return (
                                    <FoodCard img={item.img} food={item.food} price={item.price} item={item} key={item.id} />
                                )
                            })}
                        </div>
                        <div style={{ height: '30px', marginTop: '-30px' }} id='main-meals'></div>
                        <div className='home-main-body-container'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ marginBottom: '-2px' }}><path fill="#8a2be2" fill-opacity="1" d="M0,160L80,170.7C160,181,320,203,480,208C640,213,800,203,960,181.3C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                            <div className='main-meals-div-container'>
                                <div className='cooking-div'>
                                    <img src={cooking} alt='cooking' className='cooking' />
                                    <div className='main-meals-div'>
                                        <p>Delicious meals delivered in minutes!</p>
                                        <img src={freedelivery} alt='freedelivery' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='meal-div'>
                                <p>_____</p>
                                <img src={meal} alt='meal' className='meal' />
                                <p>_____</p>
                            </div>
                            <div className='chips-smokie-main-container' id='ugali-fish-main-container'>
                                {data.ugaliFishDescription.map((item, index) => {
                                    return (
                                        <MainMealsCard img={item.img} food={item.food} price={item.price} item={item} key={item.id} />
                                    )
                                })}
                            </div>
                            <div className='panda-container' id='drinks'>
                                <p>_____</p>
                                <img src={panda} alt='panda' className='panda' />
                                <p>_____</p>
                            </div>
                            <div className='available-drinks-main-container'>
                                <div className='available-drinks-button-container'>
                                    <button className='available-drinks-button' id='available-drinks-button-soda' onClick={HandleSodaClick} style={{ backgroundColor: SodaActive ? 'rgb(247, 245, 245)' : 'rgb(247, 245, 245)', border: SodaActive ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: SodaActive ? '#8a2be2' : 'rgba(95, 86, 86, 1)' }}>Soda</button>
                                    <button className='available-drinks-button' onClick={HandleFruitJuicesClick} style={{ backgroundColor: FruitJuicesActive ? 'rgb(247, 245, 245)' : 'rgb(247, 245, 245)', border: FruitJuicesActive ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: FruitJuicesActive ? '#8a2be2' : 'rgba(95, 86, 86, 1)' }}>Juice</button>
                                    <button className='available-drinks-button' onClick={HandleWaterClick} style={{ backgroundColor: WaterActive ? 'rgb(247, 245, 245)' : 'rgb(247, 245, 245)', border: WaterActive ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: WaterActive ? '#8a2be2' : 'rgba(95, 86, 86, 1)' }}>Water</button>
                                    <button className='available-drinks-button' onClick={HandleYoghurtClick} style={{ backgroundColor: YoghurtActive ? 'rgb(247, 245, 245)' : 'rgb(247, 245, 245)', border: YoghurtActive ? '1.5px solid #8a2be2' : '1px solid  rgba(197, 191, 191, 1)', color: YoghurtActive ? '#8a2be2' : 'rgba(95, 86, 86, 1)' }}>Yoghurt</button>
                                </div>
                                {SodaActive &&
                                    <div>
                                        {data.availableDrinks.map((item, index) => {
                                            return (
                                                <DrinksCard img={item.img} food={item.food} price={item.price} description={item.description} item={item} key={item.id} />
                                            )
                                        })}
                                    </div>}
                                {FruitJuicesActive &&
                                    <div className='available-drink-container'>
                                        {data.fruitJuices.map((item, index) => {
                                            return (
                                                <DrinksCard img={item.img} food={item.food} price={item.price} description={item.description} item={item} key={item.id} />
                                            )
                                        })}
                                    </div>}
                                {WaterActive &&
                                    <div className='available-drink-container'>
                                        {data.water.map((item, index) => {
                                            return (
                                                <DrinksCard img={item.img} food={item.food} price={item.price} description={item.description} item={item} key={item.id} />
                                            )
                                        })}
                                    </div>}
                                {YoghurtActive &&
                                    <div className='available-drink-container'>
                                        {data.yoghurt.map((item, index) => {
                                            return (
                                                <DrinksCard img={item.img} food={item.food} price={item.price} description={item.description} item={item} key={item.id} />
                                            )
                                        })}
                                    </div>}
                                <div className='drinks-page-white-space'></div>
                            </div>
                            <div className='home-footer-div'>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <button id='manage' onClick={() => navigate('/EmployeePageOrders')}>Gigi Fast Foods</button>
                                    <p>0702619486</p>
                                    <p>Utawala</p>
                                    <a href="https://twitter.com/george__agai" target="_blank" rel="noreferrer" style={{ color: 'rgb(145, 139, 139)', fontSize: '9px', marginTop: '11px' }}>George Agai</a>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className='social-media-icons-container'>
                                        <div className='social-media-icons-div'> <a href="https://twitter.com/george__agai" target="_blank" rel="noreferrer" style={{ color: 'rgb(145, 139, 139)' }}><BsTwitter /></a> </div>
                                        <div className='social-media-icons-div'> <GrFacebookOption /> </div>
                                        <div className='social-media-icons-div'> <BsInstagram /> </div>
                                    </div>

                                    <p style={{ color: 'rgb(145, 139, 139)', fontSize: '10px', marginTop: '25px' }}>Copyright © 2022 - {today}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={HandleProceedToOrderButtonClicked} style={{ display: ordersButtonActive ? 'flex' : 'none' }}>
                        <ProceedToOrder />
                    </div>
                    <div style={{ display: cartIsActive ? 'flex' : 'none', flexDirection: 'column' }}>
                        {backArrow && <div className='Complete-order-back-arrow-div'><button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button></div>}
                        <OrdersPage />
                    </div>
                </CartProvider>
            </MyContext.Provider>
        </div>
    )
}
export default Home;