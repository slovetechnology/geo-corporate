import React, { useState } from 'react'
import people from "../../assets/images/people.svg";
import {
    IncrementBtn,
    IncrementWrap,
    PassengerSpan,
    PassengerSpan1,
    PassengerWrapper,
    Passengers,
    PassengersList,
    DecrementBtn,
    DoneBtn,
    Group,
    Icon2,
    RouteItem
} from './Styles'
import { AlertError } from '../functions';
const SelectPassengers = (props) => {
    const { flightData, setFlightData, tripState2, setTripState2, togpass } = props
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
            <PassengersList onClick={handlePassengers}>
                <Icon2 src={people} />
                <PassengerSpan>
                    <PassengerSpan1>Passengers</PassengerSpan1> (
                    {total}
                    )
                </PassengerSpan>
            </PassengersList>
            <PassengerWrapper ref={togpass} className={`${tripState2 ? "flex" : "hidden"} shadow-xl border`}>
                <Passengers>
                    <Group>Adult</Group>
                    <IncrementWrap>
                        <DecrementBtn
                            onClick={() => {
                                if (flightData.adults > 0) {
                                    setTotal(prev => prev - 1)
                                    setFlightData(prevState => {
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
                                setFlightData(prevState => {
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
                                    setFlightData(prevState => {
                                        let val = prevState.adults + 1;
                                        return {
                                            ...prevState,
                                            adults: val,
                                        };
                                    })
                                    setTotal(prev => prev + 1)
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
                                    setFlightData(prevState => {
                                        let val = prevState.children - 1;
                                        return {
                                            ...prevState,
                                            children: val,
                                        };
                                    });
                                    setTotal(prev => prev - 1)
                                }
                            }}
                        >
                            -
                        </DecrementBtn>
                        <input
                            value={flightData.children}
                            onChange={e => {
                                setFlightData(prevState => {
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
                                    setFlightData(prevState => {
                                        let val = prevState.children + 1;
                                        return {
                                            ...prevState,
                                            children: val,
                                        };
                                    })
                                    setTotal(prev => prev + 1)
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
                                    setFlightData(prevState => {
                                        let val = prevState.infants - 1;
                                        return {
                                            ...prevState,
                                            infants: val,
                                        };
                                    });
                                    setTotal(prev => prev - 1)
                                }
                            }}
                        >
                            -
                        </DecrementBtn>
                        <input
                            value={flightData.infants}
                            onChange={e => {
                                setFlightData(prevState => {
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
                                        setFlightData(prevState => {
                                            let val = prevState.infants + 1;
                                            return {
                                                ...prevState,
                                                infants: val,
                                            };
                                        })
                                        setTotal(prev => prev + 1)
                                    }
                                }
                            }}
                        >
                            +
                        </IncrementBtn>
                    </IncrementWrap>
                </Passengers>

                <DoneBtn onClick={handlePassengers2}>Close</DoneBtn>
            </PassengerWrapper>
        </RouteItem>
    )
}

export default SelectPassengers
