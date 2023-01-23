import './App.css';
import React from 'react';
import Home from './home/Home';
import OtpVerification from './home/OtpVerification';
import LogIn from './home/LogIn';
import Manage from './home/Manage';
import EmployeePageOrders from './home/EmployeePageOrders'
import EmployeePageExpenses from './home/EmployeePageExpenses'
import OrderDetails from './home/OrderDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PendingOrderTemplate from './home/PendingOrderTemplate';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Manage' element={<Manage />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/OtpVerification' element={<OtpVerification />} />
          <Route path='/EmployeePageOrders' element={<EmployeePageOrders />} />
          <Route path='/EmployeePageExpenses' element={<EmployeePageExpenses />} />
          <Route path='/OrderDetails' element={<OrderDetails />} />
          <Route path='/PendingOrderTemplate' element={<PendingOrderTemplate />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
