
import { useEffect, useRef } from 'react'
import styled from 'styled-components';

type FlightProps = {
    city: string
}

type Props = {
    flight?: any,
    closeView: () => void
    fetchOriginAirportsClick: (val: string) => void
}
export default function PopularAirports (props: Props) {
    const togref = useRef<HTMLDivElement>(null)
    const recentCities = JSON.parse(localStorage.getItem('recent-cities') || "null")

    useEffect(() => {
        togref && window.addEventListener('click', (e) => {
            togref.current !== null && !togref.current.contains(e.target as Node) && props.closeView()
        }, true)
    }, [props])
    return (
        <InputSuggestWrapper1 ref={togref} className='w-full md:w-[32rem] scrolls lg:w-[35rem] shadow-lg '>
            <div className='bg-blue-50 p-2 rounded-tr-md text-sm rounded-tl-md uppercase'> popular places</div>
            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 m-0'>
                {/* recent cities */}
                {recentCities.length > 0 && recentCities.slice(0).reverse().map((city: FlightProps, i: number) =>(
                    <div key={i} onClick={() => props.fetchOriginAirportsClick(city.city.toLowerCase())} className="cursor-pointer text-sm capitalize p-2">{city.city}</div>
                ))}
            </div>
            <div className='bg-blue-50 p-2 text-sm uppercase'> Cities</div>
            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 px-1 m-0'>
                <div onClick={() => props.fetchOriginAirportsClick(`lagos`)} className="cursor-pointer text-sm capitalize p-2">lagos</div>
                <div onClick={() => props.fetchOriginAirportsClick(`asaba`)} className="cursor-pointer text-sm capitalize p-2">asaba</div>
                <div onClick={() => props.fetchOriginAirportsClick(`abuja`)} className="cursor-pointer text-sm capitalize p-2">abuja</div>
                <div onClick={() => props.fetchOriginAirportsClick(`benin`)} className="cursor-pointer text-sm capitalize p-2">benin</div>
                <div onClick={() => props.fetchOriginAirportsClick(`london`)} className="cursor-pointer text-sm capitalize p-2">london</div>
                <div onClick={() => props.fetchOriginAirportsClick(`nairobi`)} className="cursor-pointer text-sm capitalize p-2">Nairobi</div>
                <div onClick={() => props.fetchOriginAirportsClick(`new york`)} className="cursor-pointer text-sm capitalize p-2">New York</div>
                <div onClick={() => props.fetchOriginAirportsClick(`paris`)} className="cursor-pointer text-sm capitalize p-2">Paris</div>
                <div onClick={() => props.fetchOriginAirportsClick(`amsterdam`)} className="cursor-pointer text-sm capitalize p-2">Amsterdam</div>
                <div onClick={() => props.fetchOriginAirportsClick(`accra`)} className="cursor-pointer text-sm capitalize p-2">Accra</div>
                <div onClick={() => props.fetchOriginAirportsClick(`dubai`)} className="cursor-pointer text-sm capitalize p-2">dubai</div>
                <div onClick={() => props.fetchOriginAirportsClick(`oklahoma`)} className="cursor-pointer text-sm capitalize p-2">Oklahoma</div>
                <div onClick={() => props.fetchOriginAirportsClick(`orlando`)} className="cursor-pointer text-sm capitalize p-2">Orlando</div>

            </div>
        </InputSuggestWrapper1>
    )
}




const InputSuggestWrapper1 = styled.div`
display: grid;
gap: 10px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  z-index: 999;
`;
