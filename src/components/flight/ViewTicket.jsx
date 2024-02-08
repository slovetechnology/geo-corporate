
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { usePDF } from 'react-to-pdf'
import ReservationTicket from './ReservationTicket'

const ViewTicket = ({ closeView, flight }) => {
    const [loads, setLoads] = useState(false)
    const { toPDF, targetRef } = usePDF({ filename: 'ticket.pdf' });
    return (
        <div className='fixed top-0 left-0 bg-black/50 z-[999] py-16 overflow-y-auto scrolls w-full h-screen'>
            <div className="w-full bg-white max-w-3xl mx-auto p-4 scrollsdown overflow-x-auto relative">
                <div onClick={closeView} className="absolute top-3 right-3 cursor-pointer rounded-lg p-2 bg-slate-200 text-xl"> <FaTimes /> </div>
                <div className="">
                    <div>
                        <div className='grid grid-cols-2 w-10/12 mx-auto mt-16'>
                            <div className='font-semibold text-2xl text-zinc-600'>
                                Found a matching flight{" "}
                                <span className='font-light text-sm uppercase'>{flight.reference}</span>{" "}
                            </div>
                          {!flight.ticketed && <div className=''>
                                <div className='text-right capitalize'>status</div>
                                {new Date(flight?.expiresAt).getTime() < Date.now() && (
                                    <div className='text-right capitalize text-orange-400'>Expired</div>
                                )}
                                {new Date(flight?.expiresAt).getTime() > Date.now() && (
                                    <div className='text-right capitalize text-green-400'>Active</div>
                                )}
                            </div>}
                        </div>
                        <div ref={targetRef} className="outcome mb-10 h-fit">
                            <ReservationTicket flight={flight} />
                        </div>
                        {flight.ticketed && <div className="flex items-center gap-4 flex-wrap justify-end">
                            <button disabled={!loads ? false : true} onClick={() => toPDF()} className={`my-10 border ${!loads ? 'border-mainblue text-mainblue' : 'borderslate-700 text-slate-600 cursor-pointer'} py-3 px-6 rounded-lg`}>{loads ? 'Downloading ticket' : 'Print / Download Ticket'}</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTicket