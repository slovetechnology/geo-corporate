import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/logo.png'

const FormLayout = ({children}) => {
    return (
        <div className="h-screen w-full flex items-center">
            <div className={`bg-[#171B4A] w-[30%] h-screen hidden md:block`}></div>
            <div className="w-full md:w-[70%] h-screen ml-auto">
                <div className="flex justify-end py-6 pr-16">
                    <Link onClick={() => window.scrollTo(0, 0)} to='/'> <img src={Logo} alt="logo" className="w-20" /></Link>
                </div>
                <div className=" text-[#171B4A] w-11/12 max-w-2xl pl-10 md:pl-20 mt-24 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormLayout
