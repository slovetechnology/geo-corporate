import React, { useEffect, useRef } from 'react'
import avif from '/src/assets/images/vif.jpg'
import {useNavigate} from 'react-router-dom'
import { GoodAlert } from '/src/components/functions'

const PayModal = ({onclose}) => {
    const navigate = useNavigate()
    const togref = useRef()

    useEffect(() => {
        togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && onclose()}, true)
    }, [])

    const Redirect = () => {
        GoodAlert('Not Available at the moment')
    }
  return (
    <div className='fixed top-0 h-screen left-0 w-full bg-black/40 flex items-center justify-center z-10'>
        <div ref={togref} className="bg-white px-4 py-10 rounded-lg w-11/12 max-w-xl">
            <div className="w-fit mx-auto">
                <img src={avif} alt="" className="" />
            </div>
            <div className="font-bold mb-4 text-3xl text-center">Unable to book</div>
            <div className="font-light flex items-center justify-center gap-2">please fund <div onClick={Redirect} className="text-mainblue cursor-pointer font-bold">here</div> to offset you postpaid bill</div>
        </div>
    </div>
  )
}

export default PayModal