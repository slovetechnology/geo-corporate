import Flightnavbar from "/src/components/flight/flightnavbar";
import React, { useState } from "react";
import styled from "styled-components";
import SinglePassenger from "/src/components/flight/SinglePassenger";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { WebDateFormat, formatAirport, formatAirportTitle, timeFormat } from "/src/components/functions";
import { FaArrowLeft, FaMinus } from "react-icons/fa";
import DepartPlaneIcon from "/src/assets/images/departureplane.svg";
import ReturnPlaneIcon from "/src/assets/images/returnplane.svg";
import Costcard from "/src/components/flight/costcard";
import { BackToTop } from "/src/components/functions";
import { TripName } from "/src/components/flight/flightcard";
import { formatAirportName } from "/src/components/functions";


function Tripsummary({ changePage, flightDetails }) {
  const { passengers } = useSelector(state => state.data)
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [activeTab, setActiveTab] = useState({ tag: 1, text: 'Next' });

  const flightTitle = () => {
    if (localTrip !== 'multi-city') return (
      flightDetails.outbound.map((item, index) => (
        <div className="flex items-center gap-3" key={index}>
          {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
        </div>
      ))
    )
  }
  const flightTitle2 = () => {
    if (localTrip !== 'multi-city') return (
      flightDetails.inbound.map((item, index) => (
        <div className="flex items-center gap-3" key={index}>
          {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
        </div>
      ))
    )
    return (
      flightDetails.routes?.map((item, index) => (
        <div className="flex items-center gap-3" key={index}>
          {formatAirportTitle(item.segments[0]?.airportFrom)} <FaMinus /> {formatAirportTitle(item.segments[item.segments?.length - 1]?.airportTo)}
        </div>
      ))
    )
  }


  return (
    <div>
      <Wrap>
        <WrapContent>Trip Summary</WrapContent>
      </Wrap>
      <FlightNav>
        <Flightnavbar active={3} />
      </FlightNav>
      <Wrapper>
        <SectionWrapper>
          <LeftSection>
            <Title>{flightTitle()}</Title>
            <Title>{flightTitle2()}</Title>

            {localTrip !== 'multi-city' ? <div className="bg-white mb-5">
              <div className="p-3 border-b mb-3">
                <div className="grid grid-cols-2">
                  <div className="flex gap-3">
                    <img src={DepartPlaneIcon} alt="DepartPlaneIcon" className="self-start" />
                    <div className="">
                      <div className="text-blue-600 capitalize font-semibold">departure flights</div>
                      {flightTitle()}
                    </div>
                  </div>
                  <div className="">
                    <div onClick={() => changePage(1)} className="flex items-center justify-end mb-5 gap-2 text-blue-600 cursor-pointer w-fit ml-auto">
                      <FaArrowLeft className="text-xs" />
                      <span className="text-lg">Back</span>
                    </div>
                  </div>
                </div>
              </div>
              {flightDetails.outbound.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-3 py-4 px-3">
                    <div className="w-[15%]">
                      <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                      <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt={"airlineLogo"} className="w-8" /> </div>
                    </div>
                    <div className="w-[85%]">
                      <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-3">
                          <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                            {moment(item.departureTime).format('h:mA')}
                            <FaMinus />
                            {moment(item.arrivalTime).format('h:mA')}
                          </div>
                          <div className="text-slate-600 mb-4">
                            <span> {formatAirport(item.airportFrom)} </span>
                            <FaMinus />
                            <span> {formatAirport(item.airportTo)} </span>
                          </div>
                          <div className="mb-3">
                            <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                            <div className="flex items-center mt-2 gap-6">
                              <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>
                              {/* <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                          <div className="text-sm">{item.cabinType}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index === 0 && flightDetails.outbound.length > 0 && flightDetails.outbound.map((item, i) => (
                    typeof (item.layover) === 'number' &&
                    <div className="w-11/12 mx-auto" key={i}>
                      <div className="my-5">
                        <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                          <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className="">{formatAirport(item.airportTo)} </span></div>
                          <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {flightDetails.inbound.length > 0 && <div className="p-3 border-b border-t mb-3">
                <div className="flex gap-3">
                  <img src={ReturnPlaneIcon} alt="returnPlaneIcon" className="self-start w-7" />
                  <div className="">
                    <div className="text-blue-600 capitalize font-semibold">return flights</div>
                    {flightTitle2()}
                  </div>
                </div>
              </div>}
              {flightDetails.inbound.map((item, k) => (
                <div key={k}>
                  <div className="flex gap-3 py-4 px-3">
                    <div className="w-[15%]">
                      <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                      <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="img" className="w-8" /> </div>
                    </div>
                    <div className="w-[85%]">
                      <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-3">
                          <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                            {moment(item.departureTime).format('h:mA')}
                            <FaMinus />
                            {moment(item.arrivalTime).format('h:mA')}
                          </div>
                          <div className="text-slate-600 mb-4">
                            <span> {formatAirport(item.airportFrom)} </span>
                            <FaMinus />
                            <span> {formatAirport(item.airportTo)} </span>
                          </div>
                          <div className="mb-3">
                            <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                            <div className="flex items-center mt-2 gap-6">
                              <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>
                              {/* <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                          <div className="text-sm">{item.cabinType}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {k === 0 && flightDetails.inbound.length > 0 && flightDetails.inbound.map((item, i) => (
                    typeof (item.layover) === 'number' &&
                    <div className="w-11/12 mx-auto" key={i}>
                      <div className="my-5">
                        <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                          <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className="">{formatAirport(item.airportTo)} </span></div>
                          <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div> :
              <div className="bg-white mb-5">
                {flightDetails?.routes?.map((flight, index) => (
                  <div key={index}>
                    <div className="p-3 border-b border-t mb-3 grid grid-cols-2">
                      <div className="flex gap-3">
                        <img src={index === 0 ? DepartPlaneIcon : ReturnPlaneIcon} alt="returnPlaneIcon" className="self-start w-7" />
                        <div className="">
                          <div className="text-blue-600 capitalize font-semibold">{index === 0 ? `departure flights` : `Connecting Flights flights`}</div>
                          <div className="flex items-center gap-3">
                            {flight?.segments[0]?.airportFrom} <FaMinus /> {flight?.segments[flight?.segments.length - 1]?.airportTo}
                          </div>
                        </div>
                      </div>
                        {index === 0 && <div className="">
                          <div onClick={() => changePage(1)} className="flex items-center justify-end mb-5 gap-2 text-blue-600 cursor-pointer w-fit ml-auto">
                            <FaArrowLeft className="text-xs" />
                            <span className="text-lg">Back</span>
                          </div>
                        </div>}
                    </div>
                    <div className="flex gap-3 py-4 px-3">
                      <div className="w-[15%]">
                        <div className="text-xs text-center mb-3">{moment(flight?.segments[0]?.departureTime).format(WebDateFormat)}</div>
                        <div className="w-fit mx-auto"> <img src={flight?.segments[0]?.airlineDetails.logo} alt="airlineDetails" className="w-8" /> </div>
                      </div>
                      <div className="w-[85%]">
                        <div className="grid grid-cols-5 gap-5">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                              {moment(flight?.segments[0]?.departureTime).format('h:mA')}
                              <FaMinus />
                              {moment(flight?.segments[flight?.segments.length - 1]?.arrivalTime).format('h:mA')}
                            </div>
                            <div className="text-slate-600 mb-4">
                              <span> {formatAirportTitle(flight?.segments[0]?.airportFrom)} {formatAirportName(flight?.segments[0]?.airportFrom)} {flight?.segments[0]?.airportFrom}  </span>
                              <FaMinus />
                              <span> {formatAirportTitle(flight?.segments[flight?.segments.length - 1]?.airportTo)} {formatAirportName(flight?.segments[flight?.segments.length - 1]?.airportTo)} {flight?.segments[flight?.segments.length - 1]?.airportTo}  </span>
                            </div>
                            <div className="mb-3">
                              <div className="font-semibold">{flight?.segments[0]?.airlineDetails.name} - {flight?.segments[0]?.flightNumber}</div>
                              <div className="flex items-center mt-2 gap-6">
                                <div className="font-light">Class {flight?.segments[0]?.bookingClass.length > 0 ? flight?.segments[0]?.bookingClass : 'None'}</div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <span className="font-semibold capitalize">baggage: </span>
                              <span>{flight?.segments[0]?.baggage}</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-semibold text-sm mb-3">{timeFormat(flight?.segments[0]?.duration)}</div>
                            <div className="text-sm">{flight?.segments[0]?.cabinType}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {flight.segments.length > 1 && flight.segments.map((item, i) => (
                      (i + 1 !== flight.segments.length) && <div className="my-5" key={i}>
                        <div className="bg-orange-100/40 border border-orange-400 p-3 w-11/12 mx-auto rounded-lg text-sm grid grid-cols-7">
                          <div className="col-span-5">
                            <div className="font-bold">{formatAirportTitle(item.airportTo)} {formatAirportName(item.airportTo)}</div>
                          </div>
                          <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            }
            <PassengerInfoWrapper>
              <PassTitleWrapper>
                <PassTitle>Passengers Information</PassTitle>
                <Details className="cursor-pointer" onClick={() => { changePage(1); BackToTop() }}>Edit Details</Details>
              </PassTitleWrapper>
              <div className=''>
                {passengers.map((item, i) => (
                  <SinglePassenger key={i} user={item} />
                ))}
              </div>
            </PassengerInfoWrapper>
          </LeftSection>

          <RightSection>
            <Costcard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              changePage={changePage}
              flightDetails={flightDetails}
            />
          </RightSection>
        </SectionWrapper>
      </Wrapper>
      {/* <Footer /> */}
    </div>
  );
}

export default Tripsummary;

const FlightNav = styled.div`
  background: #171b4a;
  padding: 20px;
  width: 100%;
`;
const Wrap = styled.div``;
const WrapContent = styled.div`
  margin: 0 auto;
  max-width: 1160px;
  padding: 20px;
  background: #fff;
  font-size: 16px;
  font-weight: 600;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  background: #f4f8fa;
`;

const SectionWrapper = styled.div`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
  @media only screen and (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;
const LeftSection = styled.div``;
const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 45px;
`;
const RightSection = styled.div``;

// PASSENGER INFORMATION

const PassengerInfoWrapper = styled.div`
  background: #fff;
  padding: 30px;
  margin: 40px 0;
`;

const PassTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 25px;
`;
const PassTitle = styled.h4`
  font-size: 18px;
`;
const Details = styled.h4`
  font-size: 14px;
  color: #2e61e6;
`;
