import React from 'react'
import { useNavigate } from 'react-router-dom'
import clock from './images/clock.png'

const PendingOrderTemplate = ({ newOrder }) => {
  const navigate = useNavigate()
  
  return (
    <div className='orders-container-container'>
      {newOrder.map(({ orders, contact, cartTotal, _id, date }, index) => (
        <div key={_id} className='orders-container'>
          <div className='orders-container-time'>
            <div style={{display: 'flex', alignItems: 'center'}}><img src={clock} alt='clock' className='icons'/> <span style={{marginLeft: '3px'}}>{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span></div>
          </div>
          <div className='orders-container-bottom'>
            <div><p>Order {index + 1}</p></div>
            <div><p>{cartTotal}</p></div>
            <div><button className='details-button' onClick={() => navigate('/OrderDetails', { state: { contact, orders, cartTotal, _id, date } })}>Details</button></div>
          </div>

        </div>
      ))}
    </div>
  )
}
export default PendingOrderTemplate;