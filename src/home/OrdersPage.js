import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useCart } from 'react-use-cart'
import shoppingCart from './images/shopping-cart.png'
import verified from './images/tick.gif'
import { MyContext } from './Home';
import { BsArrowLeftShort } from 'react-icons/bs'

const OrdersPage = () => {
    const context = useContext(MyContext);
    const {
        homeIsActive, setHomeIsActive,
        ordersButtonActive, setOrdersButtonActive,
        backArrow, setBackArrow
    } = context;
    console.log(homeIsActive)
    console.log(ordersButtonActive)
    console.log(backArrow)
    const [orderCompletePage, setOrderCompletePage] = useState(false)
    const [checkoutPage, setCheckoutPage] = useState(true)
    const [backHomeButton, setBackHomeButton] = useState(false)
    // const [pendingOrderObject, setPendingOrderObject] = useState({})
    const {
        isEmpty,
        items,
        cartTotal,
        emptyCart,
        updateItemQuantity
    } = useCart()

    const orders = [...items];

    //Array of reduced order attributes filtered based on specified attributes
    const reducedOrder = orders.map((order) => (
        {
            food: order.food,
            itemTotal: order.itemTotal,
            quantity: order.quantity
        }
    ));

    //Array of complete customer order to be processed for delivery
    const customerCompletedOrder = [...reducedOrder]

    const contact = 89023
    const ws = new WebSocket('wss://https://gigifoods.herokuapp.com:8080');
    ws.onclose = function() {
        console.log('WebSocket connection closed');
    };
    const order = {
        contact: contact,
        orders: [...customerCompletedOrder],
        cartTotal: cartTotal,
        status: "Pending"
    }
    const orderMessage = {
        messageName: 'new_order',
        order
    }
    const sendOrder = () => {
        ws.send(JSON.stringify(orderMessage))
        return true;
    };
    const HandleCompleteOrder = async (e) => {
        e.preventDefault()
       
        await axios.post('https://gigifoods.herokuapp.com/app/Home', order)
        const done = sendOrder()
        if(done){
        console.log("Message sent to web socket")
        ws.close()
        }
        setOrderCompletePage(true)
        setCheckoutPage(false)
        setBackArrow(false)
    }

    const handleBackHomeButtonClick = (e) => {
        e.preventDefault()

        setOrderCompletePage(false)
        setCheckoutPage(true)
        setHomeIsActive(true)
        emptyCart()
        setOrdersButtonActive(true)
        setBackArrow(true)
    }

    useEffect(() => {
        const timer = setTimeout(() => setBackHomeButton(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (isEmpty === false) return (
        <div>
            {checkoutPage && <div className='CompleteOrder'>
                <div className='order-container'>
                    <table id='order-table'>
                        <thead>
                            <tr id='order-table-row'>
                                <td><b style={{ fontSize: "14px" }}>Order</b></td>
                                <td><b style={{ fontSize: "14px" }}>Amount</b></td>
                            </tr>
                        </thead>
                        {items.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.food}</td>
                                        <td>{item.price}</td>
                                        <td><button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='update-quantity-buttons'><b>-</b></button> {item.quantity} <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='update-quantity-buttons'><b>+</b></button></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    <div>
                        <h3 id='total-and-amount'>Total&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{cartTotal}</h3>
                    </div>
                    <div>
                        <form onSubmit={HandleCompleteOrder}>
                            <button className='complete-order-button' type='submit' value='submit'>Complete order</button>
                        </form>
                    </div>
                </div>

            </div>}

            {orderCompletePage && (
                <div className='OrderComplete'>
                    <p>Order complete.</p>
                    <img
                        src={verified}
                        alt='verified'
                        className='tick'
                    />
                    <div>
                        {backHomeButton && <button className='back-to-main-page' onClick={handleBackHomeButtonClick}><div><BsArrowLeftShort style={{ fontSize: "22px", marginRight: "4px", marginTop: "4px" }} /></div>Back to main page</button>}
                    </div>
                </div>
            )}
        </div>
    )
    return <div className='empty-cart-container'>
        <h2 className='empty-cart-anaimation'>Empty cart</h2>
        <img src={shoppingCart} alt='shoppingCart' style={{ width: '150px', height: '145px' }} />
    </div>
}
export default OrdersPage;