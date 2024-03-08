import React, { useEffect, useState } from 'react'
import SettingsLayout from '../SettingsLayout'
import { SlArrowDown, SlArrowUp, SlCheck } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import { ImUser } from 'react-icons/im'
import { FirebaseImage } from '/src/components/functions'
import { AlertError } from '/src/components/functions'
import UpdatePasspwordModal from './UpdatePasspwordModal'

const Profile = () => {
    const [view, setView] = useState(false)
    const [open, setOpen] = useState(false)
    const OpenIcon = open ? SlArrowUp : SlArrowDown
    const [prof, setProf] = useState(false)
    const {user, company} = useSelector(state => state.data)
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
                        <div onClick={() => setProf(!prof)} className="px-4 py-2 text-xs text-center text-white capitalize rounded-lg cursor-pointer bg-mainblue w-fit">edit details</div>
                    </div>
                </div>
                <div className="w-11/12 py-8 mx-auto">
                    <div className="hidden mx-auto w-fit">
                        <img src={FirebaseImage(company.organization_information?.logo)} alt="" className="object-cover w-20 h-20 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className=""> Organization</div>
                        <div className="font-bold text-right">{company.organization_name}</div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className="">Primary Email</div>
                        <div className="font-bold text-right">{company.organization_information?.primary_email || 'Nil'}</div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className="">Primary Phone</div>
                        <div className="font-bold text-right">{company.organization_information?.primary_phone || 'Nil'}</div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className="">Secondary Email</div>
                        <div className="font-bold text-right">{company.organization_information?.secondary_email}</div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className="">Secondary Phone</div>
                        <div className="font-bold text-right">{company.organization_information?.secondary_phone}</div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                        <div className=""> Address</div>
                        <div className="font-bold text-right">{company.organization_information?.address}</div>
                    </div>
                    <div onClick={() => setView(!view)} className="flex items-center justify-between p-3 mt-3 mb-4 bg-white border border-t rounded-lg cursor-pointer">
                        <div className="">
                            <div className="capitalize text-slate-500">password</div>
                            <div className="font-semibold"> {passworddots()} </div>
                        </div>
                    </div>
                    <div className="ml-auto w-fit"> <button onClick={() => setOpen(!open)} className='flex items-center gap-2 text-mainblue'>View SLA Document <OpenIcon /> </button> </div>
                   <div className={`mt-16 ${open ? '' : 'hidden'}`}>
                    <embed src={`${FirebaseImage(company?.documents[0]?.sla_report)}`} type="application/pdf" width="100%" height="500px" />
                    </div>
                </div>
            </div>
        </SettingsLayout>
    )
}

export default Profile
