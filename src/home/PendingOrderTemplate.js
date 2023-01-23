import React from 'react'
import { useNavigate } from 'react-router-dom'

const PendingOrderTemplate = ({ newOrder }) => {
  const navigate = useNavigate()
  return (
    <div className='orders-container-container'>
        {newOrder.map(({orders, contact, cartTotal, _id}) => (
            <div key={_id} className='orders-container'>
                <div>Order</div>
                <div><p>{cartTotal}</p></div>
                <div><button className= 'details-button' onClick={() => navigate('/OrderDetails', { state: { contact, orders, cartTotal, _id }})}>Details</button></div>
            </div>
        ))}
    </div>
  )
}
export default PendingOrderTemplate;