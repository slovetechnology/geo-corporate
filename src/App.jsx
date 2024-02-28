import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import Dashboard from './Pages/Account/Dashboard'
import Transaction from './Pages/Transactions/Transaction'
import Flight from './Pages/flight/Flight'
import VerifyPayment from './Pages/flight/VerifyPayment'
import RouteLayout from '/src/services/RouteLayout'
import Passengers from '/src/Pages/Account/Passengers/Passengers'
import VerifyBillOffset from '/src/Pages/Transactions/VerifyBillOffset'
import ResetEmail from '/src/Pages/ResetEmail'
import EmailSent from '/src/Pages/EmailSent'
import ConfirmEmailAccount from '/src/Pages/ConfirmEmailAccount'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset/:id" element={<ResetEmail />} />
        <Route path="/email_successfully_sent" element={<EmailSent />} />
          <Route path="/account/:uuid/:token" element={<ConfirmEmailAccount />} />
        <Route path="/geo/board" element={<RouteLayout><Dashboard /> </RouteLayout>} />
        <Route path="/geo/verify-request/" element={<RouteLayout><VerifyBillOffset /> </RouteLayout>} />
        <Route path="/geo/passengers" element={<RouteLayout><Passengers /> </RouteLayout>} />
          <Route path="/geo/selectflight" element={<RouteLayout><Flight /></RouteLayout>} />
          <Route path="/geo/verify-payment/:bookingCode" element={<RouteLayout><VerifyPayment /></RouteLayout>} />
        <Route path="/geo/transactions" element={<RouteLayout><Transaction /></RouteLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
