import React from 'react'
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <div className='OrderDetails'>
      <div>
        <button className='back-arrows' onClick={() => navigate('/EmployeePageOrders')}>Back</button>
      </div>
      <div>
        <p>Order 1</p>
        <p>0792271915</p>
        <p>Minimart,Utawala</p>
      </div>
      <div>
        <div>
          <h3>Customer location div</h3>
        </div>
        <div>
          <h3>Customer order div</h3>
        </div>
        <div className='order-details-buttons-div'>
          <button>Reject</button>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  )
}
export default OrderDetails;