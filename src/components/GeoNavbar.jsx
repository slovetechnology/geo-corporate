

import React, { useEffect, useRef, useState } from 'react'
import { SlArrowDown, SlBell, SlMagnifier, SlMenu, SlPower, SlSettings } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Loading from './Loading'
import { ImUser } from 'react-icons/im'
import { AlertError, MainToken } from './functions'
import Disconnect from './Disconnect'

const TYPES = [
  {
    account_type: 'PREPAID',
    color: 'left-[0.2rem] bg-orange-400'
  },
  {
    account_type: 'POSTPAID',
    color: 'right-[0.2rem] bg-mainblue'
  },
  {
    account_type: 'BOTH',
    color: ''
  },
]
const GeoNavbar = (props) => {
  const { user } = useSelector(state => state.data)
  const navigate = useNavigate()
  const [logs, setLogs] = useState(false)
  const [logs2, setLogs2] = useState(false)
  const logref = useRef()
  const logref2 = useRef()
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState({
    status: false,
    title: ''
  })
  const [types, setTypes] = useState(TYPES.find(ele => ele.account_type === user.account_type))

  useEffect(() => {
    logref && window.addEventListener('click', (e) => {
      logref.current !== null && !logref.current?.contains(e.target) && setLogs(false)
    }, true)
    logref2 && window.addEventListener('click', (e) => {
      logref2.current !== null && !logref2.current?.contains(e.target) && setLogs2(false)
    }, true)
  }, [])

  const handleLogout = () => {
    setLogs2(!logs2)
    setLogs(false)
  }

  const confirmLogoutHandler = async () => {
    setLoading(true)
    navigate('/')
    Cookies.remove(MainToken)
  }

  const HandleToggling = () => {
    // setTypes(!types)
    if(user.account_type === TYPES[0].account_type) return setView({ status: true, title:`Sorry, your organization is not enabled for Postpaid booking. Please click here to start the process for Postpaid`})
    if(user.account_type === TYPES[1].account_type) return setView({ status: true, title:`Sorry, your organization is not enabled for Prepaid booking. Please click here to start the process for Prepaid`})
    console.log('halo', user, types)
  }
  return (
    <div className='flex items-center justify-between p-6'>
      {loading && <Loading />}
     {view.status && <Disconnect closeView={() => setView({...view, status: !view.status})} title={view.title} />}
      {/* modal to confirm admin logout */}
      <div className={`bg-black/50 fixed w-full h-screen top-0 left-0 z-[15] flex items-center justify-center ${logs2 ? '' : 'hidden'}`}>
        <div ref={logref2} className='w-11/12 max-w-xl mx-auto rounded-lg bg-white p-4'>
          <div className='text-center'>Hi! <span className="font-bold">{user.firstName} {user.lastName}</span> , Are you sure you want to Logout? </div>
          <div className='mt-10 w-fit ml-auto'>
            <button onClick={confirmLogoutHandler} className='bg-mainblue py-3 px-6 text-sm rounded-lg text-white'>Yes!, Log me out</button>
          </div>
        </div>
      </div>
      {/* small modal for logout */}
      <div ref={logref} className={`absolute top-20 right-8 bg-white shadow-lg min-w-[14rem] z-[15] ${logs ? '' : 'hidden'} `}>
        <div className='py-2 px-4 hover:bg-slate-50'>
          <Link
            to=''
            className={`flex cursor-pointer capitalize items-center gap-2 rounded-lg`}
          >
            {" "}
            <SlSettings /> <span className='mt-1'>settings</span>{" "}
          </Link>
        </div>
        <div onClick={handleLogout} className='py-2 px-4 hover:bg-slate-50 flex cursor-pointer capitalize items-center gap-2 rounded-lg'>
          <SlPower /> <span className='mt-1'>logout</span>
        </div>
      </div>
      {/* small modal ends */}
      <div>
        <div onClick={() => props.openSidebar()} className='cursor-pointer text-xl lg:hidden'> <SlMenu /> </div>
      </div>
      <div className='flex items-center gap-8'>
        <div className="flex items-center gap-4">
          <div className="transition-all">{types.account_type}</div>
          <div title="Toggle Account Type" className="relative w-[4.2rem] h-[1.8rem] border border-slate-400 rounded-full">
            <div onClick={() => HandleToggling()} className={`absolute top-[1px] ${types.color} transition-all w-6 cursor-pointer h-6 rounded-full `}></div>
          </div>
        </div>
        <div onClick={() => setLogs(!logs)} className='flex items-center gap-5 cursor-pointer'>
          <div className="w-fit border p-2 rounded-lg"> <ImUser /> </div>
          <div className='flex items-center gap-2'>{user.name} <SlArrowDown /> </div>
        </div>
      </div>
    </div>
  )
}

export default GeoNavbar
