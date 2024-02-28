
import React from 'react'
import EmailSuccess from '/src/assets/images/email_success.svg'
import { Link } from 'react-router-dom';
import FormLayout from '/src/components/FormLayout';


export default function EmailSent(){
  return (
    <FormLayout>
        <div className=" text-[#171B4A] ml-28 mt-28 ">
            <div className="flex gap-5">
                <div className="img">
                    <img src={EmailSuccess} alt="" className='w-20'/>
                </div>
                <div>
          <h1 className="font-bold mb-2">Reset link sent successfully</h1>
          <p className="text-xs font-bold mb-6">
          The password reset link has been sent to your email
          </p>
          <form action="" className="mt-8">
            <div className="flex items-center gap-4 mt-8">

            <Link onClick={() => window.scrollTo(0, 0)} to="/" className="bg-[#2E61E6] text-white text-xs rounded-lg px-5 py-2 block"  >Log into my account</Link>

            </div>
          </form>
                </div>
            </div>
        </div>
    </FormLayout>
  )
}
