import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
  return (
    <div className='AdminPage'>
        <div className='admin-page-back-button-and-amount-container'>
            <div >
                <button className='back-arrows' onClick={() => navigate('/Home')}>Back</button>
            </div>
            <div>
                <p>Today</p>
                <p>870</p>
            </div>
        </div>
        <div className='business-today-and statements-container'>
            <button>Business Today</button>
            <button>Monthly Statements</button>
        </div>
        <div>
            <div className='order-types-and-expenses-button-container'>
                <button>Online Orders</button>
                <button>Offline Orders</button>
                <button>Expenses</button>
            </div>
            <div className='admin-page-online-orders'>
                <h3>Online orders div</h3>
            </div>
            <div className='admin-page-offline-orders'>
                <h3>Offline orders div</h3>
            </div>
            <div className='admin-page-expenses'>
                <h3>expenses div</h3>
            </div>
        </div>
    </div>
  )
}
export default AdminPage;