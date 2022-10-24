import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import AdminPage from './AdminPage'

const EmployeePageOrders = () => {
    const navigate = useNavigate();
    const [LoginPage, setLoginPage] = useState('true');
    const [Login, setLogin]  = useState('');
    const [adminLogin, setAdminLogin]  = useState('');
    const [name, setName ] = useState('');
    const [password, setPassword ] = useState('');
    const [adminName, setAdminName] =useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const onBackButtonClicked = (e)=>{
        navigate('/EmployeePageOrders')
        if(Login){
            setLoginPage(false)
        }
        else setLogin(true)
    }
//Employee login form onsubmit 
    const HandleEmployeeLogin =(e)=>{
        e.preventDefault();
        
        const user = "Jane";
        const passwordd = "Jane2022";

        if(user===name && password===passwordd){
                setLogin(true);
                setLoginPage(false);
        }
        else alert("Wrong password");  
    }

//Admin login form onsubmit 
    const HandleAdminLogin =(e)=>{
        e.preventDefault();
        
        const admin = "Beril";
        const adminPasswordd = "Beril2022";

        if(admin===adminName && adminPasswordd===adminPassword){
                setAdminLogin(true);
                setLoginPage(false);
                setLogin(false);
        }
        else alert("Wrong password");  
    }

  return (
    <div>
    {/* LOGIN PAGE */}

    {LoginPage && 
        <div className='manage-main-container'>
        <p id='manage-main-container-heading'>GIGI FAST FOODS</p>
        <div id='employee-login-div'>
            <form onSubmit={ HandleEmployeeLogin }>
                <label>Name</label>
                <input type='text' name='name' onChange={(e)=>setName(e.target.value)} value={ name }/>
                <label>Password</label>
                <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} value={ password }/>
                <button type='submit' value='Submit'>Login</button>
            </form>
        </div>
        <div id='admin-login-div'>
            <p>Admin</p>
            <form onSubmit={ HandleAdminLogin }>
                <label>Name</label>
                <input type='text' name='name' onChange={(e)=>setAdminName(e.target.value)} value={ adminName }/>
                <label>Password</label>
                <input type='password' name='password' onChange={(e)=>setAdminPassword(e.target.value)} value={ adminPassword }/>
                <button type='submit' value='Submit'>Login</button>
            </form>
        </div>
    </div>} 

    {Login &&
    <div className='Employee-Page-Orders'>
    <button className='back-arrows' onClick={ onBackButtonClicked }>Back</button>
    <div className='orders-income-expense-div'>
        <button >Orders</button>
        <button onClick={() => navigate('/EmployeePageIncome')}>Income +</button>
        <button onClick={() => navigate('/EmployeePageExpenses')}>Expenses -</button>
    </div>
    <div className='orders-main-container'>
        <div className='orders-container'>
            <div className='orders-container-ordernumber-amount'>
                <p className='orders-container-ordernumber'>Order 1<b className='orders-container-amount'>360</b></p>
            </div>
            <div className='orders-container-details-button-container'>
                <button className='orders-container-details-button' onClick={()=>navigate('/OrderDetails')}>Details</button>
            </div>

        </div>
        <div className='orders-container'>
            <div className='orders-container-ordernumber-amount'>
                <p className='orders-container-ordernumber'>Order 1<b className='orders-container-amount'>100</b></p>
            </div>
            <div className='orders-container-details-button-container'>
                <button className='orders-container-details-button'>Details</button>
            </div>

        </div>
    </div>
</div>}

{adminLogin &&
<div>
    <AdminPage/>
</div>
}
    
    </div>
  )
}
export default EmployeePageOrders;