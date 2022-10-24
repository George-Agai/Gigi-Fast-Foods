import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom';
import Home from './home/Home';
import CompleteOrder from './home/CompleteOrder';
import OtpVerification from './home/OtpVerification';
import LogIn from './home/LogIn';
import OrderComplete from './home/OrderComplete';
import Manage from './home/Manage';
import EmployeePageOrders from './home/EmployeePageOrders'
import EmployeePageIncome from './home/EmployeePageIncome'
import EmployeePageExpenses from './home/EmployeePageExpenses'
import OrderDetails from './home/OrderDetails'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import Cart from './home/Cart';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Routes>
    
    <Route path='/' element={<Home />}/>
    <Route path='/Home' element={<Home />}/> 
    <Route path='/Manage' element={<Manage />}/>
    <Route path='/CompleteOrder' element={<CompleteOrder />}/>
    <Route path='/LogIn' element={<LogIn />}/>
    <Route path='/OtpVerification' element={<OtpVerification />}/>
    <Route path='/EmployeePageOrders' element={<EmployeePageOrders />}/>
    <Route path='/OrderComplete' element={<OrderComplete />}/>
    <Route path='/EmployeePageIncome' element={<EmployeePageIncome />}/>
    <Route path='/EmployeePageExpenses' element={<EmployeePageExpenses />}/>
    <Route path='/OrderDetails' element={<OrderDetails />}/>
    
    </Routes>
    
    </BrowserRouter>

    </div>
  );
}

export default App;
