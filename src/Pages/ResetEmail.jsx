
import FormLayout from "/src/components/FormLayout";
import { AlertError, GoodAlert } from "/src/components/functions";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ClientPostApi, MainApi } from "/src/services/Geoapi";
import styled from "styled-components";
export default function ResetEmail(){

  const navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const [email, setEmail] = useState('')
  const [search, setSearch] = useSearchParams()
  const params = search.get('request')

  useEffect(() => {
    if(!params) {
      return setSearch('')
    }
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    if (!email) return AlertError('Email Address is requried!...')
    setIsWaiting(true);
    const data = {
      email: email
    }
    try {
        const res = await ClientPostApi(MainApi.forgot_password.send_email, data)
        console.log(res)
        // if (res.data.success) {
          GoodAlert(res.success)
          setTimeout(() => {
            navigate('/email_successfully_sent');
          }, 2000);
        // } else {
        //   return AlertError(res.data.message)
        // }
      
    } catch (error) {
      return AlertError('Provided email does not exist')
    }finally {
      setIsWaiting(false);
    }
  }
  
  return (
    <FormLayout>
      <h2 className="font-bold text-3xl mb-1">Find My Account</h2>
      <p className="text-sm font-bold">
      Enter your registered email. We will send a password reset link to your email
      </p>

      <form onSubmit={handleClick} className="mt-8">
        <Input
          type="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`border border-slate-300 rounded w-full placeholder:text-sm`}
          placeholder="Email Address"
        />
        <div className="flex items-center gap-4 mt-8">
          <button type="submit" className="bg-[#2E61E6] text-white text-sm rounded-lg px-5 py-2 block"
            disabled={isWaiting}>{isWaiting ? 'Please wait...' : 'Continue'}</button>
          <Link onClick={() => window.scrollTo(0, 0)} to='/login' className="text-[#2E61E6] text-sm">Log into my account</Link>
        </div>
      </form>
    </FormLayout>
  )
}


const Input = styled.input`
  height: 54px;
  background: #ffffff;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 15px;
  border: 1px solid #eaeaea;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;
