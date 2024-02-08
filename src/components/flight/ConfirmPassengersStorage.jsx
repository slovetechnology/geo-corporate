
import React, { useEffect, useRef } from 'react'
const ConfirmPassengersStorage = ({onclose, handleManagement}) => {
    const togref = useRef()

    useEffect(() => {
        togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && onclose()}, true)
    }, [])

  return (
    <div className='fixed top-0 h-screen left-0 w-full bg-black/40 flex items-center justify-center z-10'>
        <div ref={togref} className="bg-white px-4 py-10 rounded-lg w-11/12 max-w-xl">
            <div className="font-light flex items-center justify-center gap-2">Do you want to store this passenger details for future use?</div>
            <div className="mt-10">
                <div className="flex items-center justify-between gap-10 w-full">
                    <button onClick={() => handleManagement('no')} className="bg-slate-200 py-3 px-10 rounded-lg capitalize text-sm">No</button>
                    <button onClick={() => handleManagement('yes')} className="bg-mainblue text-white py-3 px-10 rounded-lg capitalize text-sm">Yes</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmPassengersStorage