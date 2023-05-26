import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import OrderDetailsGoogleMapComponent from './OrderDetailsGoogleMapComponent';

const OrderDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { confirmed, customerLocation, orders, contact, cartTotal, _id } = location.state;
  const [rejectOrConfirmDiv, setRejectOrConfirmDiv] = useState(true)


  let ws;
  const setUpConnection = (messageObject) => {
    return new Promise((resolve, reject) => {
      ws = new WebSocket('wss://gigifoods.herokuapp.com')

      ws.onopen = function () {
        resolve(ws);
        console.log('ws connected')
        ws.send(JSON.stringify(messageObject))
      }
      ws.onmessage = ({ data }) => {
        const { messageName } = JSON.parse(data)
        if (messageName === 'rejectedOrderUpdated') {
          console.log('Order Rejected')
        }
        else if (messageName === 'completedOrderUpdated') {
          console.log('Order Completed')
        }
        else if (messageName === 'confirmedOrderUpdated') {
          console.log('Order confirmed')
        }
        ws.close()
      }
      ws.onclose = function () {
        console.log('ws closed')
      }
      ws.onerror = (error) => {
        reject(error); // Reject the promise with the error
      };
    });
  }

  const confirmButtonClicked = (e) => {
    e.preventDefault()
    try{
      setUpConnection(orderConfirmed)
      setRejectOrConfirmDiv(false)
    }catch(error){
      console.log(error)
    }
  }

  const RejectButtonClicked = (e) => {
    e.preventDefault()
    try {
      setUpConnection(orderRejected)
      navigate('/EmployeePageOrders')
    } catch (error) {
      console.log(error)
    }
  }
  const orderUpdate = {
    messageName: 'findAndUpdateOrder',
    _id
  }
  const orderRejected = {
    messageName: 'findAndUpdateRejectedOrder',
    _id
  }
  const orderConfirmed = {
    messageName: 'findAndUpdateConfirmedOrder',
    _id
  }

  const deliveredButtonClicked = () => {
    try {
      setUpConnection(orderUpdate)
      navigate('/EmployeePageOrders')
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }

  }
  return (
    <div className='order-details'>
      <OrderDetailsGoogleMapComponent userLocation={customerLocation} contact={contact}/>
      <div className='ordersInOrderDetailsDiv'>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='order-details-tbody'>
                <td>{order.food}</td>
                <td>{order.quantity}</td>
                <td>{order.itemTotal}</td>
              </tr>
            ))}
            <tr></tr>
            <tr></tr>
            <tr>
              <td style={{ fontSize: '12px', color: 'grey' }}>Total</td>
              <td></td>
              <td style={{ fontSize: '14px', color: 'grey' }}>{cartTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {!confirmed && rejectOrConfirmDiv?
        <div className='rejectOrConfirmDiv'>
          <button onClick={RejectButtonClicked} className='rejectButton'>Reject</button>
          <button onClick={confirmButtonClicked} className='confirmAndDeliveredButton'>Confirm</button>
        </div> :
        <div className='deliveredDiv'>
          <button onClick={deliveredButtonClicked} className='confirmAndDeliveredButton' style={{ width: '90vw', marginTop: '30px' }}>Delivered</button>
        </div>}
    </div>
  )
};

export default OrderDetails;