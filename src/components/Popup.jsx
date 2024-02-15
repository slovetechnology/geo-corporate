import React, { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'

const Popup = ({onclose, children}) => {
  return (
    <div className='fixed top-0 h-screen left-0 w-full bg-black/40 flex items-center justify-center z-10'>
        <div className="bg-white px-4 py-10 rounded-lg relative w-11/12 max-h-[90vh] overflow-y-auto scrolls max-w-xl">
          <div onClick={onclose} className="absolute top-2 right-2 cursor-pointer p-3 text-2xl bg-slate-200 rounded-full">
            <FaTimes />
          </div>
      {children}
    </div>
    </div>
  )
}

export default Popup
