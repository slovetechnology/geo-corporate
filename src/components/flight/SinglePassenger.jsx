import React, { useState } from 'react'
import { SlArrowDown, SlArrowUp, SlEnvolope } from 'react-icons/sl'
import { useSelector } from 'react-redux'

const SinglePassenger = ({ user }) => {
    const { flightDetails } = useSelector(state => state.data)
    const [view, setView] = useState(false)
    const Icon = !view ? SlArrowDown : SlArrowUp
    return (
        <div className='py-2 border-b'>
            <div className='grid grid-cols-5'>
                <div className='col-span-4'>
                    <div className="flex items-center capitalize gap-2 font-semibold"> <div className='rounded-lg bg-teal-400 w-2 h-2'></div> {user.title} {user.firstName} {user.lastName}</div>
                    <div className='flex items-center gap-2'> <SlEnvolope /> {user.email}</div>
                </div>
                <div className='col-span-1 w-fit ml-auto cursor-pointer'> <Icon onClick={() => setView(!view)} /> </div>
            </div>
            {view ? <div className='pl-2'>
                <div className='grid grid-cols-2'>
                    <div>Contact Number</div>
                    <div className='text-right'>{user.phoneNumber}</div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>Gender</div>
                    <div className='text-right'>{user.gender}</div>
                </div>
                <div className='grid grid-cols-2'>
                    <div>Date of Birth</div>
                    <div className='text-right'>{user.dob}</div>
                </div>
                {flightDetails.documentRequired && <div>
                    <div className='grid grid-cols-2'>
                        <div>Nationality</div>
                        <div className='text-right'>{user.documents.nationalityCountry}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div> Document Type</div>
                        <div className='text-right'>{user.documents.documentType}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>Passport Issuing date</div>
                        <div className='text-right'>{user.documents.issuingDate}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>Passport Expiry date</div>
                        <div className='text-right'>{user.documents.expiryDate}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>Issuing Authority</div>
                        <div className='text-right'>{user.documents.issuingCountry}</div>
                    </div>
                </div>}
            </div> : null}
        </div>
    )
}

export default SinglePassenger
