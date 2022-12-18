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

    return (

        <div>
            <MyContext.Provider value={contextValue}>
            <CartProvider>
                <div className='Home' style={{ display: homeIsActive ? 'flex' : 'none' }}>
                    <div className='home-header'>
                        <h2 id='fast-foods'>Gigi Fast Foods</h2>
                    </div>
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
                       
                        <h2>Main meals</h2>
                        <div className='chips-smokie-main-container' id='ugali-fish-main-container'>
                            {data.ugaliFishDescription.map((item, index) => {
                                return (
                                    <MainMealsCard img={item.img} food={item.food} price={item.price} item={item} key={item.id} />
                                )
                            })}
                        </div>
                        <div id='drinks' style={{ height: '70px', marginTop: '-50px', marginBottom: '10px' }}></div>
                        <div className='available-drinks-main-container' >
                            <div className='available-drinks-button-container'>
                                <button className='available-drinks-button' id='available-drinks-button-soda' onClick={HandleSodaClick} style={{ backgroundColor: SodaActive ? 'rgb(187, 179, 179)' : 'rgb(247, 245, 245)', border: SodaActive ? '1px solid rgb(163, 156, 156)' : '1px solid  rgba(197, 191, 191, 1)' }}>Soda</button>
                                <button className='available-drinks-button' onClick={HandleFruitJuicesClick} style={{ backgroundColor: FruitJuicesActive ? 'rgb(187, 179, 179)' : 'rgb(247, 245, 245)', border: FruitJuicesActive ? '1px solid rgb(163, 156, 156)' : '1px solid  rgba(197, 191, 191, 1)' }}>Juice</button>
                                <button className='available-drinks-button' onClick={HandleWaterClick} style={{ backgroundColor: WaterActive ? 'rgb(187, 179, 179)' : 'rgb(247, 245, 245)', border: WaterActive ? '1px solid rgb(163, 156, 156)' : '1px solid  rgba(197, 191, 191, 1)' }}>Water</button>
                                <button className='available-drinks-button' onClick={HandleYoghurtClick} style={{ backgroundColor: YoghurtActive ? 'rgb(187, 179, 179)' : 'rgb(247, 245, 245)', border: YoghurtActive ? '1px solid rgb(163, 156, 156)' : '1px solid  rgba(197, 191, 191, 1)' }}>Yoghurt</button>
                            </div>
                            <hr id='available-drinks-main-container-hr' />

                            {SodaActive &&
                                <div className='available-drink-container' >
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
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                <p>Gigi Fast Foods</p>
                                <p>0702619486</p>
                                <p>Utawala</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div className='social-media-icons-container'>
                                    <div className='social-media-icons-div'> <a href="https://twitter.com/george__agai" target="_blank" rel="noreferrer" style={{ color: 'rgb(145, 139, 139)' }}><BsTwitter /></a> </div>
                                    <div className='social-media-icons-div'> <GrFacebookOption /> </div>
                                    <div className='social-media-icons-div'> <BsInstagram /> </div>
                                </div>
                                <button id='manage' onClick={() => navigate('/EmployeePageOrders')}>Manage</button>
                                <p style={{ color: 'rgb(145, 139, 139)', fontSize: '8px', marginTop: '20px' }}>Copyright © 2022 George Agai</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={ HandleProceedToOrderButtonClicked } style={{ display: ordersButtonActive ? 'flex' : 'none' }}>
                    <ProceedToOrder />
                </div>
                <div style={{ display: cartIsActive ? 'flex' : 'none', flexDirection: 'column' }}>
                    {backArrow && <div className='Complete-order-back-arrow-div'><button onClick={ HandleBackArrowClick } className='back-arrow-buttons'><BiArrowBack /></button></div>}
                    <OrdersPage />
                </div>
            </CartProvider>
            </MyContext.Provider>
        </div>
    )
}
export default Home;