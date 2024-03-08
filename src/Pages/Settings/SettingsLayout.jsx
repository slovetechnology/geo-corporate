import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SlMenu } from 'react-icons/sl'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import GeoLayout from '/src/components/GeoLayout'
// import { Perms } from "/src/pages/GeoAdmin/Settings/permission/PermissionTitle";

const SettingsLayout = ({ children }) => {
    const [view, setView] = useState(false)
    const Icon = view ? FaTimes : SlMenu
    const { user } = useSelector(state => state.data)
    const [subperms, setSubperms] = useState([])

    // useEffect(() => {
    //     const fetchPerms = () => {
    //         const arr = []
    //         user.profile?.role_permissions.map(ele => {
    //             arr.push(ele.permission.permission)
    //         })
    //         setSubperms(arr)
    //     }
    //     fetchPerms()
    // }, [])


    const sidelinks = [
        {
            title: `Organization details`,
            link: `/geo/setting`,
        },
    ]
    return (
        <GeoLayout>
            <div className="flex items-center justify-between px-5 py-3">
                <div className="text-2xl font-semibold capitalize">settings</div>
                <div className="block text-2xl cursor-pointer md:hidden"> <Icon onClick={() => setView(!view)} /> </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-8">
                <div className={`md:col-span-2 md:border-r hidden md:block ${view ? '!block' : ''}`}>
                    <div className="flex flex-col self-start w-11/12 mx-auto">
                        {sidelinks.map((item, i) => (
                              <Link key={i} to={item.link} className="py-2.5 px-4 capitalize cursor-pointer hover:bg-slate-50">{item.title}</Link>
                        ))}
                    </div>
                </div>
                {/* main contents stars here */}
                <div className="md:col-span-6 overflow-y-auto h-[80vh] scrolls scrollsdown">
                    <div className="w-11/12 py-4 mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </GeoLayout>
    )
}

export default SettingsLayout