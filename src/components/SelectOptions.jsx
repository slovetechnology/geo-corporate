import { Dialcodes } from '/src/components/countrycodes'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const SelectOptions = ({title, setup, defaultValue}) => {
    const [text, setText] = useState('')
    const [content, setContent] = useState( '')
    const [codes, setCodes] = useState(Dialcodes || [])
    const togref = useRef()
    const [view, setView] = useState(false)

    const GetContent = useCallback(() => {
        const findCode = defaultValue && Dialcodes.find(ele => (ele.name === defaultValue || ele.code === defaultValue))
        if(findCode) {
            setContent(`${findCode.name} - ${findCode.code}` || '')
        }
    }, [defaultValue])
    
    useEffect(() => {
        GetContent()
        togref && window.addEventListener('click', e => {togref.current !== null && !togref.current.contains(e.target) && setView(false) }, true)
    }, [GetContent])

    const handleChange = val => {
        setText(val)
        if(val.length > 0) {
            const findText = Dialcodes.filter(ele => ele.name.toLowerCase().includes(val?.toLowerCase()))
            setCodes(findText)
        }else {
            setCodes(Dialcodes)
        }
    }
    const handleSelection = val => {
        setContent(`${val.name} - ${val.code}`)
        setup(val)
        setView(false)
    }
    return (
        <>
            <div ref={togref} className={`${view ? '' : 'hidden'} absolute top-[6rem] z-10 left-0 w-full bg-white border shadow-2xl`}>
                <div className="w-11/12 mx-auto mt-3">
                    <input value={text} onChange={e => handleChange(e.target.value)} placeholder='Search country here!...' type="text" className="border text-sm p-2 w-full rounded-sm" />
                    <div className="h-[20rem] overflow-y-auto scrolls">
                        {codes.map((item, i) => (
                            <div onClick={() => handleSelection(item)} className="text-xs p-1.5 border-b cursor-pointer hover:bg-slate-50" key={i}>{item.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <Input onClick={() => setView(true)} placeholder={title} value={content} readOnly />
        </>
    )
}

export default SelectOptions

const Input = styled.input`
            width: 100%;
            height: 54px;
            background: #ffffff;
            border: 1px solid #eaeaea;
            border-radius: 4px;
            margin: 10px 0;
            padding: 8px 15px;

            :active,
            :focus {
                outline: none;
            border: 1px solid #eaeaea;
  }
  `;