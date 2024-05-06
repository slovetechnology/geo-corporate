

import FormPage from '/src/layouts/FormPage'
import mail from '/src/assets/images/checks.svg'
import { useNavigate } from 'react-router-dom'

export default function AccountConfirmed() {
    const navigate = useNavigate()
    return (
        <FormPage>
            <div className="w-full">

                <div className="">
                    <div className="flex items-center justify-center gap-5">
                        <div className="font-extrabold text-center text-3xl capitalize">Password Changed </div>
                    </div>
                    <div className="w-fit mx-auto my-10"> <img src={mail} alt="" className="w-44 h-auto" /> </div>
                    <div className="text-center w-4/5 mx-auto">Your password has been changed successfully.</div>
                    <div className="mt-12">
                        <button onClick={() => navigate('/login')} className='btn w-full h-[3.1rem] text-white rounded-lg font-bold'>Login</button>
                    </div>
                </div>
            </div>
        </FormPage>
    )
}

