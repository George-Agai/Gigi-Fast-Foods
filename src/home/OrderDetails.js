import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation()
  const { orders, contact, cartTotal, _id } = location.state;
  const [rejectOrConfirmDiv, setRejectOrConfirmDiv] = useState(true)

  let ws;
  const setUpConnection = () => {
    return new Promise((resolve, reject) => {
      ws = new WebSocket('wss://gigifoods.herokuapp.com')

      ws.onopen = function () {
        resolve(ws);
        console.log('ws connected')
        ws.send(JSON.stringify(orderUpdate))
        console.log('order to be updated sent')
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
    setRejectOrConfirmDiv(false)
  }
  const orderUpdate = {
    messageName: 'findAndUpdateOrder',
    _id
  }
  const deliveredButtonClicked = () => {
    try {
      const connected = setUpConnection()
      console.log(connected)
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }

  }
  return (
    <div className='order-details'>
      <p>{contact}</p>
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
              <tr key={order._id}>
                <td>{order.food}</td>
                <td>{order.quantity}</td>
                <td>{order.itemTotal}</td>
              </tr>
            ))}
            <tr></tr>
            <tr>
              <td></td>
              <td style={{ fontSize: '12px', color: 'grey' }}>Total</td>
              <td><b style={{ fontSize: '14px' }}>{cartTotal}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
      {rejectOrConfirmDiv ?
        <div className='rejectOrConfirmDiv'>
          <button className='rejectButton'>Reject</button>
          <button onClick={confirmButtonClicked} className='confirmAndDeliveredButton'>Confirm</button>
        </div> :
        <div className='deliveredDiv'>
          <button onClick={deliveredButtonClicked} className='confirmAndDeliveredButton' style={{ width: '90vw', marginTop: '30px' }}>Delivered</button>
        </div>}
    </div>
  )
};

export default OrderDetails;