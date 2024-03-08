import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import checks from "/src/assets/images/good.svg";
import {useSelector} from 'react-redux'
import Loading from '/src/components/Loading';
import { AlertError, GoodAlert } from '/src/components/functions';
import { AuthPutApi, MainApi } from '/src/services/Geoapi';

const UpdatePasspwordModal = (props) => {
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(state => state.data)
    const [screen, setScreen] = useState(1)
    const detectCapitalLetter = /[A-Z]/g;
    const detectSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<div>\/?]/g;
    const detectNumber = /\d/g;
    const detectLength = 8
    const [caps, setCaps] = useState(false)
    const [specs, setSpecs] = useState(false)
    const [nums, setNums] = useState(false)
    const [lens, setLens] = useState(false)
    const [stats, setStats] = useState({
        caps: false,
        specs: false,
        nums: false,
        lens: false
    })
    const togref = useRef()
    const [forms, setForms] = useState({
        password: '',
        newPassword: '',
        confirm_password: ''
    })
    const handleForms = e => {
        setForms({
            ...forms, 
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        togref && window.addEventListener('click', (e) => {
            togref.current !== null && !togref.current.contains(e.target) && props.closeView()
        }, true)
    }, [props])

    const HandleValidation = (val) => {
        if (val.length >= detectLength) {
            setLens(true)
        } else {
            if (val.match(detectNumber)) {
                setNums(true)
            } else {
                if (val.match(detectSpecialChars)) {
                    setSpecs(true)
                } else {
                    if (val.match(detectCapitalLetter)) {
                        setCaps(true)
                        // move forward
                    } else {
                        setCaps(false)
                    }
                    setSpecs(false)
                }
                setNums(false)
            }
            setLens(false)
        }
    }

    const updatePasswordData = async e => {
        e.preventDefault()
        if(!forms.password) return AlertError(`Provide your current password`)
        if(!forms.newPassword) return AlertError(`Enter a new password`)
        if(forms.newPassword === forms.password) return AlertError(`You cannot provide the same current password for new password`)
        if(!forms.confirm_password) return AlertError(`Confirm your new password`)
        if(forms.confirm_password !== forms.newPassword) return AlertError(`Password(s) do not match`)
        const formData = {
            old_password: forms.password,
            password: forms.newPassword,
            password2: forms.confirm_password
        }
        setLoading(true)
        try {
            const res = await AuthPutApi(`${MainApi.auth.password_update}/${user.id}/`, formData)
                setScreen(2)
                GoodAlert(res.detail)
                setForms({
                    password: '', confirm_password: '', newPassword: ''
                })
                props.closeView()
        } catch (error) {
            AlertError(`${error}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            {loading && <Loading />}
            {screen === 2 && <Overall>
                <div className='bg-[#171B4A] pt-14 pb-8 pl-10'>
                    <div className='flex items-center gap-2'>
                        <img src={checks} alt={checks} className='' />
                        <div className='text-sm text-white'>Password Upated Successfully</div>
                    </div>
                </div>
            </Overall>}
            {screen === 1 && <Overall2>
                <div ref={togref} className="w-full max-w-xl bg-white">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="text-lg font-semibold capitalize">update password</div>
                        <div onClick={props.closeView} className="p-3 text-right rounded-lg cursor-pointer bg-slate-100"> <FaTimes /> </div>
                    </div>
                    <form onSubmit={updatePasswordData}>
                        <div className="px-4 mb-3"> <Input type="password" name="password" value={forms.password} onChange={handleForms} placeholder='Current Password' /> </div>
                        <div className="px-4 mb-3"> <Input type="password" name="newPassword" value={forms.newPassword} onChange={handleForms} placeholder='New Password' onKeyUp={e => HandleValidation(e.target.value)} /> </div>
                        {/* <div className="px-4 ">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`${caps ? 'bg-orange-600' : 'bg-slate-400'} text-white rounded-lg p-1 text-sm`}><FaCheck /></div>
                                <div className="text-sm text-slate-600">Must Contain One Capital Letter</div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`${specs ? 'bg-orange-600' : 'bg-slate-400'} text-white rounded-lg p-1 text-sm`}><FaCheck /></div>
                                <div className="text-sm text-slate-600">Must Contain Special Character (@$%*&^!)</div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`${nums ? 'bg-orange-600' : 'bg-slate-400'} text-white rounded-lg p-1 text-sm`}><FaCheck /></div>
                                <div className="text-sm text-slate-600">Must Contain A Number</div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`${lens ? 'bg-orange-600' : 'bg-slate-400'} text-white rounded-lg p-1 text-sm`}><FaCheck /></div>
                                <div className="text-sm text-slate-600">Must Be At Least 8 Characters In Length</div>
                            </div>
                        </div> */}
                        <div className="px-4 mb-3"> <Input type="password" name="confirm_password" value={forms.confirm_password} onChange={handleForms} placeholder='Confirm Password' /> </div>
                        <div className="border-t flex.items-center justify-start p-4">
                            <button className="text-white bg-[#2E61E6] rounded-lg py-3 px-7 capitalize">save changes</button>
                            <button onClick={props.closeView} type="button" className="text-[#2E61E6] ml-5 border border-[#2E61E6] rounded-lg py-3 px-7 capitalize">cancel</button>
                        </div>
                    </form>
                </div>
            </Overall2>}
        </div>
    )
}

export default UpdatePasspwordModal

const Overall = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
`;

const Overall2 = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  top: 0;
  left: 0;
`;
const Input = styled.input`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 15px;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;