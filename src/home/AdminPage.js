import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'

const AdminPage = () => {
    const navigate = useNavigate();
    const [onlineOrders, setonlineOrders] = useState('true')
    const [offlineOrders, setofflineOrders] = useState('')
    const [expenses, setexpenses] = useState('')
    const [businessToday, setbusinessToday] = useState(true)
    const [monthlyStatements, setmonthlyStatements] = useState('')

    const HandleOnlineOrdersButtonClick = (e) => {
        setonlineOrders(true)
        setofflineOrders(false)
        setexpenses(false)
    }
    const HandleOfflineOrdersButtonClick = (e) => {
        setofflineOrders(true)
        setonlineOrders(false)
        setexpenses(false)
    }
    const HandleExpensesButtonClick = (e) => {
        setexpenses(true)
        setofflineOrders(false)
        setonlineOrders(false)
    }
    const HandleBusinessTodayButtonClick = (e) => {
        setbusinessToday(true)
        setmonthlyStatements(false)
    }
    const HandleMonthlyStatementsButtonClick = (e) => {
        setmonthlyStatements(true)
        setbusinessToday(false)
    }
    return (
        <div className='AdminPage'>
            <div className='admin-page-top-flex-container'>
                <div className='admin-page-back-button-and-amount-container'>

                    <button className='back-arrow-buttons' id='admin-page-back-button' onClick={() => navigate('/Home')}><BiArrowBack /></button>

                    <div className='today-amount'>
                        <p style={{ color: 'rgba(179, 188, 76, 1)', fontSize: '12px' }}>Today</p>
                        <p style={{ color: 'rgba(232, 232, 232, 1)', fontSize: '34px' }}>870</p>
                    </div>
                </div>
                <div className='business-today-and-statements-container'>
                    <button onClick={HandleBusinessTodayButtonClick} style={{ backgroundColor: businessToday ? 'rgba(120, 122, 106, 1)' : 'rgb(247, 245, 245)', color: businessToday ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Business Today</button>
                    <button onClick={HandleMonthlyStatementsButtonClick} style={{ backgroundColor: monthlyStatements ? 'rgba(120, 122, 106, 1)' : 'rgb(247, 245, 245)', color: monthlyStatements ? 'rgb(231, 226, 226)' : 'rgba(95, 86, 86, 1)' }}>Monthly Statements</button>
                </div>
            </div>
            {businessToday ? <div className='order-types-and-expenses-main-container'>
                <div className='order-types-and-expenses-button-container'>
                    <button onClick={HandleOnlineOrdersButtonClick} style={{ backgroundColor: onlineOrders ? 'rgba(212, 231, 95, 1)' : 'rgba(255, 254, 254, 1)' }}>Online Orders</button>
                    <button onClick={HandleOfflineOrdersButtonClick} style={{ backgroundColor: offlineOrders ? 'rgba(212, 231, 95, 1)' : 'rgba(255, 254, 254, 1)' }}>Offline Orders</button>
                    <button onClick={HandleExpensesButtonClick} style={{ backgroundColor: expenses ? 'rgba(212, 231, 95, 1)' : 'rgba(255, 254, 254, 1)' }}>Expenses</button>
                </div>
                {onlineOrders ? <div className='admin-page-online-orders'>
                    <h3>Online orders div</h3>
                </div> : null}

                {offlineOrders ? <div className='admin-page-offline-orders'>
                    <h3>Offline orders div</h3>
                </div> : null}

                {expenses ? <div className='admin-page-expenses'>
                    <h3>expenses div</h3>
                </div> : null}
                <div className='page-white-space'></div>
            </div> : null}
            
            {monthlyStatements ? <div className='order-types-and-expenses-main-container'>
                <p>Monthly statements</p>
                <div className='page-white-space'></div>
            </div> : null}
        </div>
    )
}
export default AdminPage;