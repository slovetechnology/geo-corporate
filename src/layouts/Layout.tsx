
import React, { useEffect, useRef, useState } from 'react'
import avt from '/src/assets/images/avt.svg'
import { SlArrowDown, SlMenu } from 'react-icons/sl'
import img1 from '/src/assets/images/dashboard1.svg'
import img2 from '/src/assets/images/flight.svg'
import img3 from '/src/assets/images/wallet.svg'
import img4 from '/src/assets/images/Users.svg'
import img5 from '/src/assets/images/dashboard.svg'
import img6 from '/src/assets/images/flight1.svg'
import img7 from '/src/assets/images/wallet1.svg'
import img8 from '/src/assets/images/Users1.svg'
import SideLink from '../components/components/SideLink'

type Props = {
  children: React.ReactNode
}

const SideLinks = [
  { title: `dashboard`, url: `/board`, img: img1, sec: img5 },
  { title: `book flight`, url: `/book-flight`, img: img2, sec: img6 },
  { title: `transactions`, url: `/transactions`, img: img3, sec: img7 },
  { title: `passengers`, url: `/passengers`, img: img4, sec: img8 },
]

export default function Layout({ children }: Props) {
  const [views, setViews] = useState<Boolean>(false)
  const togref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    togref && window.addEventListener('click', (e: any) => { togref.current!== null && !togref.current.contains(e.target) && setViews(false) }, true)
  }, [])
  return (
    <>
     {views ? <div className="fixed w-full h-screen left-0 top-0 lg:none bg-black/30 z-10">
        <div ref={togref} className={`bg-white h-screen w-3/5 sidebar`}>
          <div className="">
            <div className="flex items-center justify-center flex-col w-11/12 mx-auto gap-1">
              <div className="font-extrabold text-2xl mt-10 mb-20">Geo Travel</div>
              {SideLinks.map((item, index) => (
                <SideLink key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>: null}
      <div className="h-screen overflow-x-hidden bg-zinc-50 flex items-center">
        <div className="lg:w-[20%] border border-r border-[#B3AFAF] hidden lg:block h-screen">
          <div className="flex items-center justify-center flex-col w-11/12 mx-auto gap-1">
            <div className="font-extrabold text-2xl mt-10 mb-20">Geo Travel</div>
            {SideLinks.map((item, index) => (
              <SideLink key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="h-screen w-full lg:w-[80%] ml-auto">
          {/* header */}
          <div className="sticky top-0 left-0 w-full">
            <div className="flex items-center justify-between w-11/12 mx-auto py-2.5">
              <div className="">
                <button className='text-3xl lg:hidden' onClick={() => setViews(prev => !prev)}> <SlMenu /> </button>
              </div>
              <div className="flex cursor-pointer gap-1">
                <img src={avt} alt="GeoTravel" className="w-12 h-12" />
                <SlArrowDown />
              </div>
            </div>
          </div>
          {/* body */}
          <div className="overflow-x-hidden overflow-y-auto scrolls h-[91.3dvh] pb-20">
            <div className="w-11/12 mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


