
import { FaCheck } from 'react-icons/fa'
import { NairaSign } from '/src/components/utils/functions'
import React, { useRef, useState } from 'react'
import { TripName } from './flightcard'

const filterByAirline = ({ flightList, storeAirline }) => {
    const dataArr = []
    const [active, setActive] = useState('all')
    const localTrip = JSON.parse(localStorage.getItem(TripName))


    const ToggleAirlines = item => {
        setActive(item)
        const total = []
        flightList.map(ele => {
            ele.outbound.map(data => {
                if (data.airlineDetails.name?.toLowerCase() === item?.toLowerCase()) {
                    return total.push(ele)
                }
            })
        })
        storeAirline(total)
    }
    const resetFilter = () => {
        storeAirline(flightList)
        setActive('all')
    }

    const handleDuplicates = () => {
        let dataId = 0
        if (localTrip !== 'multi-city') {
            flightList.map((item) => {
                return item.outbound.map((data) => {
                    dataArr.push({ id: dataId++, name: data.airlineDetails.name, amount: item.amount, logo: data.airlineDetails.logo, currency: item.currency, airline: data.airlineDetails.code })
                })
            })
        }
        const unique2 = dataArr.filter((obj, index) => {
            return index === dataArr.findIndex(o => obj.name.toLowerCase() === o.name.toLowerCase());
        });
        return unique2.map((item, i) => {
            return (
                <div className="grid grid-cols-2 py-2" key={i}>
                    <div onClick={() => ToggleAirlines(item.name)} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-5 h-5 border rounded-md flex items-center justify-center ${active === item.name ? 'bg-mainblue text-white' : 'text-slate-500 border-slate-400'}`}> {active === item.name ? <FaCheck className='text-[0.8rem]' /> : null} </div>
                        <div className="text-[0.8rem] font-medium">{item.name}</div>
                    </div>
                    <div className="text-right text-[0.8rem] font-medium">{NairaSign}{parseInt(item.amount).toLocaleString()}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="mt-3">
                <div className="grid grid-cols-2 py-2">
                    <div onClick={resetFilter} className="flex items-center gap-2 cursor-pointer">
                        <div className="">
                            <div className={`w-5 h-5 border rounded-md flex items-center justify-center ${active === 'all' ? 'bg-mainblue text-white' : 'text-slate-500 border-slate-400'}`}> {active.length < 1 ? <FaCheck className='text-[0.8rem]' /> : null} </div>
                        </div>
                        <div className="text-[0.8rem] font-medium">{'All'}</div>
                    </div>
                    <div className="text-right text-[0.8rem] font-medium"> </div>
                </div>
                {handleDuplicates()}
            </div>
        </div>
    )
}

export default filterByAirline