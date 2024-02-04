import React, { useState } from 'react'
import GeoLayout from '../../components/GeoLayout'
import { NairaSign } from '../../components/functions'
import { SlWallet } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import man from '../../assets/images/man.png'
import { BsHourglassSplit } from 'react-icons/bs'
import { GiReceiveMoney } from 'react-icons/gi'
import { IoStatsChartOutline } from 'react-icons/io5'
import Flightcard from '../../components/flight/Flightcard'
import DashboardTransactions from './DashboardTransactions'


// Aging color code

// Green if average aging is < 50% of avg aging Max (example if Max is 10 days and aging is 3 days. This should be green because it is less than 50% of Max.

// Amber if avg aging is between 50% and 70% of avg aging Max

// Red if avg aging is above 70% of avg Aging Max
const COLORTYPES = [
    {
        color: 'text-green-500',
        min: 0,
        max: 50
    },
    {
        color: 'text-amber-500',
        min: 50,
        max: 70
    },
    {
        color: 'text-red-500',
        min: 70,
        max: 100
    },
]
const Dashboard = () => {
    const { user } = useSelector(state => state.data)
    const [agingColor, setAgingColor] = useState(COLORTYPES.find(ele => ele.min <= user.aging_percentage && ele.max >= user.aging_percentage ))
    return (
        <GeoLayout>
            <div className="flex items-center pt-8 px-4 rounded-xl w-11/12 mx-auto gap-3">
                <img src={man} alt="" className="w-16 rounded-full object-cover shadow-2xl" />
                <div className="">
                    <div className="text-2xl text-zinc-500"><span className="font-bold text-black">Organization Name</span> </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 mt-10 w-11/12 mx-auto gap-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center mb-3 bg-white py-8 px-4 rounded-xl shadow-2xl gap-3">
                        <img src={man} alt="" className="w-16 rounded-full object-cover shadow-2xl" />
                        <div className="">
                            <div className="text-2xl text-zinc-500">Hi, <span className="font-bold text-black">Thompson</span> </div>
                            <div className="text-zinc-500 text-sm">Last Logged in: <span className="font-bold">10/20/2024 05:20:10AM</span> </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-6 shadow-2xl grid grid-cols-4 gap-3">
                        <div className="bg-blue-400/30 text-blue-500 border col-span-1 border-blue-500 w-fit h-fit p-3 rounded-xl text-3xl"> <GiReceiveMoney /> </div>
                        <div className="col-span-3">
                            <div className="text-right font-bold text-lg text-blue-500">{NairaSign}{user.revenue?.toLocaleString()}</div>
                            <div className="font-semibold text-right text-zinc-500 text-sm">Revenue</div>
                            <div className="w-fit ml-auto mt-5">
                                <div className="relative w-32 h-2 rounded-full bg-zinc-300">
                                    <div className="bg-absolute top-0 left-0 w-2/5 h-2 rounded-full bg-blue-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:col-span-3">
                    <div className="bg-white rounded-lg px-4 py-6 shadow-2xl col-span-2">
                        <div className="">
                            <div className="grid grid-cols-2">
                            <div className="font-semibold text-zinc-500 text-sm">Average Aging</div>
                            <div className={`text-right font-bold text-lg ${agingColor.color}`}>{user.average_aging}</div>
                            </div>
                            <div className="grid grid-cols-2">
                            <div className="font-semibold text-zinc-500 text-sm">Average Aging Max</div>
                            <div className={`text-right font-bold text-lg ${agingColor.color}`}>{user.average_aging_max}</div>
                            </div>
                            <div className="grid grid-cols-2">
                            <div className="font-semibold text-zinc-500 text-sm">Aging Percentage</div>
                            <div className={`text-right font-bold text-lg ${agingColor.color}`}>{user.aging_percentage}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-2xl px-4 pt-6 pb-2">
                        <div className=" grid grid-cols-4 gap-3">
                            <div className="bg-red-400/30 text-red-500 border col-span-1 border-red-500 w-fit h-fit p-3 rounded-xl text-3xl"> <SlWallet /> </div>
                            <div className="col-span-3">
                                <div className="text-right font-bold text-lg text-red-500 break-words">{NairaSign}{user.postpaid_margin?.toLocaleString()}</div>
                                <div className="font-semibold text-right text-zinc-500 text-sm">Postpaid Margin</div>
                                <div className="w-fit ml-auto mt-2">
                                    <div className="relative w-32 h-2 rounded-full bg-zinc-300">
                                        <div className="bg-absolute top-0 left-0 w-4/5 h-2 rounded-full bg-red-400"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 border-t pt-1 mt-2">
                            <div className="">Postpaid Max:</div>
                            <div className="text-right">{user.postpaid_max}</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-6 shadow-2xl grid grid-cols-4 gap-3">
                        <div className="bg-purple-400/30 text-purple-500 border col-span-1 border-purple-500 w-fit h-fit p-3 rounded-xl text-3xl"><IoStatsChartOutline /> </div>
                        <div className="col-span-3">
                            <div className="text-right font-bold text-lg text-purple-500">{user.volume}</div>
                            <div className="font-semibold text-right text-zinc-500 text-sm">Volume</div>
                            <div className="w-fit ml-auto mt-5">
                                <div className="relative w-32 h-2 rounded-full bg-zinc-300">
                                    <div className="bg-absolute top-0 left-0 w-2/5 h-2 rounded-full bg-purple-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-11/12 mx-auto">
                <div className="bg-white px-5 py-10 rounded-xl shadow-xl">
                    <Flightcard />
                </div>
                <DashboardTransactions />
            </div>
        </GeoLayout>
    )
}

export default Dashboard
