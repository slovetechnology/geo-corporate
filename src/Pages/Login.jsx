import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClientPostApi, MainApi } from "../services/Geoapi";
import { AlertError, GoodAlert, MainToken, USERID, USERNAME } from "../components/functions";
import FormLayout from "../components/FormLayout";
import Loading from "../components/Loading";

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({ tag: '', msg: '' })
  const [loader, setLoader] = useState(false)
  const [pass, setPass] = useState(false)
  const Icon = pass ? FaEyeSlash : FaEye
  const [forms, setForms] = useState({
    email: '',
    password: ''
  })

  const handleForms = e => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }

  const LoginToGeoTravel = async () => {
    setTimeout(() => {
      setError({ tag: '', msg: '' })
    }, 2000);
    if (!forms.email) return setError({ tag: 'email', msg: 'Email Address is required' })
    if (!forms.password) return setError({ tag: 'password', msg: 'Password is required' })
    const data = {
      username: forms.email,
      password: forms.password
    }
    setLoader(true)
    try {
      // main api from geo backend
      const mainRes = await ClientPostApi(MainApi.auth.login, data)
      if (mainRes.status === 200) {
        Cookies.set(MainToken, mainRes.data.tokens.access)
        Cookies.set(USERID, mainRes.data.tokens.organization_id)
        Cookies.set(USERNAME, mainRes.data.tokens.username)
        GoodAlert(`Account Logged in Successfully`)
        navigate(`/geo/board`)
      } else {
        return AlertError(mainRes.message)
      }
    } catch (error) {
      return AlertError(`No active account found with the given credentials`)
    } finally {
      setLoader(false)
    }
  }

  return (
    <FormLayout>
      {loader && <Loading />}
      <h2 className="font-bold text-3xl mb-1">Log into your Corporate account</h2>
      <p className="text-sm font-bold">
        Enter your login credentials to access your account
      </p>

      <div className="">
        <Input
          type="text"
          name="email"
          autoComplete="off"
          value={forms.email}
          onChange={handleForms}
          className={`border border-slate-300 rounded w-full placeholder:text-sm ${error.tag === 'email' ? 'border-red-600' : 'border-slate-300'}`}
          placeholder="Email Address / Username"
        />
        <div className='text-sm text-red-600 mb-3'>{error.tag === 'email' && error.msg}</div>
        <div className="relative">
          <Input
            type={pass ? 'text' : 'password'}
            name="password"
            autoComplete="off"
            value={forms.password}
            onChange={handleForms}
            className={`border border-slate-300 rounded w-full placeholder:text-sm ${error.tag === 'password' ? 'border-red-600' : 'border-slate-300'}`}
            placeholder="Password"
          />
          <div className="absolute top-7 right-4 cursor-pointer text-xl text-zinc-500" onClick={() => setPass(!pass)}> <Icon /> </div>
        </div>
        <div className='text-sm text-red-600 mb-3'>{error.tag === 'password' && error.msg}</div>
        <div className="flex  gap-6 text-sm mt-5">
          <label htmlFor="checkbox" className="items-center flex">
            <input type="checkbox" className="mr-2" />
            Keep me signed in
          </label>
          <Link onClick={() => window.scrollTo(0, 0)} to='/reset_password' className="text-mainblue">Forgot password</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 w-11/12 mt-8 md:w-2/5">
          <button type="button" onClick={LoginToGeoTravel} className="bg-mainblue text-white text-base text-left rounded-lg px-7 py-2">Account Login</button>
        </div>
      </div>
    </FormLayout>
  );
};


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
