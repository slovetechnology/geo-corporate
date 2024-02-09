import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Dialcodes } from "/src/components/countrycodes";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSelector } from 'react-redux';
import { AlertError, GoodAlert } from '/src/components/functions';
import SelectOptions from '/src/components/SelectOptions';
import TermsModal from '/src/components/flight/TermsModal';
import ApplyPassengersAutoFill from './ApplyPassengersAutoFill';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';


dayjs.extend(customParseFormat);
// eslint-disable-next-line arrow-body-style
const disabledForwardDate = (current) => {
    return current > moment()
};
const disabledBackwardDate = (current) => {
    return current < moment().subtract(1, 'day')
}

const PassengersFlightForm = (props) => {
    const [view, setView] = useState(true)
    const Icon = !view ? SlArrowDown : SlArrowUp
    const { flight, localData, total, setNextPage, setLocalData, flightDetails } = props
    const userType = `${flight.passengerType}${props.indexs + 1}`
    const findData = localData.find((item) => item.dataType === userType)
    const [terms, setTerms] = useState(false)
    const [agree, setAgree] = useState(false)
    const { pdetails } = useSelector(state => state.data)
    const [open, setOpen] = useState({
        status: false,
        ignore: false,
        data: {}
    })

    const [personalData, setPersonalData] = useState({
        passengerType: flight.passengerType,
        firstName: findData ? findData?.firstName : "",
        middleName: findData ? findData?.middleName : "",
        lastName: findData ? findData?.lastName : "",
        dob: findData ? findData?.dob : "",
        gender: findData ? findData?.gender : "Male",
        title: findData ? findData?.title : "Mr",
        email: findData ? findData?.email : "",
        phoneCode: findData ? findData?.phoneCode : Dialcodes[0].dial_code,
        phoneNumber: findData ? findData?.phoneNumber.split(' ')[1] : "",
        dataType: findData ? findData?.dataType : userType
    })
    const [passengerData, setpassengerData] = useState({
        number: findData ? findData?.documents?.number : "",
        issuingDate: findData ? findData?.documents?.issuingDate : "",
        expiryDate: findData ? findData?.documents?.expiryDate : "",
        issuingCountry: findData ? findData?.documents?.issuingCountry : '',
        nationalityCountry: findData ? findData?.documents?.nationalityCountry : Dialcodes[0].name,
        documentType: "passport",
        holder: true,
    });

    const handlePersonalData = e => {
        setPersonalData({ ...personalData, [e.target.name]: e.target.value })
    }

    const handlePassengerData = e => {
        setpassengerData({ ...passengerData, [e.target.name]: e.target.value })
    }

    const saveContactData = () => {
        if (!personalData.firstName) return AlertError('First name field is required!')
        if (personalData.firstName.indexOf(' ') !== -1) return AlertError('Spaces are not allowed while filling your First name')
        if (personalData.middleName && personalData.middleName.indexOf(' ') !== -1) return AlertError('Spaces are not allowed while filling your Middle name')
        if (!personalData.lastName) return AlertError('Last name field is required!')
        if (personalData.lastName.indexOf(' ') !== -1) return AlertError('Spaces are not allowed while filling your Last name')
        if (!personalData.dob) return AlertError('Kindly enter your date of birth')
        if (!personalData.gender) return AlertError('Specify your gender!')
        if (!personalData.title) return AlertError('Specify how we can address you!')
        if (!personalData.email) return AlertError('Provide your Email address!')
        if (!personalData.phoneNumber) return AlertError('Enter your phone number!')
        if (!personalData.phoneCode) return AlertError('Enter a valid country dial code!')

        if (flightDetails.documentRequired) {
            if (!passengerData.number) return AlertError('passport number is required!')
            if (!passengerData.issuingDate) return AlertError('passport issued date is required!')
            if (!passengerData.expiryDate) return AlertError('passport expiry date is required!')
            if (!passengerData.issuingCountry) return AlertError('passport issuing authority is required!')
            if (!passengerData.nationalityCountry) return AlertError('passport holder nationality is required!')
        }
        if (!agree) return AlertError('Please read and tick to agree to the terms and condition')

        let data = {}
        flightDetails.documentRequired ? data = {
            ...personalData,
            phoneNumber: `${personalData.phoneCode} ${personalData.phoneNumber}`,
            firstName: `${personalData.firstName} ${personalData.middleName}`,
            documents: {
                ...passengerData
            }
        } : data = {
            ...personalData,
            phoneNumber: `${personalData.phoneCode} ${personalData.phoneNumber}`,
            firstName: `${personalData.firstName} ${personalData.middleName}`,
        }
        if (!findData) {
            setLocalData([...localData, data])
        } else {
            const indexToReplace = localData.findIndex(item => item.dataType === data.dataType);
            if (indexToReplace !== -1) {
                const newData = localData.map((ele, index) => {
                    if (index === indexToReplace) {
                        return data
                    }
                    return ele
                })
                setLocalData(newData)
            }
        }
        GoodAlert('Details saved')
        setView(!view)

        if (props.indexs + 1 === total) {
            setNextPage(true)
        }
    }

    const openTermsModal = () => {
        setTerms(!terms)
    }

    const SearchPassengerDetails = (val, tag) => {
        if (open.ignore === false) {
            if (val.length > 2 && val.length < 4) {
                let result;
                if (tag === 1) {
                    result = pdetails.find(ele => ele.first_name.toLowerCase().startsWith(val.toLowerCase()))
                }
                if (tag === 2) {
                    result = pdetails.find(ele => ele.middle_name.toLowerCase().startsWith(val.toLowerCase()))
                }
                if (tag === 3) {
                    result = pdetails.find(ele => ele.last_name.toLowerCase().startsWith(val.toLowerCase()))
                }
                if (tag === 4) {
                    result = pdetails.find(ele => ele.email_address.toLowerCase().startsWith(val.toLowerCase()))
                }
                if (tag === 5) {
                    result = pdetails.find(ele => ele.phone_number.toLowerCase().startsWith(`${personalData.phoneNumber} ${val.toLowerCase()}`))
                }
                if (Object.keys(result).length > 0) {
                    setOpen({
                        ...open,
                        status: true,
                        data: result
                    })
                }
            }
        }
    }

    const ApplyAutofill = (tag) => {
        if (tag === 'no') {
            setOpen({
                data: {},
                status: false,
                ignore: true
            })
        } else {
            const data = open.data
            console.log(tag, moment(new Date(data?.date_of_birth)).format('YYYY-MM-DD'))
            setPersonalData({
                ...personalData,
                firstName: data?.first_name || '',
                middleName: data?.middle_name || '',
                lastName: data?.last_name || '',
                dob: moment(new Date(data?.date_of_birth)).format('YYYY-MM-DD') || '',
                gender: data?.gender || '',
                title: data?.title || '',
                email: data?.email_address || '',
                phoneCode: data?.phone?.split(' ')[0] || Dialcodes[0].dial_code,
                phoneNumber: data?.phone?.split(' ')[1] || "",
            })
            setpassengerData({
                ...passengerData,
                number: data?.passport_number || "",
                issuingDate: data?.issue_date || "",
                expiryDate: data?.expiry_date || "",
                issuingCountry: data?.issuing_country || '',
                nationalityCountry: data?.country_of_origin || Dialcodes[0].name,
            });
            setAgree(true)

            setOpen({
                data: {},
                status: false,
                ignore: false
            })
        }
    }

    return (
        <div>
            {terms && <TermsModal closeView={() => setTerms(!terms)} />}
            {open.status && <ApplyPassengersAutoFill
                onclose={() => setOpen({ ...open, status: false })}
                ApplyAutofill={ApplyAutofill}
                data={open.data}
            />}
            <div>
                <div className='flex ites-center justify-between p-3 border-b last:border-none'>
                    <div className='capitalize'>Passenger {flight.passengerType} (No. {props.indexs + 1})</div>
                    <div onClick={() => { setView(!view); setNextPage(false) }} className='cursor-pointer'> <Icon /> </div>
                </div>
                {view ?
                    <FormSection className='mb-10'>
                        <div className="text-slate-500">Title</div>
                        <SelectInput
                            name="title"
                            value={personalData.title}
                            onChange={handlePersonalData}
                        >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Master">Master</option>
                        </SelectInput>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <div className="text-slate-500">First Name</div>
                                <Input autoComplete="off"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={personalData.firstName}
                                    onChange={handlePersonalData}
                                    onKeyUp={e => SearchPassengerDetails(e.target.value, 1)}
                                />
                            </div>
                            <div className="">
                                <div className="text-slate-500">Middle Name</div>
                                <Input autoComplete="off"
                                    placeholder="Middle Name"
                                    name='middleName'
                                    value={personalData.middleName}
                                    onChange={handlePersonalData}
                                    onKeyUp={e => SearchPassengerDetails(e.target.value, 2)}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <div className="text-slate-500">Last Name</div>
                                <Input autoComplete="off"
                                    placeholder="Last Name"
                                    name='lastName'
                                    value={personalData.lastName}
                                    onChange={handlePersonalData}
                                    onKeyUp={e => SearchPassengerDetails(e.target.value, 3)}
                                />
                            </div>
                            <div className="">
                                <div className="text-slate-500">Gender</div>
                                <SelectInput
                                    name="gender"
                                    value={personalData.gender}
                                    onChange={handlePersonalData}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </SelectInput>
                            </div>
                            <input autoComplete="off"
                                type='hidden'
                                name="dataType"
                                value={personalData.dataType}
                                onChange={handlePersonalData}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="">
                                <div className="text-slate-500">Date of Birth</div>
                                <DatePicker
                                    disabledDate={disabledForwardDate}
                                    className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                                    placeholder={`${findData?.dob || `Date-of-Birth ${moment().format('YYYY-MM-DD')}`}`}
                                    name="dob"
                                    defaultValue={findData && findData?.dob && dayjs(findData?.dob, dateFormat)}
                                    format={dateFormat}
                                    onChange={(e) => {
                                        const val = moment(new Date(e)).format('YYYY-MM-DD');
                                        setPersonalData((prevState) => {
                                            return {
                                                ...prevState,
                                                dob: val
                                            };
                                        });
                                    }}
                                // value={personalData.dob}
                                />
                            </div>
                            <div className='mb-3'>
                                <div className="text-slate-500">Email Address</div>
                                <Input autoComplete="off"
                                    placeholder="Email Address"
                                    name="email"
                                    value={personalData.email}
                                    onChange={handlePersonalData}
                                    onKeyUp={e => SearchPassengerDetails(e.target.value, 4)}
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <div className="text-slate-500">Phone Number</div>
                            <div className="grid grid-cols-6">
                                <SelectInput
                                    name="phoneCode"
                                    value={personalData.phoneCode}
                                    onChange={handlePersonalData}
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
                                    name="phoneNumber"
                                    value={personalData.phoneNumber}
                                    onChange={handlePersonalData}
                                    onKeyUp={e => SearchPassengerDetails(e.target.value, 5)}
                                />
                            </div>
                        </div>
                        {flightDetails.documentRequired && <div>
                            <TitleSection className='mb-4'>
                                <SmallWrapper>
                                    <InfoTitle className='mt-5'>Passport Details</InfoTitle>
                                    <FieldInfo>
                                        Please provide accurate details as you will be liable for inaccurate information you share
                                    </FieldInfo>
                                </SmallWrapper>
                            </TitleSection>
                            <div className='grid grid-cols-2 gap-3'>

                                <div className="relative">
                                    <div className="text-slate-500">Country of Origin</div>
                                    <SelectOptions
                                        title={passengerData?.nationalityCountry || "--Select Country of Origin--"}
                                        setup={(val) => {
                                            setpassengerData({
                                                ...passengerData,
                                                nationalityCountry: val.code
                                            })
                                        }}
                                    />
                                </div>
                                {/* <div className="">
                                    <div className="text-slate-500">Country of Origin</div>
                                    <SelectInput
                                        name="nationalityCountry"
                                        value={passengerData.nationalityCountry}
                                        onChange={handlePassengerData}
                                    >
                                        <option value="">--Select--</option>
                                        {Dialcodes.map((item, i) => (
                                            <option key={i} value={item.name}> {item.name}</option>
                                        ))}
                                    </SelectInput>
                                </div> */}
                                <div className="">
                                    <div className="text-slate-500">Passport Number</div>
                                    <Input autoComplete="off"
                                        name="number"
                                        placeholder="Passport Number or ID"
                                        value={passengerData.number}
                                        onChange={handlePassengerData}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className="">
                                    <div className="text-slate-500">Issued Date (Passport)</div>
                                    <DatePicker
                                        disabledDate={disabledForwardDate}
                                        name="issuingDate"
                                        defaultValue={findData && findData?.documents?.issuingDate && dayjs(findData?.documents?.issuingDate, dateFormat)}
                                        format={dateFormat}
                                        className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                                        placeholder={`Issuing Date ${moment().format('D/MMMM/YYYY')}`}
                                        onChange={(e) => {
                                            const val = moment(new Date(e)).format('YYYY-MM-DD');
                                            setpassengerData((prevState) => {
                                                return {
                                                    ...prevState,
                                                    issuingDate: val
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
                                        name="expiryDate"
                                        className='h-[54px] bg-white border rounded-2 my-3 px-7 w-full outline-none'
                                        defaultValue={findData && findData?.documents?.expiryDate && dayjs(findData?.documents?.expiryDate, dateFormat)}
                                        format={dateFormat}
                                        placeholder={`Expiry Date ${moment().format('D/MMMM/YYYY')}`}
                                        onChange={(e) => {
                                            const val = moment(new Date(e)).format('YYYY-MM-DD');
                                            setpassengerData((prevState) => {
                                                return {
                                                    ...prevState,
                                                    expiryDate: val
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
                                    title={passengerData?.issuingCountry || "--Select Issuing Authority--"}
                                    setup={(val) => {
                                        setpassengerData({
                                            ...passengerData,
                                            issuingCountry: val.code
                                        })
                                    }}
                                />
                            </div>
                        </div>}
                        <div className="mt-5">
                            <label className="flex gap-3">
                                <input
                                    checked={agree}
                                    onChange={e => setAgree(e.target.checked)}
                                    type="checkbox" style={{ marginRight: "5px" }} />{" "}
                                <div className='text-sm'>
                                    By checking this box, I confirm that I have read the <span onClick={openTermsModal} className="text-indigo-600 cursor-pointer">Terms and
                                        Conditions</span> . I also confirm that the names on the booking match
                                    those on the passports of those travelling.
                                </div>
                            </label>
                        </div>
                        <div onClick={saveContactData} className='w-fit ml-auto mt-3'>
                            <button className='bg-mainblue rounded-md capitalize text-sm font-semiold text-white py-2.5 px-7'>save and continue</button>
                        </div>
                    </FormSection>
                    : null}
            </div>
        </div>
    )
}

export default PassengersFlightForm

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

const FormSection = styled.div`
            margin-top: 30px;
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
const TitleSection = styled.div`
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 20px;
            `;
const SmallWrapper = styled.div``;
const InfoTitle = styled.h4`
            font-size: 18px;
            margin-bottom: 5px;
            `;
const FieldInfo = styled.div`
            font-size: 14px;
            `;
