import Loading from '/src/components/Loading';
import { AlertError } from '/src/components/functions';
import Popup from '/src/components/Popup'
import React, { useState } from 'react'
import styled from 'styled-components';
import {useSelector} from 'react-redux'
import moment from 'moment';
import { dateFormat } from '/src/components/flight/FlightcardMainOptions';
import { DatePicker } from 'antd';
import { Dialcodes } from '/src/components/countrycodes';
import SelectOptions from '/src/components/SelectOptions';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { AuthPostApi, MainApi } from '/src/services/Geoapi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { GoodAlert } from '/src/components/functions';
import { AuthPutApi } from '/src/services/Geoapi';
import { AuthDeleteApi } from '/src/services/Geoapi';
dayjs.extend(customParseFormat);



const disabledForwardDate = (current) => {
    return current > moment()
};
const disabledBackwardDate = (current) => {
    return current < moment().subtract(1, 'day')
}

const PassengersModal = ({ onclose, refetch, data }) => {
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(state => state.data)
    const [screen, setScreen] = useState(1)
    const [forms, setForms] = useState({
        title: data?.title || 'Mr',
        first_name: data?.first_name || '',
        middle_name: data?.middle_name || '',
        last_name: data?.last_name || '',
        gender: data?.gender || 'male',
        date_of_birth: data?.date_of_birth || '',
        email_address: data?.email_address || '',
        phoneCode: data?.phone?.split(' ')[0] ||  Dialcodes[0].dial_code,
        phone: data?.phone?.split(' ')[1] || '',
        country_of_origin: data?.country_of_origin || '',
        passport_number: data?.passport_number || '',
        issue_date: data?.issue_date || '',
        expiry_date: data?.expiry_date || '',
        issuing_authority: data?.issuing_authority || '',
    })
    const onChange = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.title) return AlertError('Title is required')
        if (!forms.first_name) return AlertError('First name is required')
        if (forms.first_name.indexOf(' ') !== -1) return AlertError('Spaces are not allowed while filling your First name')
        if (forms.middle_name && forms.middle_name.indexOf(' ') !== -1) return AlertError('Spaces are not allowed while filling your Middle name')
        if (!forms.last_name) return AlertError('Last name is required')
        if (!forms.gender) return AlertError('Gender is required')
        if (!forms.date_of_birth) return AlertError('Date of birth is required')
        if (!forms.email_address) return AlertError('Email Address is required')
        if (!forms.phoneCode) return AlertError('Country dail code is required')
        if (!forms.phone) return AlertError('Phone Number is required')
        if (!forms.country_of_origin) return AlertError('Nationality is required')
        if (!forms.passport_number) return AlertError('Passport number is required')
        if (!forms.issue_date) return AlertError('Issued date is required')
        if (!forms.expiry_date) return AlertError('Expiry date is required')
        if (!forms.issuing_authority) return AlertError('Issuing authority is required')
        setLoading(true)
        try {
            const formbody = {
                ...forms,
                phone: `${forms.phoneCode} ${forms.phone}`,
                organization: user.id
            }
            const response = data?.id ? await AuthPutApi(`${MainApi.passengers.update}/${data?.id}`, formbody) : await AuthPostApi(MainApi.passengers.create, formbody)
            if(response.status === 201 || response.status === 200) {
                GoodAlert(`${response.message}`)
                onclose()
                refetch()
            }
        } catch (error) {
            return AlertError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const SubmitRequestToDelete = async () => {
        setLoading(true)
        try {
            const response =  await AuthDeleteApi(`${MainApi.passengers.delete}/${data?.id}`)
            console.log(response)
            // if(response.status === 201 || response.status === 200) {
            //     GoodAlert(`${response.message}`)
            //     onclose()
            //     refetch()
            // }
        } catch (error) {
            return AlertError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Popup onclose={onclose}>
            {loading && <Loading />}
            {screen === 1 && <>
                <form onSubmit={handleSubmission}>
                    <div className="mb-4 p-4 flex items-center gap-5">
                        <div className="font-bold text-xl">Personal Details (Required)</div>
                        {/* <button type="button" onClick={() => setScreen(2)} className="bg-red-400 py-1 px-4 rounded-md text-white">delete</button> */}
                    </div>
                    <div className="mb-3">
                        <SelectInput
                            name="title"
                            value={forms.title}
                            onChange={onChange}
                        >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Master">Master</option>
                        </SelectInput>
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">First Name</div>
                        <Input autoComplete="off"
                            placeholder="First Name"
                            name="first_name"
                            value={forms.first_name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">Middle Name</div>
                        <Input autoComplete="off"
                            placeholder="Middle Name"
                            name="middle_name"
                            value={forms.middle_name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">Last Name</div>
                        <Input autoComplete="off"
                            placeholder="Last Name"
                            name="last_name"
                            value={forms.last_name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">Gender</div>
                        <SelectInput
                            name="gender"
                            value={forms.gender}
                            onChange={onChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </SelectInput>
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">Date of Birth</div>
                        <DatePicker
                            disabledDate={disabledForwardDate}
                            className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                            placeholder={`${forms?.date_of_birth || `Date-of-Birth ${moment().format('YYYY-MM-DD')}`}`}
                            name="date_of_birth"
                            defaultValue={forms && forms?.date_of_birth && dayjs(forms?.date_of_birth, dateFormat)}
                            format={dateFormat}
                            onChange={(e) => {
                                const val = moment(new Date(e)).format('YYYY-MM-DD');
                                setForms((prevState) => {
                                    return {
                                        ...prevState,
                                        date_of_birth: val
                                    };
                                });
                            }}
                        // value={personalData.dob}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="text-slate-500">Email Address</div>
                        <Input autoComplete="off"
                            placeholder="email"
                            name="email_address"
                            value={forms.email_address}
                            onChange={onChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <div className="text-slate-500">Phone Number</div>
                        <div className="grid grid-cols-6">
                            <SelectInput
                                name="phoneCode"
                                value={forms.phoneCode}
                                onChange={onChange}
                                className='!p-0'
                            >
                                {Dialcodes.map((item, i) => (
                                    <option key={i} value={item.dial_code}>{item.dial_code}</option>
                                ))}
                            </SelectInput>
                            <Input autoComplete="off"
                                type='number'
                                placeholder="Phone Number"
                                className='col-span-5'
                                // pattern="/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/"
                                name="phone"
                                value={forms.phone}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 p-4 cursor-pointer border-b">
                        <div className="grid grid-cols-7">
                            <div className="col-span-6">
                                <div className="font-bold text-xl">Passport Details (Optional)</div>
                                <div className="font-light text-sm">Please provide accurate details as you will be liable for inaccurate information you share</div>
                            </div>
                        </div>
                    </div>
                    
                        <div className="mb-3">
                            <div className="relative">
                                <div className="text-slate-500">Country of Origin</div>
                                <SelectOptions
                                defaultValue={forms?.country_of_origin}
                                    title={forms?.country_of_origin || "--Select Country of Origin--"}
                                    setup={(val) => {
                                        setForms({
                                            ...forms,
                                            country_of_origin: val.code
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="text-slate-500">Passport Number</div>
                            <Input autoComplete="off"
                                name="passport_number"
                                placeholder="Passport Number or ID"
                                value={forms.passport_number}
                                onChange={onChange}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <div className="text-slate-500">Issued Date (Passport)</div>
                                <DatePicker
                                    disabledDate={disabledForwardDate}
                                    name="issue_date"
                                    defaultValue={forms && forms?.issue_date && dayjs(forms?.issue_date, dateFormat)}
                                    format={dateFormat}
                                    className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                                    placeholder={`Issuing Date ${moment().format('D/MMMM/YYYY')}`}
                                    onChange={(e) => {
                                        const val = moment(new Date(e)).format('YYYY-MM-DD');
                                        setForms((prevState) => {
                                            return {
                                                ...prevState,
                                                issue_date: val
                                            };
                                        });
                                    }
                                    }
                                />
                            </div>
                            <div className="">
                                <div className="text-slate-500">Expiry Date (Passport)</div>
                                <DatePicker
                                    disabledDate={disabledBackwardDate}
                                    name="expiry_date"
                                    className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                                    defaultValue={forms && forms?.expiry_date && dayjs(forms?.expiry_date, dateFormat)}
                                    format={dateFormat}
                                    placeholder={`Expiry Date ${moment().format('D/MMMM/YYYY')}`}
                                    onChange={(e) => {
                                        const val = moment(new Date(e)).format('YYYY-MM-DD');
                                        setForms((prevState) => {
                                            return {
                                                ...prevState,
                                                expiry_date: val
                                            };
                                        });
                                    }
                                    }
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="text-slate-500">Issuing Authority</div>
                            <SelectOptions
                            defaultValue={forms?.issuing_authority}
                                title={forms?.issuing_authority || "--Select Issuing Authority--"}
                                setup={(val) => {
                                    setForms({
                                        ...forms,
                                        issuing_authority: val.code
                                    })
                                }}
                            />
                        </div>
                    <div className="w-fit ml-auto mt-10">
                        <button className="w-full bg-mainblue py-3 px-5 rounded-lg text-white capitalize text-sm">save details</button>
                    </div>
                </form>
            </>}
            {screen === 2 && <>
            <div className="p-3">
                <div className="text-center mt-5">Are you sure you want to <span className="text-red-600 uppercase">delete</span> this passenger record from your logs</div>
                <div className="flex items-center justify-between gap-10 mt-10">
                        <button onClick={() => setScreen(1)} className="w-full bg-slate-300 py-4 px-5 rounded-lg capitalize text-sm">cancel</button>
                        <button onClick={SubmitRequestToDelete} className="w-full bg-red-600 py-4 px-5 rounded-lg text-white capitalize text-sm">delete details</button>
                </div>
            </div>
            </>}
        </Popup>
    )
}

export default PassengersModal


const SelectInput = styled.select`
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
