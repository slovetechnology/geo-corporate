import React, { useState } from 'react'
import styled from 'styled-components';

const FilterRefundables = ({handleRefunds}) => {
    const [active, setActive] = useState('all')

    const handleActive = val => {
        setActive(val)
        handleRefunds(val)
    }
    return (
        <>
            <div className='grid grid-cols-2 mt-5 mb-6'>
                <div onClick={() => handleActive('all')} className="flex items-center gap-3 cursor-pointer">
                    <div  className={`w-4 h-4 ${active === 'all' ? 'bg-mainblue' : 'bg-slate-300'} rounded-lg`}></div>
                    <div className="capitalize">All</div>
                </div>
                <div onClick={() => handleActive('true')} className="flex items-center gap-3 cursor-pointer">
                    <div  className={`w-4 h-4 ${active === 'true' ? 'bg-mainblue' : 'bg-slate-300'} rounded-lg`}></div>
                    <div className="capitalize">refundables</div>
                </div>
            </div>
                <div onClick={() => handleActive('false')} className="flex items-center gap-3 cursor-pointer">
                    <div  className={`w-4 h-4 ${active === 'false' ? 'bg-mainblue' : 'bg-slate-300'} rounded-lg`}></div>
                <div className="capitalize">non-Refundables</div>
            </div>
        </>
    )
}

export default FilterRefundables
