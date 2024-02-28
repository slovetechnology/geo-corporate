
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClientPatchApi, MainApi } from "/src/services/Geoapi";
import { AlertError, GoodAlert } from "/src/components/functions";
import Loading from "/src/components/Loading";
import FormLayout from "/src/components/FormLayout";

export default function ConfirmEmailAccount(){
    const { uuid, token } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState({ tag: '', msg: '' })
    const [loader, setLoader] = useState(false)
    const [pass, setPass] = useState(false)
    const [pass2, setPass2] = useState(false)
    const Icon = !pass ? FaEye : FaEyeSlash
    const Icon2 = !pass2 ? FaEye : FaEyeSlash
    const [forms, setForms] = useState({
        password: '',
        confirm_password: '',
    })

    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const LoginUser = async e => {
        e.preventDefault()
        setTimeout(() => {
            setError({ tag: '', msg: '' })
        }, 2000);
        if (!forms.password) return setError({ tag: 'password', msg: 'Password is required' })
        if (!forms.confirm_password) return setError({ tag: 'confirm_password', msg: 'Confirming Password is required' })
        if (forms.password !== forms.confirm_password) return setError({ tag: 'confirm_password', msg: 'Passwords do not match' })
        const data = {
            password: forms.password,
            token: token,
            uidb64: uuid
        }
        setLoader(true)
        try {
            const res = await ClientPatchApi(MainApi.forgot_password.reset_password, data)
            if (res.success) {
                GoodAlert(res.message)
                setTimeout(() => {
                    window.location.assign(`/`)
                }, 2000)
            }
        } catch (error) {
            return AlertError(`${error}`)
        } finally {
            setLoader(false)
        }
    }
    return (
        <FormLayout>
            {loader && <Loading />}
            <h2 className="font-bold text-3xl mb-1">Complete Account Signup</h2>
            <p className="text-sm font-bold">
                Enter your credentials to access your account
            </p>

            <form onSubmit={LoginUser} className="mt-6">
                <div className="relative">
                    <div className="">Create your Account Password</div>
                    <Input
                        type={!pass ? 'password' : 'text'}
                        name="password"
                        autoComplete="off"
                        value={forms.password}
                        onChange={handleForms}
                        className={`border border-slate-300 rounded w-full placeholder:text-sm ${error.tag === 'password' ? 'border-red-600' : 'border-slate-300'}`}
                        placeholder="Password"
                    />
                    <div onClick={() => setPass(!pass)} className="absolute top-[3rem] right-6 cursor-pointer text-slate-600 text-2xl"> <Icon /> </div>
                </div>
                <div className='text-sm text-red-600 mb-3'>{error.tag === 'password' && error.msg}</div>
                <div className="relative">
                    <div className="">Confirm Password</div>
                    <Input
                        type={!pass2 ? 'password' : 'text'}
                        name="confirm_password"
                        autoComplete="off"
                        value={forms.confirm_password}
                        onChange={handleForms}
                        className={`border border-slate-300 rounded w-full placeholder:text-sm ${error.tag === 'confirm_password' ? 'border-red-600' : 'border-slate-300'}`}
                        placeholder="Confirm Password"
                    />
                    <div onClick={() => setPass2(!pass2)} className="absolute top-[3rem] right-6 cursor-pointer text-slate-600 text-2xl"> <Icon2 /> </div>
                </div>
                <div className='text-sm text-red-600 mb-3'>{error.tag === 'confirm_password' && error.msg}</div>
                <div className="flex  gap-6 text-sm mt-5">
                    <label htmlFor="checkbox" className="items-center flex">
                        <input type="checkbox" className="mr-2" />
                        Keep me signed in
                    </label>
                </div>

                <button className="bg-[#2E61E6] text-white text-base rounded-lg px-7 py-4 mt-8">Complete Signup</button>
            </form>
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

const SelectInput = styled.select`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 10px;

  :active,
  :focus {
      outline: none;
  border: 1px solid #eaeaea;
}
  `;
  