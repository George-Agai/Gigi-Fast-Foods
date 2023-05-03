import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation()
  const { orders, contact, cartTotal, _id } = location.state;
  const [rejectOrConfirmDiv, setRejectOrConfirmDiv] = useState(true)
  const ws = new WebSocket('ws://https://gigifoods.herokuapp.com:8080')
  ws.onclose = function(){
    console.log("order details ws closed")
  }
  const confirmButtonClicked = (e)=>{
    e.preventDefault()
    setRejectOrConfirmDiv(false)
  }
  const orderUpdate = {
    messageName: 'findAndUpdateOrder',
    _id
  }
  const deliveredButtonClicked =()=>{
    ws.send(JSON.stringify(orderUpdate))
    console.log('order to be updated sent')
  }
return (
    <div className='order-details'>
      <p>{contact}</p>
      <div style={{ border: '1px solid black' }}>
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
              <td>Total</td>
              <td>{cartTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {rejectOrConfirmDiv ? 
      <div>
        <button>Reject</button>
        <button onClick={confirmButtonClicked}>Confirm</button>
      </div> :
      <div>
        <button onClick={deliveredButtonClicked}>Delivered</button>
      </div> }
    </div>
)};

export default OrderDetails;