import './App.css';
import React from 'react';
import Home from './home/Home';
import OtpVerification from './home/OtpVerification';
import Manage from './home/Manage';
import EmployeePageOrders from './home/EmployeePageOrders'
import EmployeePageExpenses from './home/EmployeePageExpenses'
import OrderDetails from './home/OrderDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PendingOrderTemplate from './home/PendingOrderTemplate';
import OrderComplete from './home/OrderComplete';
import OrdersPage from './home/OrdersPage';
import { CartProvider } from 'react-use-cart';

function App() {
  return (
    <div className="App">
      <CartProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Manage' element={<Manage />} />
          <Route path='/OtpVerification' element={<OtpVerification />} />
          <Route path='/EmployeePageOrders' element={<EmployeePageOrders />} />
          <Route path='/EmployeePageExpenses' element={<EmployeePageExpenses />} />
          <Route path='/OrderDetails' element={<OrderDetails />} />
          <Route path='/PendingOrderTemplate' element={<PendingOrderTemplate />} />
          <Route path='/OrderComplete' element={<OrderComplete />} />
          <Route path='/OrdersPage' element={<OrdersPage />} />

        </Routes>
      </BrowserRouter>
      </CartProvider>

    </div>
  );
}

export default App;
