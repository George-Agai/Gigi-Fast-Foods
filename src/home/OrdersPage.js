import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { BiArrowBack } from 'react-icons/bi'
import EmptyCart from './EmptyCart';
import axios from 'axios'
import Loading from './Loading';
import GoogleMapComponent from './GoogleMapComponent'

const OrdersPage = () => {
    const navigate = useNavigate()
    const [ContinueTextFlag, setContinueTextFlag] = useState(true)
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


    const orderWithoutContact = {
        orders: [...customerCompletedOrder],
        cartTotal: cartTotal,
        status: "Pending"
    }

    const HandleCompleteOrder = async (e) => {
        e.preventDefault()
        try {
            setContinueTextFlag(false)
            const LocalStoragePhoneNumber = localStorage.getItem('phoneNumber');
            console.log("Local storage", LocalStoragePhoneNumber)

            if (LocalStoragePhoneNumber) {
                const order = { contact: LocalStoragePhoneNumber, ...orderWithoutContact };
                console.log(order)
                const sent = await axios.post('https://gigifoods.herokuapp.com/app/Home', order)
                if (sent) {
                    navigate('/OrderComplete')
                    setContinueTextFlag(true)
                    emptyCart()
                }
            }
            else {
                navigate('/OtpVerification', { state: { orderWithoutContact } })
                setContinueTextFlag(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const HandleBackArrowClick = () => {
        navigate('/Home')
        localStorage.removeItem('phoneNumber')
    }

    if (isEmpty === false) return (
        <div className='CompleteOrder'>
            {/* <div className='Complete-order-back-arrow-div'><button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button></div> */}
            <div>
                <GoogleMapComponent />
            </div>
            <div className='order-container'>
                <table id='order-table'>
                    <thead>
                        <tr id='order-table-row'>
                            <td><b style={{ fontSize: "12px", color: 'grey', fontWeight: '500' }}>Order</b></td>
                            <td><b style={{ fontSize: "12px", color: 'grey', fontWeight: '500' }}>Amount</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.food}</td>
                                    <td>{item.price}</td>
                                    <td><button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='update-quantity-buttons'><b>-</b></button> {item.quantity} <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='update-quantity-buttons'><b>+</b></button></td>
                                </tr>
                            )
                        })}
                        <tr id='total-and-amount'>
                            <td>Total</td>
                            <td>{cartTotal}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={HandleCompleteOrder}>
                    <button className='complete-order-button' type='submit' value='submit'> {ContinueTextFlag ? <h4>Complete order</h4> : <Loading />}</button>
                </form>
            </div>
        </div>
    )
    return <EmptyCart />
}
export default OrdersPage;