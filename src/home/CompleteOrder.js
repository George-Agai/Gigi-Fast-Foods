import React from 'react';
import './GigiFastFoods.css';
import { useCart } from 'react-use-cart'
// import { useNavigate } from "react-router-dom";

const CompleteOrder = (props) => {
  // const navigate = useNavigate();

 
  return (
    <div className='CompleteOrder'>
      <div>
        <table>

          {props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{item.price}</td>
                <td><button onClick={() => props.updateItemQuantity(item.id, item.quantity - 1)}>-</button> {item.quantity} <button onClick={() => props.updateItemQuantity(item.id, item.quantity + 1)}>+</button></td>
              </tr>

            )
          })}
        </table>
        <div>
          <h2>Total {props.cartTotal}</h2>
        </div>
      </div>
      <button id='complete-order-button' >Complete order</button>
      <div id='payment-is-on-delivery'>
        <p>Payment is on delivery</p>
      </div>
    </div>
 
  //  <div>Hello
  //   <div>
  //        <table>

  //          {items.map((item, index) => {
  //           return (
  //             <tr key={index}>
  //               <td>{item.food}</td>
  //               <td>{item.price}</td>
  //               <td><button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button> {item.quantity} <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button></td>
  //             </tr>

  //           )
  //         })}
  //       </table>
  //       <div>
  //         <h2>Total {cartTotal}</h2>
  //       </div>
  //     </div>
  //     <button id='complete-order-button' >Complete order</button>
  //     <div id='payment-is-on-delivery'>
  //       <p>Payment is on delivery</p>
  //     </div>
  // </div>
    )
}
export default CompleteOrder;