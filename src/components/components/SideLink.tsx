import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = {
    item: {
        url: string,
        title: string,
        img: string
        sec: string
    }
}

export default function SideLink({ item }: Props) {
    const [imgSrc, setImgSrc] = useState(false)
    const location = useLocation()

    return (
        <Link
          to={item.url}
          className={`flex transition-all items-center h-[4.2rem] hover:bg-primary ${item.url.includes(location.pathname) ? 'bg-primary text-white' : ''} hover:text-white rounded-lg justify-center gap-3 py-4 capitalize w-full`}
          onMouseEnter={() => setImgSrc(true)}
          onMouseLeave={() => setImgSrc(false)}
        >
          <img src={item.url.includes(location.pathname) ? item.sec : imgSrc ? item.sec : item.img} alt="" className="" />
          {item.title}
        </Link>
    )
}


