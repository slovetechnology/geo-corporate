
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
const ApplyPassengersAutoFill = ({ onclose, ApplyAutofill, data }) => {
    const togref = useRef()
    const [screen, setScreen] = useState(1)
    const { profile } = useSelector(state => state.data)

    useEffect(() => {
        togref && window.addEventListener('click', e => { togref.current !== null && !togref.current.contains(e.target) && onclose() }, true)
    }, [])

    return (
        <div className='fixed top-0 h-screen left-0 w-full bg-black/40 flex items-center justify-center z-10'>
            <div ref={togref} className="bg-white px-4 py-10 rounded-lg w-11/12 max-w-xl relative modalbefore">
                {screen === 1 && <>
                    <div className="font-light flex items-center justify-center gap-2"> <span className="font-bold">Hi {profile.username}, </span> We found a matching record to this passenger!...</div>
                    <div className="mt-10">
                        <div className="flex items-center justify-between gap-10 w-full">
                            <button onClick={() => ApplyAutofill('no')} className="bg-slate-200 py-3 px-10 rounded-lg capitalize text-sm">Ignore</button>
                            <button onClick={() => setScreen(2)} className="bg-mainblue text-white py-3 px-10 rounded-lg capitalize text-sm">View</button>
                        </div>
                    </div>
                </>}
                {screen === 2 && <>
                    <div className="">
                        <div className="font-bold text-xl mb-5">Information found</div>
                        <div className="grid grid-cols-3  p-2 border-b">
                            <div className="col-span-1">Name</div>
                            <div className="text-right col-span-2 font-bold">{data.title} {data.first_name} {data.middle_name} {data.last_name}</div>
                        </div>
                        <div className="grid grid-cols-2  p-2 border-b">
                            <div className="">Gender</div>
                            <div className="text-right font-bold">{data.gender}</div>
                        </div>
                        <div className="grid grid-cols-2  p-2 border-b">
                            <div className="">Date of birth</div>
                            <div className="text-right font-bold">{data.date_of_birth}</div>
                        </div>
                        <div className="grid grid-cols-2  p-2 border-b">
                            <div className="">Email Address</div>
                            <div className="text-right font-bold">{data.email_address}</div>
                        </div>
                        <div className="grid grid-cols-2  p-2 border-b">
                            <div className="">Phone Number</div>
                            <div className="text-right font-bold">{data.phone}</div>
                        </div>
                        {data.issuing_country && <>

                            <div className="grid grid-cols-2  p-2 border-b">
                                <div className="">Passport Number</div>
                                <div className="text-right font-bold">{data.passport_number}</div>
                            </div>
                            <div className="grid grid-cols-2  p-2 border-b">
                                <div className="">Issuing Authority</div>
                                <div className="text-right font-bold">{data.issuing_authority}</div>
                            </div>
                            <div className="grid grid-cols-2  p-2 border-b">
                                <div className="">Nationality</div>
                                <div className="text-right font-bold">{data.country_of_origin}</div>
                            </div>
                            <div className="grid grid-cols-2  p-2 border-b">
                                <div className="">Expiry Date</div>
                                <div className="text-right font-bold">{data.expiry_date}</div>
                            </div>
                            <div className="grid grid-cols-2  p-2 border-b">
                                <div className="">Issue Date</div>
                                <div className="text-right font-bold">{data.issue_date}</div>
                            </div>
                        </>}
                    <div className="mt-10">
                        <div className="flex items-center justify-between gap-10 w-full">
                            <button onClick={() => ApplyAutofill('no')} className="bg-slate-200 py-3 px-10 rounded-lg capitalize text-sm">Ignore</button>
                            <button onClick={() => ApplyAutofill('yes')} className="bg-mainblue text-white py-3 px-10 rounded-lg capitalize text-sm">Apply</button>
                        </div>
                    </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ApplyPassengersAutoFill