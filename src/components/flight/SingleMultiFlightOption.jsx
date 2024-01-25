
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { FilterByAny, FilterByCode } from "/src/components/airports";
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AlertWarning } from '/src/components/functions';
import { useDispatch } from 'react-redux';
import { FaExclamationCircle } from 'react-icons/fa';
import { useAtom } from 'jotai'
import { LiaTimesSolid } from "react-icons/lia";
import styled from 'styled-components';
import { DatePicker } from "antd";
import botharrow from "/src/assets/images/botharrow.svg";
import PopularAirports from './PopularAirports';
import { FLIGHTDATES } from './store';
dayjs.extend(customParseFormat);
export const dateFormat = 'YYYY/MM/DD';

export const disabledDate = (current) => {
    return current < moment().subtract(1, 'day')
};

const SingleMultiFlightOption = (props) => {
    const { i, item, CloseExtra, multies, setMulties, color } = props
    const dispatch = useDispatch()
    const [togview, setTogview] = useState(false)
    const [togview2, setTogview2] = useState(false)
    const origin_ref = useRef("");
    const destination_ref = useRef("");
    const dest_suggest = useRef("");
    const origin_suggest = useRef("");
    const [airport_origin, set_airport_origin] = useState([]);
    const [airport_dest, set_airport_dest] = useState([]);
    const [searchParams] = useSearchParams();
    const recentCities = JSON.parse(localStorage.getItem('recent-cities'))
    const [flighterror, setFlightError] = useState()
    const [rolls, setRolls] = useState(false)
    const [dates, setDates] = useAtom(FLIGHTDATES)
    const [flightData, setFlightData] = useState({
        origin: item.origin || '',
        destination: item.destination || '',
        departureDate: item.departureDate || ''
    })
    const findLastDate = multies[dates.length - 1]


    const disabledDates = (current) => {
        if (findLastDate) {
            return current < moment(findLastDate)
        }
        return current < moment().subtract(1, 'day')
    };

    const disabledDate2 = (current) => {
        return current < moment(flightData?.departureDate)
    }
    const filterPopularAirports = (search) => {
        let port = null;
        const airports_found = FilterByAny(search);
        if (search === 'lagos') port = airports_found.find((item) => item.iata.toLowerCase() === 'los')
        if (search === 'abuja') port = airports_found.find((item) => item.iata.toLowerCase() === 'abv')
        if (search === 'benin') port = airports_found.find((item) => item.iata.toLowerCase() === 'bni')
        if (search === 'oklahoma') port = airports_found.find((item) => item.iata.toLowerCase() === 'tik')
        if (search === 'orlando') port = airports_found.find((item) => item.iata.toLowerCase() === 'mco')
        if (search === 'london') port = airports_found.find((item) => item.iata.toLowerCase() === 'lhr')
        if (search === 'frankfurt') port = airports_found.find((item) => item.iata.toLowerCase() === 'fra')
        if (search === 'nairobi') port = airports_found.find((item) => item.iata.toLowerCase() === 'nbo')
        if (search === 'new york') port = airports_found.find((item) => item.iata.toLowerCase() === 'jfk')
        if (search === 'paris') port = airports_found.find((item) => item.iata.toLowerCase() === 'cdg')
        if (search === 'amsterdam') port = airports_found.find((item) => item.iata.toLowerCase() === 'ams')
        if (search === 'accra') port = airports_found.find((item) => item.iata.toLowerCase() === 'acc')
        if (search === 'dubai') port = airports_found.find((item) => item.iata.toLowerCase() === 'dxb')
        return port
    }

    const fetchOriginAirportsClick = (search) => {
        const result = filterPopularAirports(search)
        const val = result.iata || result.icao;
        if (val) {
            origin_ref.current.value = `${result.name} (${result.iata || result.icao
                })`;
            setFlightData((prevState) => {
                return {
                    ...prevState,
                    origin: val,
                };
            });

            // add the result to multies
            const mappedMulties = multies.map(ele => {
                if (ele.id === item.id) {
                    return {
                        ...ele,
                        origin: val,
                        errors: ele.errors.filter(item => item !== 'first')
                    }
                }
                return ele
            })
            setMulties(mappedMulties)
            setFlightError('')
            const findCity = recentCities.find((city) => city.iata === result.iata)
            if (findCity) {
                const dataIndex = recentCities.indexOf(findCity)
                recentCities.splice(dataIndex, 1)
                recentCities.push(result)
                localStorage.setItem('recent-cities', JSON.stringify(recentCities))
            } else {
                recentCities.push(result)
                localStorage.setItem('recent-cities', JSON.stringify(recentCities))
            }
        }
        setTogview(!togview)
    }

    const fetchOriginAirportsClick2 = (search) => {
        const result = filterPopularAirports(search)
        const val = result.iata || result.icao;
        if (val) {
            destination_ref.current.value = `${result.name} (${result.iata || result.icao
                })`;
            setFlightData((prevState) => {
                return {
                    ...prevState,
                    destination: val,
                };
            });
            // add the result to multies
            const mappedMulties = multies.map(ele => {
                if (ele.id === item.id) {
                    return {
                        ...ele,
                        destination: val,
                        errors: ele.errors.filter(item => item !== 'second')
                    }
                }
                return ele
            })
            setMulties(mappedMulties)
            setFlightError('')
            const findCity = recentCities.find((city) => city.iata === result.iata)
            if (findCity) {
                const dataIndex = recentCities.indexOf(findCity)
                recentCities.splice(dataIndex, 1)
                recentCities.push(result)
                localStorage.setItem('recent-cities', JSON.stringify(recentCities))
            } else {
                recentCities.push(result)
                localStorage.setItem('recent-cities', JSON.stringify(recentCities))
            }
        }
        setTogview2(!togview2)
    }

    const fetchOriginAirports = (search) => {
        const airports_found = FilterByAny(search);
        if (Array.isArray(airports_found) && airports_found.length > 0) {
            set_airport_origin(airports_found);
        } else {
            set_airport_origin([]);
        }
    };

    const fetchDestAirports = (search) => {
        const airports_found = FilterByAny(search);
        if (Array.isArray(airports_found) && airports_found.length > 0) {
            set_airport_dest(airports_found);
        } else {
            set_airport_dest([]);
        }
    };



    const fetchAirport_code = (code) => {
        const _airports = FilterByCode(code);
        if (Array.isArray(_airports) && _airports.length > 0) {
            const _current = _airports[0];
            return `${_current.name} (${_current.iata || _current.icao})`;
        }
        return "";
    };

    useEffect(() => {
        if (dest_suggest && dest_suggest.current) {
            dest_suggest.current.addEventListener("mouseleave", (e) => {
                fetchDestAirports("");
            });
        }
        if (origin_suggest && origin_suggest.current) {
            origin_suggest.current.addEventListener("mouseleave", (e) => {
                fetchOriginAirports("");
            });
        }
    });

    const handleTransformation = () => {
        if (!flightData.origin || !flightData.destination) return AlertWarning('Select an origin and a destination first!.')
        const fetchorigin = fetchAirport_code(flightData.destination)
        const fetchdes = fetchAirport_code(flightData.origin)
        origin_ref.current.value = fetchorigin
        destination_ref.current.value = fetchdes
        setFlightData((prevState) => {
            return {
                ...prevState,
                origin: flightData.destination,
                destination: flightData.origin,
            };
        });
        setRolls(!rolls)
    }
    return (
        <div className={`grid grid-cols-1 ${i > 0 ? 'md:grid-cols-7' : 'md:grid-cols-6'} col-span-2 gap-3 w-full`}>
            <ItemWrapper className='mb-3 col-span-3'>
                <SelectWrapper className='relative'>
                    <DeptDay className='absolute top-0 left-5'>From</DeptDay>
                    <Input
                        autoComplete="off"
                        name="origin"
                        className={item.errors.includes('first') ? 'border border-red-600' : 'border border-[#eaeaea]'}
                        onClick={() => { setTogview(!togview); setTogview2(false) }}
                        placeholder="City or Airport"
                        onKeyUp={e => {
                            const val = e.target.value
                            const mappedMulties = multies.map(ele => {
                                if (ele.id === item.id) {
                                    if (val.length < 1) {
                                        return {
                                            ...ele,
                                            origin: '',
                                            errors: ele.errors.filter(item => item !== 'first')
                                        }
                                    }
                                }
                                return ele
                            })
                            setMulties(mappedMulties)
                        }}
                        onChange={(e) => {
                            fetchOriginAirports(e.target.value);
                            setTogview(false)
                        }}
                        defaultValue={fetchAirport_code(flightData.origin)}
                        ref={origin_ref}
                    />
                    {item.errors.includes('first') && <FaExclamationCircle className='absolute right-5 text-red-600 top-4' />}
                    <img onClick={handleTransformation} className={`flightIcon cursor-pointer ${rolls ? 'rolled' : 'backrolled'}`} alt={botharrow} src={botharrow} />

                    <InputSuggestWrapper ref={origin_suggest}>
                        {airport_origin.map((airport) => {
                            return (
                                <InputSuggest
                                    key={airport.id}
                                    onClick={() => {
                                        const val = airport.iata || airport.icao;
                                        setFlightData((prevState) => {
                                            return {
                                                ...prevState,
                                                origin: val,
                                            };
                                        });
                                        // add the result to multies
                                        const mappedMulties = multies.map(ele => {
                                            if (ele.id === item.id) {
                                                return {
                                                    ...ele,
                                                    origin: val,
                                                    errors: ele.errors.filter(item => item !== 'first')
                                                }
                                            }
                                            return ele
                                        })
                                        setMulties(mappedMulties)
                                        origin_ref.current.value = `${airport.name} (${airport.iata || airport.icao
                                            })`;
                                        setFlightError('')
                                        fetchOriginAirports("");
                                    }}
                                >
                                    <div>
                                        <h2 title={`${airport.city}, ${airport.country}`}>
                                            {airport.city}, {airport.country}
                                        </h2>
                                        <p>{airport.name}</p>
                                    </div>
                                    <span>{airport.iata || airport.icao}</span>
                                </InputSuggest>
                            );
                        })}
                    </InputSuggestWrapper>
                    {togview ? <PopularAirports closeView={() => setTogview(false)} fetchOriginAirportsClick={fetchOriginAirportsClick} /> : null}
                </SelectWrapper>

                <SelectWrapper className='relative'>
                    <Input
                        autoComplete="off"
                        name="destination"
                        className={item.errors.includes('second') ? 'border border-red-600' : 'border border-[#eaeaea]'}
                        onClick={() => { setTogview2(!togview2); setTogview(false) }}
                        placeholder="Travelling to?"
                        onKeyUp={e => {
                            const val = e.target.value
                            const mappedMulties = multies.map(ele => {
                                if (ele.id === item.id) {
                                    if (val.length < 1) {
                                        return {
                                            ...ele,
                                            destination: '',
                                            errors: ele.errors.filter(item => item !== 'first')
                                        }
                                    }
                                }
                                return ele
                            })
                            setMulties(mappedMulties)
                        }}
                        onChange={(e) => {
                            fetchDestAirports(e.target.value);
                            setTogview2(false)
                        }}
                        defaultValue={fetchAirport_code(flightData.destination)}
                        ref={destination_ref}
                    />
                    {item.errors.includes('second') && <FaExclamationCircle className='absolute right-5 text-red-600 top-4' />}
                    <InputSuggestWrapper ref={dest_suggest}>
                        {airport_dest.map((airport, i) => {
                            return (
                                <InputSuggest
                                    key={i}
                                    onClick={() => {
                                        const val = airport.iata || airport.icao;
                                        setFlightData((prevState) => {
                                            return {
                                                ...prevState,
                                                destination: val,
                                            };
                                        });
                                        // add the result to multies
                                        const mappedMulties = multies.map(ele => {
                                            if (ele.id === item.id) {
                                                return {
                                                    ...ele,
                                                    destination: val,
                                                    errors: ele.errors.filter(item => item !== 'second')
                                                }
                                            }
                                            return ele
                                        })
                                        setMulties(mappedMulties)
                                        destination_ref.current.value = `${airport.name} (${airport.iata || airport.icao
                                            })`;
                                        setFlightError('')
                                        fetchDestAirports("");
                                    }}
                                >
                                    <div>
                                        <h2 title={`${airport.city}, ${airport.country}`}>
                                            {airport.city}, {airport.country}
                                        </h2>
                                        <p>{airport.name}</p>
                                    </div>
                                    <span>{airport.iata || airport.icao}</span>
                                </InputSuggest>
                            );
                        })}
                    </InputSuggestWrapper>
                    {togview2 ? <PopularAirports closeView={() => setTogview2(false)} fetchOriginAirportsClick={fetchOriginAirportsClick2} /> : null}
                </SelectWrapper>
            </ItemWrapper>
            <ItemWrapper className='mb-3 col-span-3'>
                <DateWrapper className='gap-3 w-full'>
                    <DatePicker
                        disabledDate={disabledDates}
                        className={`${item.errors.includes('third') ? 'border border-red-600' : 'border border-[#eaeaea]'} datepickerclass`}
                        placeholder={moment().format('ddd D MMM')}
                        name="departureDate"
                        defaultValue={flightData.departureDate && dayjs(flightData.departureDate, dateFormat)}
                        format={dateFormat}
                        onChange={(values) => {
                            const val = moment(new Date(values)).format('YYYY-MM-DD');
                            setFlightData((prevState) => {
                                return {
                                    ...prevState,
                                    departureDate: val
                                };
                            });
                            // add the result to multies
                            const mappedMulties = multies.map(ele => {
                                if (ele.id === item.id) {
                                    return {
                                        ...ele,
                                        departureDate: val,
                                        errors: ele.errors.filter(item => item !== 'third')
                                    }
                                }
                                return ele
                            })
                            setMulties(mappedMulties)
                            setFlightError('')
                        }} />
                    {item.errors.includes('third') && <FaExclamationCircle className='absolute right-5 text-red-600 top-4' />}
                </DateWrapper>
            </ItemWrapper>
            {i > 0 && <div className="w-fit mx-auto"><button type="button" onClick={() => CloseExtra(item.id)} className={`${!window.location.pathname.includes('/selectFlight') ? 'text-white' : 'text-mainblue'} text-4xl`}> <LiaTimesSolid /></button></div>}
        </div>
    )
}

export default SingleMultiFlightOption


const InputSuggestWrapper = styled.div`
  display: grid;
  gap: 20px;
  max-height: 400px;
  width: 100%;
  width: 250px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  z-index: 9;
`;


const DirectionsWrapper = styled.div`
  margin: 5px 0;
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media only screen and (max-width: 992px) {
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
  }
`;
const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  @media screen and (max-width: 568px) {
    flex-wrap: wrap;
  }
`;
const SelectWrapper = styled.div`
  position: relative;
  width: calc(100% - 50%);
  @media only screen and (max-width: 568px) {
    margin-bottom: 5px;
    width: calc(100%);
  }
`;

const Input = styled.input`
  font-size: 14px;
  color: #171b4a;
  width: 100%;
  height: 54px;
  background: #fff;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 14px;
  color: #171b4a;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
  @media only screen and (max-width: 568px) {
    width: 100%;
  }
`;
const DateWrapper = styled.div`
  display: flex;
  height: 54px;
  width: 100%;

  @media only screen and (max-width: 568px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;


const DeptDay = styled.span`
  font-size: 12px;
  color: #8b8da4;
  padding: 5px;
`;


const InputSuggest = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  cursor: pointer;
  :hover {
    background-color: #2e61e610;
    p {
      color: #2e61e6;
    }
  }
  div {
    display: grid;
    gap: 10px;
    overflow: hidden;
    h2 {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  span {
    flex-shrink: 0;
    display: inline-block;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #545454;
    border-radius: 5px;
  }
`;
