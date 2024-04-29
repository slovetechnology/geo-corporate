

import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiCountries, ApiCountryFlags } from './ApiCountries'

type SetupTypes = {
    dial_code: string
    code: string
}

type Props = {
    title: string,
    setup: (val: SetupTypes) => void
    defaultValue: string | undefined
}
const DailcodeOptions = ({ title, setup, defaultValue }: Props) => {
    const [text, setText] = useState('')
    const [content, setContent]: any = useState({
        img: '',
        code: ''
    })
    const [codes, setCodes] = useState(ApiCountries || [])
    const togref = useRef<HTMLDivElement>(null)
    const [view, setView] = useState(false)

    const GetContent = useCallback(() => {
        const findCode = defaultValue && ApiCountries.find(ele => (ele.dial_code === defaultValue))
        if (findCode) {
            const itemflag = ApiCountryFlags.find((ele: any) => ele.name?.toLocaleLowerCase() === findCode.code?.toLocaleLowerCase())

            setContent({
                img: itemflag?.data,
                code: findCode.dial_code
            })
        }
    }, [defaultValue])

    useEffect(() => {
        GetContent()
        togref && window.addEventListener('click', (e: any) => { togref.current !== null && !togref.current.contains(e.target) && setView(false) }, true)
    }, [GetContent])

    const handleChange = (val: any) => {
        setText(val)
        if (val.length > 0) {
            const findText = ApiCountries.filter(ele => ele.name.toLowerCase().includes(val?.toLowerCase()) || ele.dial_code.toLowerCase().includes(val?.toLowerCase()))
            setCodes(findText)
        } else {
            setCodes(ApiCountries)
        }
    }
    const handleSelection = (val: SetupTypes) => {
        const itemflag = ApiCountryFlags.find((ele: any) => ele.name?.toLowerCase() === val.code?.toLowerCase())
        setContent({
            img: itemflag?.data,
            code: `${val.dial_code}`
        })
        setup(val)
        setView(false)
    }
    return (
        <div className='relative'>
            <div ref={togref} className={`${view ? '' : 'hidden'} absolute top-[4rem] z-10 left-0 w-full bg-white border shadow-2xl`}>
                <div className="w-11/12 mx-auto mt-3">
                    <input value={text} onChange={(e: any) => handleChange(e.target.value)} placeholder='Search here!...' type="text" className="w-full p-2 text-sm border rounded-sm" />
                    <div className="h-[20rem] overflow-y-auto scrolls scrollsdown">
                        {codes.map((item, i) => {
                            const itemflag = ApiCountryFlags.find((ele: any) => ele.name?.toLocaleLowerCase() === item.code?.toLocaleLowerCase())
                            return (
                                <div onClick={() => handleSelection(item)} className="text-xs p-1.5 border-b cursor-pointer hover:bg-slate-50 flex items-center gap-2" key={i}> <img loading="lazy" decoding="async" data-nimg="1" src={itemflag?.data} alt="" className="w-5" /> {item.dial_code}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div onClick={() => setView(true)} className="input">{!content.code ? <span className="text-slate-500">{title}</span> : <div className='flex items-center gap-2'> <img src={content.img} className='w-6 h-6' alt="GeoTravel" /> <span>{content.code}</span> </div>}</div>
            {/* <input className='input' onClick={() => setView(true)} placeholder={title} value={content} readOnly /> */}
        </div>
    )
}

export default DailcodeOptions
