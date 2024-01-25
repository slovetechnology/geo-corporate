import React from 'react'
import GeoLayout from '../../components/GeoLayout'
import { NairaSign } from '../../components/functions'
import { SlWallet } from 'react-icons/sl'
import { ImUser } from 'react-icons/im'
import man from '../../assets/images/man.png'
import { BsHourglassSplit } from 'react-icons/bs'
import Flightcard from '../../components/flight/Flightcard'
import DashboardTransactions from './DashboardTransactions'

const Dashboard = () => {
    return (
        <GeoLayout>
            <div className="grid grid-cols-1 lg:grid-cols-5 mt-10 w-11/12 mx-auto gap-8">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-3">
                        <img src={man} alt="" className="w-20 rounded-full object-cover shadow-2xl" />
                        <div className="">
                        <div className="text-2xl text-zinc-500">Hi, <span className="font-bold text-black">Organization Name</span> </div>
                        <div className="text-zinc-500 text-sm">Last Logged in: <span className="font-bold">10/20/2024 05:20:10AM</span> </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:col-span-3">
                    <div className="bg-white rounded-lg px-4 py-6 grid grid-cols-2 gap-3">
                        <div className="bg-red-400/30 text-red-500 border border-red-500 w-fit p-3 rounded-xl text-5xl"> <SlWallet /> </div>
                        <div className="">
                            <div className="text-right font-bold text-2xl text-red-500 break-words">{NairaSign}500,000,000</div>
                            <div className="font-semibold text-right text-zinc-500">Postpaid Balance</div>
                            <div className="w-fit ml-auto mt-5">
                                <div className="relative w-32 h-2 rounded-full bg-zinc-300">
                                    <div className="bg-absolute top-0 left-0 w-4/5 h-2 rounded-full bg-red-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-6 grid grid-cols-2 gap-3">
                        <div className="bg-green-400/30 text-green-500 border border-green-500 w-fit p-3 rounded-xl text-5xl"> <BsHourglassSplit /> </div>
                        <div className="">
                            <div className="text-right font-bold text-2xl text-green-500">30</div>
                            <div className="font-semibold text-right text-zinc-500">Average Aging</div>
                            <div className="w-fit ml-auto mt-5">
                                <div className="relative w-32 h-2 rounded-full bg-zinc-300">
                                    <div className="bg-absolute top-0 left-0 w-2/5 h-2 rounded-full bg-green-400"></div>
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
