import { useState } from 'react';
import SingleMultiFlightOption from './SingleMultiFlightOption';
import { useAtom } from 'jotai'
import { detectEmptyFields } from '../functions';
import { FlightRequest } from './Flightcard';
import { FlightDelay } from './store';
import { FLIGHTDATES } from './store';


const FlightcardMultiOptions = (props) => {
    const { exploreFlight, color } = props
    const [btnloader, ] = useAtom(FlightDelay)
    const locals = JSON.parse(localStorage.getItem(FlightRequest))
    const [dates, setDates] = useAtom(FLIGHTDATES)
    const [multies, setMulties] = useState(locals?.destinations || [
        { origin: '', destination: '', departureDate: `${dates[0].value}`, id: 1, errors: [] },
        // { origin: '', destination: '', departureDate: ``, id: 2, errors: [] },
    ])

    const AddMoreMulties = () => {
        const lastChild = multies[multies.length - 1].destination
        const data = {
            origin: lastChild || '',
            destination: '',
            departureDate: ``,
            id: multies.length + 1,
            errors: []
        }
        setMulties([
            ...multies,
            data
        ])
    }

    const CloseExtra = (id) => {
        const filterOut = multies.filter(ele => ele.id !== id)
        setMulties(filterOut)
    }
    const handleexploreFlight = (e) => {
        e.preventDefault()

        const checkErrors = multies.map(ele => {
            const newErrors = [];

            if (!ele.origin && ele.origin.length < 1) {
                newErrors.push('first');
            } else {
                let index = ele.errors.findIndex(item => item === 'first');
                if (index !== -1) {
                    ele.errors.splice(index, 1);
                }
            }


            if (!ele.destination && ele.destination.length < 1) {
                newErrors.push('second');
            } else {
                let index = ele.errors.findIndex(item => item === 'second');
                if (index !== -1) {
                    ele.errors.splice(index, 1);
                }
            }

            if (!ele.departureDate && ele.departureDate.length < 1) {
                newErrors.push('third');
            } else {
                let index = ele.errors.findIndex(item => item === 'third');
                if (index !== -1) {
                    ele.errors.splice(index, 1);
                }
            }

            return {
                ...ele,
                errors: newErrors
            };
        });

        setMulties(checkErrors);
        let allFailed = true

        // Detect empty fields for each object in the data array
        const checks = checkErrors.map((obj, index) => {
            const emptyFields = detectEmptyFields(obj);
            if (emptyFields.length > 0) {
                return allFailed = true
            } else {
                return allFailed = false
            }
        });
        if (!checks.includes(true)) {
            exploreFlight(checkErrors)
        }
    }

    return (
        <div>
            {/* ================================================== main flight option */}
            <form onSubmit={handleexploreFlight}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {multies.map((item, i) => (
                        <SingleMultiFlightOption
                            key={i}
                            i={i}
                            props={props}
                            item={item}
                            multies={multies}
                            setMulties={setMulties}
                            CloseExtra={CloseExtra}
                            color={color}
                        />
                    ))}
                    <div className="grid grid-cols-2 col-span-2 w-11/12">
                        <div className="mr-auto">
                            {multies.length < 6 && <div className='w-full sm:w-fit ml-auto'>
                                <button type="button" onClick={AddMoreMulties} className='py-4 px-4 rounded-lg bg-mainblue text-white'>Add Flight</button>
                            </div>}
                        </div>
                        <div className="w-fit ml-auto">
                            <div className='w-full sm:w-fit ml-auto'>
                                <button className='py-4 px-7 rounded-lg bg-mainblue text-white flex items-center gap-2'>Explore{btnloader && <div className="spin"></div>}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* ================================================= main flight ends above */}
        </div>
    )
}

export default FlightcardMultiOptions
