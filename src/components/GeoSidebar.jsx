import React, { useState } from 'react'
import { SlArrowDown, SlArrowUp, SlHome, SlSettings } from 'react-icons/sl'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SidebarUrls } from './SideLinks'

const GeoSidebar = () => {
  const location = useLocation()
  const activeclass = `bg-[#2E61E6] font-semibold text-white`;
  const [active, setActive] = useState(location.pathname)
  const navigate = useNavigate()


  const handleActive = val => {
    if(val === '/setting') return navigate('/geo/setting')
    if (!val.hasMenu) return navigate(`${val.url}`)
    if (active !== val.all) return setActive(val.all)
    setActive('')
  }



  return (
    <div className=''>
      <div className='px-10 py-10 text-xs font-semibold border-b text-slate-600'>
        <div className='tracking-widest'>GEO TRAVEL CORPORATE</div>
      </div>
      <div className='min-h-[70vh] px-6 space-y-1'>
        {SidebarUrls.map((item, i) => {
          const findActive = active !== '/settings' ? active?.includes(item.all) : ''
          return (
            <div className="" key={i}>
              <div onClick={() => handleActive(item)} className={`flex cursor-pointer justify-between capitalize hover:bg-[#2E61E6] hover:text-white px-4 py-3 text-[#171B4A] items-center gap-2 rounded-lg ${findActive ? activeclass : ""}`}>
                <div className="flex items-center gap-2"><item.Icon /> <span className='mt-1'>{item.title}</span></div>
                {item.hasMenu ? findActive ? <SlArrowUp /> : <SlArrowDown /> : null}
              </div>
              {item.hasMenu &&
                findActive &&
                <div className='flex flex-col bg-[#E3E5E9] pl-8 space-y-1 py-3'>
                  {item.menu.map((link, index) => (
                    <Link
                      to={`${link.url}`}
                      key={index}
                      className='p-2 text-sm capitalize hover:text-indigo-600'
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>}
            </div>
          )
        })}
      </div>
      <div className="">
      <div onClick={() => handleActive('/setting')} className={`flex px-10 cursor-pointer justify-between capitalize hover:bg-[#2E61E6] hover:text-white py-3 text-[#171B4A] items-center gap-2 rounded-lg ${active.includes('/setting') ? activeclass : ""}`}>
        <div className="flex items-center gap-2"><SlSettings /> <span className='mt-1'>Settings</span></div>
        {active.includes('/setting')  ? <SlArrowUp /> : <SlArrowDown />}
      </div>
      </div>
    </div>
  )
}

export default GeoSidebar