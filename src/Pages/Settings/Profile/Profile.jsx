import React, { useEffect, useState } from 'react'
import SettingsLayout from '../SettingsLayout'
import { SlArrowDown, SlCheck } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import { ImUser } from 'react-icons/im'
import { FirebaseImage } from '/src/components/functions'
import { AlertError } from '/src/components/functions'

const Profile = () => {
    const [view, setView] = useState(false)
    const [prof, setProf] = useState(false)
    const {user} = useSelector(state => state.data)
    const passworddots = () => {
        return (
            <div className="flex items-center gap-1">
                {new Array(10).fill().map((item, i) => (
                    <div key={i} className="bg-[#171B4A] w-2 h-2 rounded-lg"></div>
                ))}
            </div>
        )
    }
    useEffect(() => {
        const FetchOrg = async () => {
            try {
                
            } catch (error) {
                AlertError(`${error.message}`)
            }
        }
    }, [])
    return (
        <SettingsLayout>
            {view && <UpdatePasspwordModal closeView={() => setView(!view)} />}
            {prof && <EditProfile user={user} closeView={() => setProf(!prof)} />}
            <div className="w-11/12 bg-white border">
                <div className="flex items-center w-11/12 gap-4 py-8 ml-auto border-b">
                  {!user.profile?.profile_picture ?
                    <div className="p-2 text-3xl border rounded-lg w-fit"> <ImUser /> </div> : 
                    <img src={FirebaseImage(user.profile?.profile_picture)} alt="" className="object-cover w-20 h-20 rounded-full" />
                    }
                    <div className="">
                        <div className="text-lg font-semibold capitalize">{user.first_name} {user.last_name}</div>
                        <div onClick={() => setProf(!prof)} className="px-4 py-2 text-xs text-center text-white capitalize rounded-lg cursor-pointer bg-mainblue w-fit">edit profile</div>
                    </div>
                </div>
                <div className="w-11/12 py-8 mx-auto">
                    <div className="flex items-center justify-between p-3 mb-4 border rounded-lg bg-sky-50">
                        <div className="w-full">
                            <div className="capitalize text-slate-500">email address</div>
                            <div className="font-semibold">{user.email}</div>
                        </div>
                        <div className="text-blue-600"> <SlCheck /> </div>
                    </div>
                    <div onClick={() => setView(!view)} className="flex items-center justify-between p-3 mb-4 bg-white border rounded-lg cursor-pointer">
                        <div className="">
                            <div className="capitalize text-slate-500">password</div>
                            <div className="font-semibold"> {passworddots()} </div>
                        </div>
                    </div>
                    <div className="ml-auto w-fit"> <button className='flex items-center gap-2 text-mainblue'>View SLA Document <SlArrowDown /> </button> </div>
                </div>
            </div>
        </SettingsLayout>
    )
}

export default Profile
