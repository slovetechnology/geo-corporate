import { useState } from 'react'
import people from "/src/assets/images/people.svg";
import {
    IncrementBtn,
    IncrementWrap,
    PassengerSpan,
    PassengerSpan1,
    Passengers,
    DecrementBtn,
    DoneBtn,
    Group,
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

export default function SelectPassengers ({flightData, setFlightData, tripState2, setTripState2, togpass }: Props) {
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

            <div ref={togpass} className={`${tripState2 ? "flex" : "hidden"} shadow-xl border z-10 flex-col gap-5 absolute bg-white w-[15rem] p-5 top-[2.5rem] right-0`}>
                <Passengers>
                    <Group>Adult</Group>
                    <IncrementWrap>
                        <DecrementBtn
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
                        </DecrementBtn>
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
                        <IncrementBtn
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
                        </IncrementBtn>
                    </IncrementWrap>
                </Passengers>
                <Passengers>
                    <Group>Children</Group>
                    <IncrementWrap>
                        <DecrementBtn
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
                        </DecrementBtn>
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
                        <IncrementBtn
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
                        </IncrementBtn>
                    </IncrementWrap>
                </Passengers>
                <Passengers>
                    <Group>Infants</Group>

                    <IncrementWrap>
                        <DecrementBtn
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
                        </DecrementBtn>
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

                        <IncrementBtn
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
                        </IncrementBtn>
                    </IncrementWrap>
                </Passengers>

                <DoneBtn onClick={handlePassengers2}>Close</DoneBtn>
            </div>
        </RouteItem>
    )
}

