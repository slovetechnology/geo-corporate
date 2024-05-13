import { useState } from "react";
import { usePDF } from "react-to-pdf";
import ReservationTicket from "./ReservationTicket";
import ModalLayout from "./ModalLayout";



type Props = {
    flight: any
    closeView: () => void
}
export default function ViewTicket({flight, closeView}: Props) {
    const [loads,] = useState(false)
    const { toPDF, targetRef } = usePDF({ filename: 'ticket.pdf' });

  return (
    <ModalLayout closeView={closeView}>
        <div className="">
                <div>
                    <div className='grid grid-cols-2 w-10/12 mx-auto mt-16'>
                        <div className='font-semibold text-2xl text-zinc-600'>
                            Found a matching flight{" "}
                            <div className='font-light text-sm uppercase'>{flight.reference}</div>{" "}
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
    </ModalLayout>
    
  )
}
