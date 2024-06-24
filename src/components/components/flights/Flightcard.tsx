import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import SelectPassengers from "./SelectPassengers";
import moment from "moment";
import { FlightDelay, FlightNumber, OrgProfile } from "/src/layouts/layoutStore";
import FlightcardMultiOptions from "./FlightcardMultiOptions";
import FlightcardMainOptions from "./FlightcardMainOptions";
import {
  CardHolder,
  PassengerSpan,
  PassengerSpan1,
  RouteItem,
  SelectDiv,
  SelectedDiv0,
} from "./Styles";
import { HiUsers } from "react-icons/hi";
dayjs.extend(customParseFormat);


export const FlightRequest = 'flight-request'
export const TripName = "trip"

type Props = {
  handleFilterForMobile?: (val: any) => void
  reloadFlight: () => void
  userType: string
  shadow: boolean
}

const FlightTripTypes = [
  { title: "One way", tag: 'one-way' },
  { title: "Round trip", tag: 'return' },
  { title: "Multi city", tag: 'multi-city' },
]


export default function Flightcard({ handleFilterForMobile, reloadFlight, shadow }: Props) {
  const location = useLocation();
  const togcabin = useRef<HTMLDivElement>(null);
  const togpass = useRef<HTMLDivElement>(null);
  const cabinactive = "bg-[#AED3FF4D] text-primary";
  const localTrip = JSON.parse(localStorage.getItem(TripName) || "null");
  const recentCities = JSON.parse(localStorage.getItem("recent-cities") || "null");
  const localFlight = JSON.parse(localStorage.getItem(FlightRequest) || "null");
  const [tripState2, setTripState2] = useState(false);
  const [cabinState, setCabinState] = useState(false);
  const [, setNum] = useAtom(FlightNumber)
  const [, setLoads] = useAtom(FlightDelay)
  const [profile,] = useAtom(OrgProfile)


  useEffect(() => {
    togcabin &&
      window.addEventListener(
        "click",
        e => {
          togcabin.current !== null && !togcabin.current.contains(e.target as Node) && setCabinState(false);
        },
        true
      );
    togpass &&
      window.addEventListener(
        "click",
        e => {
          togpass.current !== null && !togpass.current.contains(e.target as Node) && setTripState2(false);
        },
        true
      );
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const [flightData, setFlightData] = useState({
    cabin: localFlight?.cabin || "economy",
    adults: parseInt(localFlight?.adults) || 1,
    children: parseInt(localFlight?.children) || 0,
    infants: parseInt(localFlight?.infants) || 0,
    flighttype: localTrip || 'return',
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
  const exploreFlight = async (extravalues: any) => {
    return navigate('/book-flight/search')
    setNum(0)
    let flightExtra = {}, newLink: string;
    setLoads(true)
    if (localTrip === 'multi-city') {
      let newTrips: string[] = []
      extravalues.map((ele: { departureDate: string }) => {
        const data: any = {
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
        newLink = `/book-flight/search`;
      setTimeout(() => {
        if (location.pathname === newLink) {
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

  const handleTripType = (val: string) => {
    setFlightData({
      ...flightData,
      flighttype: val,
    });
    localStorage.setItem(TripName, JSON.stringify(val));
  };

  const handleCabinType = (val: string) => {
    setFlightData({
      ...flightData,
      cabin: val,
    });
    setCabinState(false);
  }

  return (
    <>
        {profile.documents.length > 0 && !profile.documents[0]?.is_approved && <div className="bg-orange-400 text-white rounded-lg w-fit font-semibold ml-10 mb-5 py-2 px-5">Pending Approval</div>}
    <div className={` z-[1] relative py-4 px-3 md:px-5 backdrop-blur-md rounded-xl ${shadow ? 'shadow-xl bg-white' : ''}`}>
      <CardHolder>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-10'>
          <RouteItem>
            {profile.documents.length > 0 && profile.documents[0]?.is_approved && <div className="flex gap-4 items-center">
              {FlightTripTypes.map((ele, i) => (
                <button
                  onClick={() => handleTripType(ele.tag)}
                  className={`${localTrip === ele.tag ? 'btn text-white scale-110' : 'bg-white shadow-2xl text-zinc-500'} transition-all py-1.5 px-5 rounded-full`} key={i}>{ele.title}</button>
              ))}
            </div>}
            {(profile.documents.length < 1 || !profile.documents[0]?.is_approved) && <div className="flex gap-4 items-center">
              {FlightTripTypes.map((ele, i) => (
                <button
                  className={`bg-zinc-300 text-zinc-500 transition-all py-2 px-4 rounded-lg`} key={i}>{ele.title}</button>
              ))}
            </div>}
          </RouteItem>

          {(profile.documents.length < 1 || !profile.documents[0]?.is_approved) && <div className="flex items-center gap-5">
            <div className='flex items-center gap-2.5 text-zinc-500 bg-zinc-300 py-2 px-5 rounded-lg font-light'>
              <HiUsers />
              <PassengerSpan>
                <PassengerSpan1>Passengers</PassengerSpan1>
              </PassengerSpan>
            </div>
            <div className='flex items-center gap-2.5 text-zinc-500 bg-zinc-300 py-2 px-5 rounded-lg font-light'>
              <HiUsers />
              <PassengerSpan>
                <PassengerSpan1>Economy</PassengerSpan1>
              </PassengerSpan>
            </div>
          </div>
          }
          {profile.documents.length > 0 && profile.documents[0]?.is_approved &&
            <div className="flex items-center gap-5">
              <SelectPassengers
                flightData={flightData}
                setFlightData={setFlightData}
                tripState2={tripState2}
                setTripState2={setTripState2}
                handlePassengers={handlePassengers}
                togpass={togpass}
              />
              <RouteItem className="btn py-2 px-5 rounded-lg text-white">
                <SelectDiv onClick={() => setCabinState(!cabinState)} className='text-white'>
                  <span>{flightData.cabin || "economy"}</span>
                  <SlArrowDown />
                </SelectDiv>
                <SelectedDiv0
                  ref={togcabin}
                  className={`shadow-2xl ${cabinState ? "" : "hidden"} rounded-lg`}
                >
                  <div
                    onClick={() => handleCabinType("economy")}
                    className={`flex items-center capitalize py-2 px-6 gap-3 ${flightData.cabin === "economy" ? cabinactive : null
                      }`}
                  >

                    {flightData.cabin === "economy" && <BsCheckLg className='text-xl' />} economy
                  </div>
                  <div
                    onClick={() => handleCabinType("business")}
                    className={`flex items-center capitalize py-2 px-6 gap-3 ${flightData.cabin === "business" ? cabinactive : null
                      }`}
                  >

                    {flightData.cabin === "business" && <BsCheckLg className='text-xl' />} business class
                  </div>
                  <div
                    onClick={() => handleCabinType("first class")}
                    className={`flex items-center capitalize py-2 px-6 gap-3 ${flightData.cabin === "first class" ? cabinactive : null
                      }`}
                  >

                    {flightData.cabin === "first class" && <BsCheckLg className='text-xl' />} first class
                  </div>
                  <div
                    onClick={() => handleCabinType("premium")}
                    className={`flex items-center capitalize py-2 px-6 gap-3 ${flightData.cabin === "premium" ? cabinactive : null
                      }`}
                  >

                    {flightData.cabin === "premium" && <BsCheckLg className='text-xl' />} premium
                  </div>
                </SelectedDiv0>
              </RouteItem>
            </div>}
        </div>
        {/* flight cards main options */}
        {localTrip === 'multi-city' ? <FlightcardMultiOptions
          exploreFlight={exploreFlight}
          localTrip={localTrip}
          flightDatatype={flightData.flighttype}
        /> :
          <FlightcardMainOptions
            exploreFlight={exploreFlight}
            localTrip={localTrip}
            flightDatatype={flightData.flighttype}
            color="text-white"
          />}

        {location.pathname === "/selectFlight" && (
          <div className='mt-10'>
            <div
              onClick={handleFilterForMobile}
              className='text-indigo-600 lg:hidden cursor-pointer capitalize flex items-center gap-3'
            >
              filter flight results <SlArrowRight className='text-xs' />
            </div>
          </div>
        )}
      </CardHolder>
    </div>
    </>
  );
}


