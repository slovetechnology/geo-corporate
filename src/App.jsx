import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import Dashboard from './Pages/Account/Dashboard'
import Transaction from './Pages/Transactions/Transaction'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/geo/board" element={<Dashboard />} />
        <Route path="/geo/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
