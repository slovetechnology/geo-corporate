import React, { useEffect, useState } from 'react'
import { Blurhash } from "react-blurhash";

const LoadImage = ({src, width, height, className, handleActive= () => null, alt, tag="img"}) => {
    const [imgLoaded, setImageLoaded] = useState(false)
    useEffect(() => {
        const img = new Image()
        img.onload = () => {setImageLoaded(true)}
        img.src = src
    }, [src])

    return (
        <>
            {!imgLoaded ?
                <Blurhash
                    hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                    width={width}
                    height={height}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                /> :
                tag === 'img' ? 
                <img src={src} alt={alt} className={`${className}`} onClick={() => handleActive(src)} /> :
                <div className=""></div>
            }
        </>
    ) 
}

export default LoadImage
