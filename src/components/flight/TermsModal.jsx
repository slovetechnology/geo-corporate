import Terms from '/src/components/Terms'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

const TermsModal = ({closeView}) => {
    return (
        <div className='fixed top-0 left-0 bg-black/50 z-[999] py-16 overflow-y-auto scrolls w-full h-screen'>
            <div className="w-full bg-white max-w-3xl mx-auto p-4 relative">
                <div onClick={closeView} className="absolute top-3 right-3 cursor-pointer rounded-lg p-2 bg-slate-200 text-xl"> <FaTimes /> </div>
                <Terms />
            </div>
        </div>
    )
}

export default TermsModal
