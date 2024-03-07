
import downarrow from "/src/assets/images/downarrow.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FlightcardMainOptions from "./FlightcardMainOptions";
import { useAtom } from "jotai";
import {
  CardHolder,
  Img,
  RouteItem,
  RoutesWrapper,
  SelectDiv,
  SelectedDiv0,
  Wrapper,
} from "./Styles";
import {useSelector} from 'react-redux'
import SelectPassengers from "./SelectPassengers";
import FlightcardMultiOptions from "./FlightcardMultiOptions";
import moment from "moment";
import { FlightNumber } from "./store";
import { FlightDelay } from "./store";
dayjs.extend(customParseFormat);


export const FlightRequest = 'flight-request'
export const TripName = "trip"

function Flightcard(props) {
  const { handleFilterForMobile, reloadFlight } = props;
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const togtrip = useRef();
  const togcabin = useRef();
  const togpass = useRef();
  const tripactive = "bg-blue-700 text-white";
  const cabinactive = "bg-blue-700 text-white";
  const localTrip = JSON.parse(localStorage.getItem(TripName));
  const recentCities = JSON.parse(localStorage.getItem("recent-cities"));
  const localFlight = JSON.parse(localStorage.getItem(FlightRequest))
  const [tripState, setTripState] = useState(false);
  const [tripState2, setTripState2] = useState(false);
  const [cabinState, setCabinState] = useState(false);
  const [num, setNum] = useAtom(FlightNumber)
  const [loads, setLoads] = useAtom(FlightDelay)
  const {user} = useSelector(state => state.data)
  useEffect(() => {
    togtrip &&
      window.addEventListener(
        "click",
        e => {
          togtrip.current !== null && !togtrip.current.contains(e.target) && setTripState(false);
        },
        true
      );
    togcabin &&
      window.addEventListener(
        "click",
        e => {
          togcabin.current !== null && !togcabin.current.contains(e.target) && setCabinState(false);
        },
        true
      );
    togpass &&
      window.addEventListener(
        "click",
        e => {
          togpass.current !== null && !togpass.current.contains(e.target) && setTripState2(false);
        },
        true
      );
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const getSearchParams = (val = "") => {
    const data = searchParams?.get(val);
    return data ?? "";
  };

  const [flightData, setFlightData] = useState({
    cabin: localFlight?.cabin || "economy",
    adults: parseInt(localFlight?.adults) || 1,
    children: parseInt(localFlight?.children) || 0,
    infants: parseInt(localFlight?.infants) || 0,
    flighttype: localTrip || localFlight?.flighttype || 'return',
  });

  useEffect(() => {
    if (!localTrip) {
      localStorage.setItem(TripName, JSON.stringify("return"));
    }
    if (!recentCities) {
      localStorage.setItem("recent-cities", JSON.stringify([]));
    }
    // eslint-disable-next-line
  }, []);

  // handleApi call
  const exploreFlight = async extravalues => {
    setNum(0)
    let flightExtra = {}, newLink;
    setLoads(true)
    if (localTrip === 'multi-city') {
      let newTrips = []
      extravalues.map(ele => {
        const data = {
          ...ele,
          departureDate: moment(ele.departureDate).format('YYYY-MM-DD')
        }
        newTrips.push(data)
      })
      flightExtra = {
        destinations: newTrips,
        ...flightData
      }
    } else {
      flightExtra = {
        ...extravalues,
        ...flightData
      }
    }
    localStorage.removeItem(FlightRequest)
    setTimeout(() => {
      localStorage.setItem(FlightRequest, JSON.stringify(flightExtra))
      newLink = `/geo/selectFlight`;
      setTimeout(() => {
        if (location.pathname === '/geo/selectFlight') {
          reloadFlight()
        }
        setLoads(false)
        navigate(newLink);
      }, 1000);
    }, 1000);

  };
  // ADULTS, CHILDREN, INFANTS COUNTER

  const [, setpassModal] = useState(false);
  const handlePassengers = () => {
    setpassModal(true);
  };

  const handleTripType = val => {
    setFlightData({
      ...flightData,
      flighttype: val,
    });
    localStorage.setItem(TripName, JSON.stringify(val));
    setTripState(false);
  };

  const handleCabinType = val => {
    setFlightData({
      ...flightData,
      cabin: val,
    });
    setCabinState(false);
  }

  return (
    <Wrapper className="z-[99]">
      <CardHolder>
        <RoutesWrapper className='mb-6'>
          <RouteItem>
            <SelectDiv onClick={() => setTripState(!tripState)} className=''>
              <span>{localTrip?.replace('-', ' ') || flightData?.flighttype?.replace('-', ' ') || "return"}</span>
              <Img src={downarrow} alt="GeoTravel" />
            </SelectDiv>
            <SelectedDiv0
              ref={togtrip}
              className={`shadow-lg ${tripState ? "" : "hidden"} rounded-lg`}
            >
              <div
                onClick={() => handleTripType("return")}
                className={`flex items-center p-2 gap-3 ${(localTrip || flightData?.flighttype) === "return" ? tripactive : null
                  }`}
              >

                {(localTrip || flightData?.flighttype) === "return" && <BsCheckLg className='text-xl' />} Return
              </div>
              <div
                onClick={() => handleTripType("one-way")}
                className={`flex items-center p-2 gap-3 ${(localTrip || flightData?.flighttype) === "one-way" ? tripactive : null
                  }`}
              >

                {(localTrip || flightData?.flighttype) === "one-way" && <BsCheckLg className='text-xl' />} One Way
              </div>
              <div
                onClick={() => handleTripType("multi-city")}
                className={`flex items-center p-2 gap-3 ${(localTrip || flightData?.flighttype) === "multi-city" ? tripactive : null
                  }`}
              >

                {(localTrip || flightData?.flighttype) === "multi-city" && <BsCheckLg className='text-xl' />} Multi city
              </div>
            </SelectedDiv0>
          </RouteItem>

          <RouteItem>
            <SelectDiv onClick={() => setCabinState(!cabinState)} className=''>
              <span>{flightData.cabin || "economy"}</span>
              <Img src={downarrow} alt="GeoTravel" />
            </SelectDiv>
            <SelectedDiv0
              ref={togcabin}
              className={`shadow-lg ${cabinState ? "" : "hidden"} rounded-lg`}
            >
              <div
                onClick={() => handleCabinType("economy")}
                className={`flex items-center capitalize p-2 gap-3 ${flightData.cabin === "economy" ? cabinactive : null
                  }`}
              >

                {flightData.cabin === "economy" && <BsCheckLg className='text-xl' />} economy
              </div>
              <div
                onClick={() => handleCabinType("business")}
                className={`flex items-center capitalize p-2 gap-3 ${flightData.cabin === "business" ? cabinactive : null
                  }`}
              >

                {flightData.cabin === "business" && <BsCheckLg className='text-xl' />} business class
              </div>
              <div
                onClick={() => handleCabinType("first class")}
                className={`flex items-center capitalize p-2 gap-3 ${flightData.cabin === "first class" ? cabinactive : null
                  }`}
              >

                {flightData.cabin === "first class" && <BsCheckLg className='text-xl' />} first class
              </div>
              <div
                onClick={() => handleCabinType("premium")}
                className={`flex items-center capitalize p-2 gap-3 ${flightData.cabin === "premium" ? cabinactive : null
                  }`}
              >

                {flightData.cabin === "premium" && <BsCheckLg className='text-xl' />} premium
              </div>
            </SelectedDiv0>
          </RouteItem>
          <SelectPassengers
            flightData={flightData}
            setFlightData={setFlightData}
            tripState2={tripState2}
            setTripState2={setTripState2}
            handlePassengers={handlePassengers}
            togpass={togpass}
          />
        </RoutesWrapper>
        {/* flight cards main options */}
        {localTrip === 'multi-city' ? <FlightcardMultiOptions
          exploreFlight={exploreFlight}
          localTrip={localTrip}
          flightDatatype={flightData?.flighttype}
        /> :
          <FlightcardMainOptions
            exploreFlight={exploreFlight}
            localTrip={localTrip}
            flightDatatype={flightData?.flighttype}
            color="text-white"
          />}

        {location.pathname === "/geo/selectFlight" && (
          <div className='mt-10'>
            <div
              onClick={handleFilterForMobile}
              className='flex items-center gap-3 text-indigo-600 capitalize cursor-pointer lg:hidden'
            >
              filter flight results <SlArrowRight className='text-xs' />
            </div>
          </div>
        )}
      </CardHolder>
    </Wrapper>
  );
}

export default Flightcard;
