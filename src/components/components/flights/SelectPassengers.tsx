import { useState } from 'react'
import people from "/src/assets/images/people.svg";
import {
    IncrementWrap,
    PassengerSpan,
    PassengerSpan1,
    Passengers,
    Icon2,
    RouteItem
} from './Styles'
import { AlertError } from '../../services/functions';


type Props = {
    flightData: any,
    setFlightData: (val: any) => void,
    tripState2: any,
    setTripState2: any,
    handlePassengers: () => void,
    togpass: any
}

export default function SelectPassengers({ flightData, setFlightData, tripState2, setTripState2, togpass }: Props) {
    const dbutton = `border rounded-full pb-1 w-6 h-6 text-xl flex items-center justify-center`

    const [total, setTotal] = useState(flightData.adults + flightData.children + flightData.infants)
    const maxPassengers = 9

    const handlePassengers = () => {
        setTripState2(true)
    }
    const handlePassengers2 = () => {
        if (flightData.infants > flightData.adults) {
            return AlertError('infants must not be more than adults')
        }
        setTripState2(false)
    }
    return (
        <RouteItem>
            <div className='flex items-center gap-2.5 btn text-white py-2 px-5 rounded-lg font-light' onClick={handlePassengers}>
                <Icon2 src={people} />
                <PassengerSpan>
                    <PassengerSpan1>Passengers</PassengerSpan1> (
                    {total}
                    )
                </PassengerSpan>
            </div>

            <div ref={togpass} className={`${tripState2 ? "flex" : "hidden"} shadow-2xl rounded-xl z-10 flex-col gap-5 absolute bg-white w-[15rem] p-5 top-[2.5rem] right-0`}>
                <Passengers>
                    <div className="w-full">
                        <div className='text-base font-thin'>Adults</div>
                    </div>
                    <IncrementWrap>
                        <div className={dbutton}
                            onClick={() => {
                                if (flightData.adults > 0) {
                                    setTotal((prev: number) => prev - 1)
                                    setFlightData((prevState: any) => {
                                        let val = prevState.adults - 1;
                                        return {
                                            ...prevState,
                                            adults: val,
                                        };
                                    });
                                }
                            }}
                        >
                            -
                        </div>
                        <input
                            value={flightData.adults}
                            onChange={e => {
                                setFlightData((prevState: any) => {
                                    return {
                                        ...prevState,
                                        adults: e.target.value,
                                    };
                                });
                            }}
                        />
                        <div className={dbutton}
                            onClick={() => {
                                if (total < maxPassengers) {
                                    setFlightData((prevState: any) => {
                                        let val = prevState.adults + 1;
                                        return {
                                            ...prevState,
                                            adults: val,
                                        };
                                    })
                                    setTotal((prev: number) => prev + 1)
                                }
                            }
                            }
                        >
                            +
                        </div>
                    </IncrementWrap>
                </Passengers>
                <Passengers>
                    <div className="w-full">
                        <div className='text-base font-thin'>Children</div>
                        <div className="text-[0.5rem]">(from 2 to 17 years old)</div>
                    </div>
                    <IncrementWrap>
                        <div className={dbutton}
                            onClick={() => {
                                if (flightData.children > 0) {
                                    setFlightData((prevState: any) => {
                                        let val = prevState.children - 1;
                                        return {
                                            ...prevState,
                                            children: val,
                                        };
                                    });
                                    setTotal((prev: number) => prev - 1)
                                }
                            }}
                        >
                            -
                        </div>
                        <input
                            value={flightData.children}
                            onChange={e => {
                                setFlightData((prevState: any) => {
                                    return {
                                        ...prevState,
                                        children: e.target.value,
                                    };
                                });
                            }}
                        />
                        <div className={dbutton}
                            onClick={() => {
                                if (total < maxPassengers) {
                                    setFlightData((prevState: any) => {
                                        let val = prevState.children + 1;
                                        return {
                                            ...prevState,
                                            children: val,
                                        };
                                    })
                                    setTotal((prev: number) => prev + 1)
                                }
                            }}
                        >
                            +
                        </div>
                    </IncrementWrap>
                </Passengers>
                <Passengers>
                    <div className="w-full">
                        <div className='text-base font-thin'>Infants</div>
                        <div className="text-[0.5rem]">(less than 2 years old)</div>
                    </div>
                    <IncrementWrap>
                        <div className={dbutton}
                            onClick={() => {
                                if (flightData.infants > 0) {
                                    setFlightData((prevState: any) => {
                                        let val = prevState.infants - 1;
                                        return {
                                            ...prevState,
                                            infants: val,
                                        };
                                    });
                                    setTotal((prev: number) => prev - 1)
                                }
                            }}
                        >
                            -
                        </div>
                        <input
                            value={flightData.infants}
                            onChange={e => {
                                setFlightData((prevState: any) => {
                                    return {
                                        ...prevState,
                                        infants: e.target.value,
                                    };
                                });
                            }}
                        />

                        <div className={dbutton}
                            onClick={() => {
                                if (total < maxPassengers) {
                                    if (flightData.infants < flightData.adults) {
                                        setFlightData((prevState: any) => {
                                            let val = prevState.infants + 1;
                                            return {
                                                ...prevState,
                                                infants: val,
                                            };
                                        })
                                        setTotal((prev: number) => prev + 1)
                                    }
                                }
                            }}
                        >
                            +
                        </div>
                    </IncrementWrap>
                </Passengers>

                <div className="w-fit ml-auto">

                    <button className='btn h-[1.9rem] w-[4.3rem] rounded-lg text-white' onClick={handlePassengers2}>Close</button>
                </div>
            </div>
        </RouteItem>
    )
}

