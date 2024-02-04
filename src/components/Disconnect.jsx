import React, { useEffect, useRef } from 'react'
import img from '../assets/images/dis.jpeg'
import {PiUserSwitchLight} from 'react-icons/pi'
import {TiTimesOutline} from 'react-icons/ti'

const Disconnect = ({title, closeView}) => {
    const togref = useRef()
    const handleDirection = () => {
        window.open(`https://www.gowithgeo.com/corporate-appointment`, '_blank')
    }
    useEffect(() => {
        togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && closeView()}, true)
    }, [])
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/40 z-10 flex items-center justify-center'>
        <div ref={togref} className="bg-white mx-auto w-11/12 max-w-md px-6 py-16 rounded-xl relative">
            <div className="flex items-center justify-center flex-col gap-4">
            <div className="relative">
            <PiUserSwitchLight className='text-9xl text-red-400' />
            <div className="bg-white text-5xl absolute bottom-0 right-0 text-red-300 rounded-full"><TiTimesOutline className='' /></div>
            </div>
            <div className="text-red-700 font-light text-center">
               {title}
            </div>
            <button onClick={handleDirection} className="bg-mainblue py-3 px-5 text-white font-light capitalize rounded-lg"> Request for an upgrade </button>
            </div>
        </div>
      discxonn
    </div>
  )
}

export default Disconnect
