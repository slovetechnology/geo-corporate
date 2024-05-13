
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { FilterByAny, FilterByCode } from "/src/components/utils/airports";
import { DatePicker } from "antd";
import botharrow from "/src/assets/images/botharrow.svg";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAtom } from 'jotai'
import { AlertError, AlertWarning } from '../../services/functions';
import { FlightDelay, OrgProfile } from '/src/layouts/layoutStore';
import { FlightRequest } from './Flightcard';
import PopularAirports from './PopularAirports';

dayjs.extend(customParseFormat);
export const dateFormat = 'YYYY/MM/DD';

export const disabledDate = (current: any) => {
  return current < moment().subtract(1, 'day')
};

type Props = {
  exploreFlight: (val: any) => void
  localTrip: string
  flightDatatype: string
  color?: string
}

type FlightProps = {
  iataCode: string
  name?: string
  city?: string
  country?: string
} 

export default function FlightcardMainOptions({ exploreFlight, localTrip }: Props) {
  const [btnloader,] = useAtom(FlightDelay)
  const [togview, setTogview] = useState(false)
  const [togview2, setTogview2] = useState(false)
  const origin_ref = useRef<any>(null);
  const destination_ref = useRef<any>(null);
  const dest_suggest = useRef<any>(null);
  const origin_suggest = useRef<any>(null);
  const [airport_origin, set_airport_origin] = useState<any>([]);
  const [airport_dest, set_airport_dest] = useState<any>([]);
  const recentCities = JSON.parse(localStorage.getItem('recent-cities') || "null")
  const [flighterror, setFlightError] = useState("")
  const [rolls, setRolls] = useState(false)
  const localFlight = JSON.parse(localStorage.getItem(FlightRequest) || "null")
const [profile,] = useAtom(OrgProfile)


  const [flightData, setFlightData] = useState({
    origin: localFlight?.origin || '',
    destination: localFlight?.destination || '',
    departureDate: localFlight?.departureDate || '',
    returnDate: localFlight?.returnDate || ''
  });

  const disabledDate2 = (current: any) => {
    return current < moment(flightData?.departureDate)
  }
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
    const result = filterPopularAirports(search)
    const val = result?.iataCode;
    if (val) {
      origin_ref.current.value = `${result?.name} (${result?.iataCode
        })`;
      setFlightData((prevState) => {
        return {
          ...prevState,
          origin: val,
        };
      });
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
    const result: any = filterPopularAirports(search)
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

    if (search.length > 2) {
      airports_found = FilterByCode(search);
    }
    if (search.length > 3) {
      airports_found = FilterByAny(search);
    }
    if (Array.isArray(airports_found) && airports_found.length > 0) {
      set_airport_origin(airports_found);
    } else {
      set_airport_origin([]);
    }
  };

  const fetchDestAirports = (search: string) => {
    let airportsFound: any;
    if (search.length > 2) {
      airportsFound = FilterByCode(search);
    }
    if (search.length > 3) {
      airportsFound = FilterByAny(search);
    }
    if (Array.isArray(airportsFound) && airportsFound.length > 0) {
      set_airport_dest(airportsFound);
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

  const handleexploreFlight = (e: React.FormEvent) => {
    e.preventDefault()
   if (profile.documents.length < 1 || !profile.documents[0]?.is_approved) return AlertError("Unable to book flight at the moment")
    // dispatch(dispatchPageItem(0));
    if (!flightData.origin) {
      return setFlightError('origin')
    }
    if (!flightData.destination) {
      return setFlightError('destination')
    }

    if (!flightData.departureDate) {
      return setFlightError('departureDate')
    }

    if (localTrip === 'return') {
      if (!flightData.returnDate) {
        return setFlightError('returnDate')
      }
    }

    exploreFlight(flightData)
  }

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
    <div>
      {/* ================================================== main flight option */}
      <form onSubmit={handleexploreFlight}>
        <DirectionsWrapper>
          <ItemWrapper>
            <SelectWrapper className='relative'>
              <DeptDay className='absolute top-0 left-5'>From</DeptDay>
              <Input
                autoComplete="off"
                name="origin"
                className={flighterror === 'origin' ? 'border border-red-600' : 'border border-[#eaeaea]'}
                onClick={() => { setTogview(!togview); setTogview2(false) }}
                placeholder="City or Airport"
                onChange={(e) => {
                  fetchOriginAirports(e.target.value);
                  setTogview(false)
                }}
                defaultValue={fetchAirport_code(flightData.origin)}
                ref={origin_ref}
              />
              {flighterror === 'origin' && <FaExclamationCircle className='absolute text-red-600 right-5 top-4' />}
              <img loading="lazy" decoding="async" data-nimg="1" onClick={handleTransformation} className={`flightIcon cursor-pointer ${rolls ? 'rolled' : 'backrolled'}`} alt={botharrow} src={botharrow} />

              <InputSuggestWrapper ref={origin_suggest}>
                {airport_origin.map((airport: FlightProps, index: number) => {
                  return (
                    <InputSuggest
                      key={index}
                      onClick={() => {
                        const val = airport.iataCode
                        setFlightData((prevState) => {
                          return {
                            ...prevState,
                            origin: val,
                          };
                        });
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
              {togview ? <PopularAirports 
              closeView={() => setTogview(false)} 
              fetchOriginAirportsClick={fetchOriginAirportsClick} /> : null}
            </SelectWrapper>

            <SelectWrapper className='relative'>
              <Input
                autoComplete="off"
                name="destination"
                className={flighterror === 'destination' ? 'border border-red-600' : 'border border-[#eaeaea]'}
                onClick={() => { setTogview2(!togview2); setTogview(false) }}
                placeholder="Travelling to?"
                onChange={(e) => {
                  fetchDestAirports(e.target.value);
                  setTogview2(false)
                }}
                defaultValue={fetchAirport_code(flightData.destination)}
                ref={destination_ref}
              />
              {flighterror === 'destination' && <FaExclamationCircle className='absolute text-red-600 right-5 top-4' />}
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
          <ItemWrapper>
            <DateWrapper className='w-full gap-3'>
              <DatePicker
                disabledDate={disabledDate}
                className={`${flighterror === 'departureDate' ? 'border border-red-600' : 'border border-[#eaeaea]'} datepickerclass w-full`}
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
                  setFlightError('')
                }} />
              {localTrip !== 'one-way' ?
                <DatePicker
                  disabledDate={disabledDate2}
                  className={`${flighterror === 'returnDate' ? 'border border-red-600' : 'border border-[#eaeaea]'} datepickerclass w-full`}
                  placeholder={moment().format('ddd D MMM')}
                  defaultValue={flightData.returnDate && dayjs(flightData.returnDate, dateFormat)}
                  format={dateFormat}
                  name="departureDate"
                  onChange={(values) => {
                    const val = moment(new Date(values)).format('YYYY-MM-DD')
                    setFlightData((prevState) => {
                      return {
                        ...prevState,
                        returnDate: val,
                      };
                    });
                    setFlightError('')
                  }} />
                : null}
            </DateWrapper>
          </ItemWrapper>
          <div className='w-full ml-auto sm:w-fit'>
          {(profile.documents.length < 1 || !profile.documents[0]?.is_approved) && 
           <button className='flex items-center gap-2 py-3 text-zinc-500 rounded-lg px-7 bg-zinc-300'>Explore{btnloader && <div className="spin"></div>}</button>
           }
          {profile.documents.length > 0 && profile.documents[0]?.is_approved && 
           <button className='flex items-center gap-2 py-3 text-white rounded-lg px-7 btn'>Explore{btnloader && <div className="spin"></div>}</button>
           }
          </div>
        </DirectionsWrapper>
      </form>
      {/* ================================================= main flight ends above */}
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
