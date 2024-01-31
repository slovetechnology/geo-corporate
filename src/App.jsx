import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import Dashboard from './Pages/Account/Dashboard'
import Transaction from './Pages/Transactions/Transaction'
import Flight from './Pages/flight/Flight'
import VerifyPayment from './Pages/flight/VerifyPayment'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/geo/board" element={<Dashboard />} />
          <Route path="/geo/selectflight" element={<Flight />} />
          <Route path="/geo/verify-payment/:bookingCode" element={<VerifyPayment />} />
        <Route path="/geo/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
