
import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import { FilterByAny, FilterByCode } from "/src/components/utils/airports";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FaExclamationCircle } from 'react-icons/fa';
import { LiaTimesSolid } from "react-icons/lia";
import styled from 'styled-components';
import { DatePicker } from "antd";
import botharrow from "/src/assets/images/botharrow.svg";
import PopularAirports from './PopularAirports';
import { AlertWarning } from '../../services/functions';
dayjs.extend(customParseFormat);
export const dateFormat = 'YYYY/MM/DD';

export const disabledDate = (current: any) => {
    return current < moment().subtract(1, 'day')
};

type Props = {
    i:number 
    item: any 
    CloseExtra: (val: number) => void
    multies: any[]
    setMulties: (val: any) => void
    props: any
    color?: string
}

type FlightProps = {
    iataCode: string
    name?: string
    city?: string
    country?: string
  } 
  

export default function SingleMultiFlightOption (props: Props) {
    const { i, item, CloseExtra, multies, setMulties} = props
    const [togview, setTogview] = useState(false)
    const [togview2, setTogview2] = useState(false)
    const origin_ref = useRef<any>("");
    const destination_ref = useRef<any>("");
    const dest_suggest = useRef<any>("");
    const origin_suggest = useRef<any>("");
    const [airport_origin, set_airport_origin] = useState<any>([]);
    const [airport_dest, set_airport_dest] = useState<any>([]);
    const recentCities = JSON.parse(localStorage.getItem('recent-cities') || "null")
    const [, setFlightError] = useState("")
    const [rolls, setRolls] = useState(false)
    const [flightData, setFlightData] = useState({
        origin: item.origin || '',
        destination: item.destination || '',
        departureDate: item.departureDate || ''
    })

    const disabledDates = (current: any) => {
        const previousDate = multies[i - 1]?.departureDate
        if(previousDate === undefined)return current < moment().subtract(1, 'day')
        return current < moment(previousDate)
    };

    
    const filterPopularAirports = (search: string) => {
        let port = null;
        const airports_found = FilterByAny(search);
        if (search === 'lagos') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'los')
        if (search === 'asaba') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'abb')
        if (search === 'abuja') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'abv')
        if (search === 'benin') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'bni')
        if (search === 'oklahoma') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'tik')
        if (search === 'orlando') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'mco')
        if (search === 'london') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'lhr')
        if (search === 'frankfurt') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'fra')
        if (search === 'nairobi') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'nbo')
        if (search === 'new york') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'jfk')
        if (search === 'paris') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'cdg')
        if (search === 'amsterdam') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'ams')
        if (search === 'accra') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'acc')
        if (search === 'dubai') port = airports_found.find((item: FlightProps) => item.iataCode.toLowerCase() === 'dxb')
        return port
    }

    const fetchOriginAirportsClick = (search: string) => {
        const result: FlightProps = filterPopularAirports(search)
        const val = result.iataCode;
        if (val) {
            origin_ref.current.value = `${result.name} (${result.iataCode
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
                        errors: ele.errors.filter((item: string) => item !== 'first')
                    }
                }
                return ele
            })
            setMulties(mappedMulties)
            setFlightError('')
            const findCity = recentCities.find((city: FlightProps) => city.iataCode === result.iataCode)
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

    const fetchOriginAirportsClick2 = (search: string) => {
        const result = filterPopularAirports(search)
        const val = result.iataCode;
        if (val) {
            destination_ref.current.value = `${result.name} (${result.iataCode
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
                        errors: ele.errors.filter((item: string) => item !== 'second')
                    }
                }
                return ele
            })
            setMulties(mappedMulties)
            setFlightError('')
            const findCity = recentCities.find((city: FlightProps) => city.iataCode === result.iataCode)
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

    const fetchOriginAirports = (search: string) => {
        let airports_found: any;
        if(search.length > 2) {
          airports_found = FilterByCode(search);
        }
        if(search.length > 3) {
          airports_found = FilterByAny(search);
        }
        if (Array.isArray(airports_found) && airports_found.length > 0) {
            set_airport_origin(airports_found);
        } else {
            set_airport_origin([]);
        }
    };

    const fetchDestAirports = (search: string) => {
        let airports_found;
        if(search.length > 2) {
          airports_found = FilterByCode(search);
        }
        if(search.length > 3) {
          airports_found = FilterByAny(search);
        }
        if (Array.isArray(airports_found) && airports_found.length > 0) {
            set_airport_dest(airports_found);
        } else {
            set_airport_dest([]);
        }
    };



    const fetchAirport_code = (code: string) => {
        const _airports = FilterByCode(code);
        if (Array.isArray(_airports) && _airports.length > 0) {
            const _current = _airports[0];
            return `${_current.name} (${_current.iataCode})`;
        }
        return "";
    };

    useEffect(() => {
        if (dest_suggest && dest_suggest.current) {
            dest_suggest.current.addEventListener("mouseleave", () => {
                fetchDestAirports("");
            });
        }
        if (origin_suggest && origin_suggest.current) {
            origin_suggest.current.addEventListener("mouseleave", () => {
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
            <ItemWrapper className='col-span-3 mb-3'>
                <SelectWrapper className='relative'>
                    <DeptDay className='absolute top-0 left-5'>From</DeptDay>
                    <Input
                        autoComplete="off"
                        name="origin"
                        className={item.errors.includes('first') ? 'border border-red-600' : 'border border-[#eaeaea]'}
                        onClick={() => { setTogview(!togview); setTogview2(false) }}
                        placeholder="City or Airport"
                        onKeyUp={(e: any) => {
                            const val = e.target.value
                            const mappedMulties = multies.map(ele => {
                                if (ele.id === item.id) {
                                    if (val.length < 1) {
                                        return {
                                            ...ele,
                                            origin: '',
                                            errors: ele.errors.filter((item: string) => item !== 'first')
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
                    {item.errors.includes('first') && <FaExclamationCircle className='absolute text-red-600 right-5 top-4' />}
                    <img loading="lazy" decoding="async" data-nimg="1" onClick={handleTransformation} className={`flightIcon cursor-pointer ${rolls ? 'rolled' : 'backrolled'}`} alt={botharrow} src={botharrow} />

                    <InputSuggestWrapper ref={origin_suggest}>
                        {airport_origin.map((airport: FlightProps, index: number) => {
                            return (
                                <InputSuggest
                                    key={index}
                                    onClick={() => {
                                        const val = airport.iataCode;
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
                                                    errors: ele.errors.filter((item: string) => item !== 'first')
                                                }
                                            }
                                            return ele
                                        })
                                        setMulties(mappedMulties)
                                        origin_ref.current.value = `${airport.name} (${airport.iataCode
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
                                    <span>{airport.iataCode}</span>
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
                        onKeyUp={(e: any) => {
                            const val = e.target.value
                            const mappedMulties = multies.map(ele => {
                                if (ele.id === item.id) {
                                    if (val.length < 1) {
                                        return {
                                            ...ele,
                                            destination: '',
                                            errors: ele.errors.filter((item: string) => item !== 'first')
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
                    {item.errors.includes('second') && <FaExclamationCircle className='absolute text-red-600 right-5 top-4' />}
                    <InputSuggestWrapper ref={dest_suggest}>
                        {airport_dest.map((airport: FlightProps, i: number) => {
                            return (
                                <InputSuggest
                                    key={i}
                                    onClick={() => {
                                        const val = airport.iataCode;
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
                                                    errors: ele.errors.filter((item: string) => item !== 'second')
                                                }
                                            }
                                            return ele
                                        })
                                        setMulties(mappedMulties)
                                        destination_ref.current.value = `${airport.name} (${airport.iataCode
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
                                    <span>{airport.iataCode}</span>
                                </InputSuggest>
                            );
                        })}
                    </InputSuggestWrapper>
                    {togview2 ? <PopularAirports closeView={() => setTogview2(false)} fetchOriginAirportsClick={fetchOriginAirportsClick2} /> : null}
                </SelectWrapper>
            </ItemWrapper>
            <ItemWrapper className='col-span-3 mb-3'>
                <DateWrapper className='w-full gap-3'>
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
                                        errors: ele.errors.filter((item: string) => item !== 'third')
                                    }
                                }
                                return ele
                            })
                            setMulties(mappedMulties)
                            setFlightError('')
                        }} />
                    {item.errors.includes('third') && <FaExclamationCircle className='absolute text-red-600 right-5 top-4' />}
                </DateWrapper>
            </ItemWrapper>
            {i > 0 && <div className="mx-auto w-fit"><button type="button" onClick={() => CloseExtra(item.id)} className={`${!window.location.pathname.includes('/selectFlight') ? 'text-primary' : 'text-primary'} text-4xl`}> <LiaTimesSolid /></button></div>}
        </div>
    )
}


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
