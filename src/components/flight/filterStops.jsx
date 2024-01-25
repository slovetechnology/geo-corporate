import React, { useState } from 'react'
import styled from 'styled-components';

const FilterStops = (props) => {
    const [stops, setStops] = useState('all')
    const [form ,setForm] = useState({
        none: false,
        one: false,
        two: false,
        all: false
    })
    const handleStops = val => {
        props.storeStops(val)
        setStops(val)
    }
    return (
        <div className='grid grid-cols-2 mt-5 mb-6'>
            <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => handleStops('all')}>
                <div className={`w-4 h-4 rounded-lg ${stops === 'all' ? ` bg-mainblue` : `bg-slate-300`}`}></div>
                <Item> All-stop</Item>
            </div>
            <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => handleStops(0)}>
                <div className={`w-4 h-4 rounded-lg ${stops === 0 ? ` bg-mainblue` : `bg-slate-300`}`}></div>
                <Item> Non-stop</Item>
            </div>
            <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => handleStops(1)}>
                <div className={`w-4 h-4 rounded-lg ${stops === 1 ? ` bg-mainblue` : `bg-slate-300`}`}></div>
                <Item> One Stop</Item>
            </div>
            <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => handleStops(2)}>
                <div className={`w-4 h-4 rounded-lg ${stops === 2 ? ` bg-mainblue` : `bg-slate-300`}`}></div>
                <Item>More-stops</Item>
            </div>
        </div>
    )
}

export default FilterStops

const Item = styled.h4`
  color: #171b4a;
  font-weight: 600;
  margin: 0 1px;
`;