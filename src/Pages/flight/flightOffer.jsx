import { WebDateFormat, calcTotalInboundDuration, calcTotalOutboundDuration, timeFormatBare } from '/src/components/functions'
import downplane from "/src/assets/images/downplane.svg";
import plane from "/src/assets/images/plane.svg";
import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components';
import AllPagination from '/src/components/AllPagination';
import avif from '/src/assets/images/vif.jpg'
import { TripName } from '/src/components/flight/Flightcard';
import { FilterMultiCityRefundables, formatAirportName, formatAirportTitle } from '/src/components/functions';
import { NairaSign } from '/src/components/functions';
// import AllAirlines from './AllAirlines';

const FlightOffer = (props) => {
  const { handleOpen, flightList, loadflight, sendFilteration, flightError, minprice, earlytimed } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [flightPerPage,] = useState(20)
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [tags, setTags] = useState('')
  const cs = `cursor-pointer border-b-4 p-4 border-white transition-all`

  const SetupTags = (val, data) => {
    if (tags !== val) {
      sendFilteration(val, data)
      setTags(val)
    } else {
      sendFilteration('all', data)
      setTags('')
    }
  }

  // run pagination on the list
  const indexOfLastPage = currentPage * flightPerPage
  const indexOfFirstPage = indexOfLastPage - flightPerPage
  const currentFlights = flightList.slice(indexOfFirstPage, indexOfLastPage)

  const paginatePage = (num) => {
    setCurrentPage(num)
  }

  return (
    <>
    <div className="">
      {loadflight ?
        <div className=''>
          <div className='mb-3 bg-slate-200 animate-pulse rounded-lg h-[5rem]'></div>
          {new Array(10).fill().map((item, i) => (
            <div key={i} className='mb-3 bg-slate-200 animate-pulse rounded-lg h-[10rem]'></div>
          ))}
        </div> :
        <div>
          {/* <AllAirlines
              AirlineFrontendFilter={AirlineFrontendFilter}
              flightList={flightList2}
            /> */}
          <div className="mb-10">
            <div className='bg-white grid shadow-xl rounded-lg grid-cols-2 lg:grid-cols-3'>
              <div onClick={() => SetupTags('amount', minprice)} className={`${cs} ${tags === 'amount' ? 'bg-mainblue text-white' : ''}`}>
                <div className='font-semibold'>Cheapest</div>
                {minprice ? <div>From {NairaSign}{minprice?.toLocaleString()}</div> : <div></div>}
              </div>
              <div onClick={() => SetupTags('time', earlytimed)} className={`${cs} ${tags === 'time' ? 'bg-mainblue text-white' : ''}`}>
                <div className='font-semibold'>Earliest</div>
                <div className='text-sm'>{timeFormatBare(earlytimed)}</div>
              </div>
            </div>
          </div>
          {Array.isArray(currentFlights) && currentFlights.length > 0 ? <>
            {localTrip !== 'multi-city' ? currentFlights?.map((flight, i) => (
              <div className='mb-3 bg-white tf relative shadow-lg rounded-lg' key={i}>
                <div className="grid grid-cols-1 md:grid-cols-8">
                  <div className="md:col-span-6">

                    {flight?.outbound?.length > 0 && <div className="border-b-2 border-dotted last:border-none py-4 px-2.5">
                      <div className="flex gap-2">
                        <div className="w-[15%]">
                          <div className="text-center w-fit mx-auto"> {flight?.outbound?.length > 0 && <img src={flight?.outbound[0]?.airlineDetails.logo} alt={"airlineLogo"} className="w-8" />} </div>
                          <div className="text-center font-semibold text-slate-600 text-xs">{flight?.outbound[0]?.airlineDetails.name}</div>
                          <div className="text-xs text-center">{moment(flight.outbound[0]?.departureDate).format(WebDateFormat)}</div>
                          <div className="w-fit mx-auto md:hidden"><img src={downplane} alt="downPlane" /></div>
                        </div>
                        <div className="w-[85%] grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="">
                            <div className="text-base md:text-xs">{flight.outbound[0]?.departureTime}</div>
                            <div className="font-semilbold text-base md:text-sm">
                              {flight.outbound[0]?.airportFrom.city}
                              <span className="text-slate-500"> {flight.outbound[0]?.airportFrom.name} ({flight.outbound[0]?.airportFrom.airportCode}) </span>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex items-center gap-4">
                              <div className="border w-fit rounded-lg p-1.5 text-xs">{flight.outboundStops} {`Stop${flight.outboundStops === 1 ? '' : 's'}`}</div>
                              <div className="border w-fit rounded-xl p-1.5 text-xs">{calcTotalOutboundDuration(flight)}</div>
                              {/* <div className="border w-fit rounded-xl p-1.5 text-xs">{flight.outbound[0]?.duration <= 60 ? `${flight.outbound[0]?.duration}m` : timeFormatBare(flight.outbound[0]?.duration)}</div> */}
                            </div>
                            <div className=""> <img src={plane} alt="plane" className="" /> </div>
                          </div>
                          <div className="">
                            <div className="text-base md:text-xs">{flight.outbound[flight?.outbound?.length - 1]?.arrivalTime}</div>
                            <div className="font-semilbold text-base md:text-sm">
                              {flight.outbound[flight?.outbound?.length - 1]?.airportTo.city}
                              <span className="text-slate-500"> {flight.outbound[flight?.outbound?.length - 1]?.airportTo.name} ({flight.outbound[flight?.outbound?.length - 1]?.airportTo.airportCode}) </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                    {/* =========== */}
                    {flight?.inbound?.length > 0 && <div>
                      <div className="border-b-2 border-dotted last:border-none py-4 px-2.5">
                        <div className="flex gap-2">
                          <div className="w-[15%]">
                            <div className="text-center w-fit mx-auto"> <img src={flight.inbound[0]?.airlineDetails.logo} alt={"airlineLogo"} className="w-8" /> </div>
                            <div className="text-center font-semibold text-slate-600 text-xs">{flight.inbound[0]?.airlineDetails.name}</div>
                            <div className="text-xs text-center">{moment(flight.inbound[0]?.departureDate).format(WebDateFormat)}</div>
                            <div className="w-fit mx-auto md:hidden"><img src={downplane} className='rotate-180' alt="downPlane" /></div>
                          </div>
                          <div className="w-[85%] grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="">
                              <div className="text-base md:text-xs">{flight.inbound[0]?.departureTime}</div>
                              <div className="font-semilbold text-base md:text-sm">
                                {flight.inbound[0]?.airportFrom.city}
                                <span className="text-slate-500"> {flight.inbound[0]?.airportFrom.name} ({flight.inbound[0]?.airportFrom.airportCode}) </span>
                              </div>
                            </div>
                            <div className="">
                              <div className="flex items-center gap-4">
                                <div className="border w-fit rounded-lg p-1.5 text-xs">{flight.inboundStops} {`Stop${flight.inboundStops === 1 ? '' : 's'}`}</div>
                                <div className="border w-fit rounded-xl p-1.5 text-xs">{calcTotalInboundDuration(flight)}</div>
                                {/* <div className="border w-fit rounded-xl p-1.5 text-xs">{flight.inbound[0]?.duration <= 60 ? `${flight.inbound[0]?.duration}m` : timeFormatBare(flight.inbound[0]?.duration)}</div> */}
                              </div>
                              <div className=""> <img src={plane} alt="plane" className="rotate-180" /> </div>
                            </div>
                            <div className="">
                              <div className="text-base md:text-xs">{flight.inbound[flight?.inbound?.length - 1]?.arrivalTime}</div>
                              <div className="font-semilbold text-base md:text-sm">
                                {flight.inbound[flight?.inbound?.length - 1]?.airportTo.city}
                                <span className="text-slate-500"> {flight.inbound[flight?.inbound?.length - 1]?.airportTo.name} ({flight.inbound[flight?.inbound?.length - 1]?.airportTo.airportCode}) </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  </div>
                  {flight?.outbound?.length > 0 && <div className="md:col-span-2 border-t md:border-l-2 md:border-t-0">
                    <div className="flex items-center flex-col py-4 gap-3 md:gap-5 w-full h-full justify-center">
                      {flight.deal?._id && <div className="bg-teal-300 text-sm rounded-lg shadow-xl uppercase py-1.5 px-5">{flight.deal?.discountValue}% off</div>}
                      <div className="text-xl font-semibold">
                        &#8358;
                        {parseInt(flight.pricing.payable).toLocaleString()}
                      </div>
                      <div className="text-slate-600 capitalize">{flight?.inbound?.length > 0 ? flight.inbound[0].refundable ? 'refundable' : 'non-refundable' : flight.outbound[flight?.outbound?.length - 1].refundable ? 'refundable' : 'non-refundable'}</div>
                      <button onClick={() => handleOpen(flight)} className="bg-mainblue py-3 px-10 text-sm rounded-lg text-white capitalize">view</button>
                    </div>
                  </div>}
                </div>
              </div>
            ))
              :
              currentFlights?.map((flightRoute, i) => (
                <div className='mb-3 bg-white tf relative shadow-lg rounded-lg' key={i}>
                  <div className="grid grid-cols-1 md:grid-cols-8">
                    <div className="md:col-span-6">

                      {flightRoute?.routes?.map((flight, index) => (
                        <div key={index} className="border-b-2 border-dotted last:border-none py-4 px-2.5">
                          <div className="flex gap-2">
                            <div className="w-[15%]">
                              <div className="text-center w-fit mx-auto"> <img src={flight?.segments[0]?.airlineDetails?.logo} alt={"airlineLogo"} className="w-8" /> </div>
                              <div className="text-xs text-slate-600 text-center font-semibold">{flight?.segments[0]?.airlineDetails?.name}</div>
                              <div className="text-xs text-center">{moment(flight?.segments[0]?.departureTime).format(WebDateFormat)}</div>
                              <div className="w-fit mx-auto md:hidden"><img src={downplane} alt="downPlane" /></div>
                            </div>
                            <div className="w-[85%] grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="">
                                <div className="text-base md:text-xs">{moment(flight?.segments[0]?.departureTime).format('hh:mmA')}</div>
                                <div className="font-semilbold text-base md:text-sm">
                                  {formatAirportTitle(flight?.segments[0]?.airportFrom)}
                                  <span className="text-slate-500"> {formatAirportName(flight?.segments[0]?.airportFrom)} ({flight?.segments[0]?.airportFrom}) </span>
                                </div>
                              </div>
                              <div className="">
                                <div className="flex items-center gap-4">
                                  <div className="border w-fit rounded-lg p-1.5 text-xs">{flight?.totalSegmentStops} {`Stop${flight?.totalSegmentStops === 1 ? '' : 's'}`}</div>
                                  <div className="border w-fit rounded-xl p-1.5 text-xs">{timeFormatBare(flight?.totalSegmentDuration)}</div>
                                </div>
                                <div className=""> <img src={plane} alt="plane" className="" /> </div>
                              </div>
                              <div className="">
                                <div className="text-base md:text-xs">{moment(flight?.segments[flight.segments.length - 1]?.arrivalTime).format('hh:mmA')}</div>
                                <div className="font-semilbold text-base md:text-sm">
                                  {formatAirportTitle(flight?.segments[flight.segments.length - 1]?.airportTo)}
                                  <span className="text-slate-500"> {formatAirportName(flight?.segments[flight.segments.length - 1]?.airportTo)} ({flight?.segments[flight.segments.length - 1]?.airportTo}) </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="md:col-span-2 border-t md:border-l-2 md:border-t-0">
                      <div className="flex items-center flex-col py-4 gap-3 md:gap-5 w-full h-full justify-center">
                        {/* {flight.deal?._id && <div className="bg-teal-300 text-sm rounded-lg shadow-xl uppercase py-1.5 px-5">{flight.deal?.discountValue}% off</div>} */}
                        <div className="text-xl font-semibold">
                          &#8358;
                          {parseInt(flightRoute.pricing.payable).toLocaleString()}
                        </div>
                        <div className="text-slate-600 capitalize">{FilterMultiCityRefundables(flightRoute)}</div>
                        <button onClick={() => handleOpen(flightRoute)} className="bg-mainblue py-3 px-10 text-sm rounded-lg text-white capitalize">view</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </> :
            <div>
              <CardContent>
                <CardImg src={avif} />
                <Note>We couldn't find your desired trip</Note>
                <Info className='!text-lg !text-zinc-500'>
                  {flightError ? flightError : `Adjust your arrival or departure to a nearby airport <br /> Try arriving or departing one day earlier or later.`}
                </Info>
              </CardContent>
            </div>
          }
          <AllPagination
            flightPerPage={flightPerPage}
            totalFlights={flightList.length}
            paginatePage={paginatePage}
            currentPage={currentPage}
          />
        </div>
      }
    </div>
    </>
  )
}

export default FlightOffer

const CardContent = styled.div`
  background: #fff;
  padding: 50px 30px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CardImg = styled.img`
  margin-bottom: 30px;
`;
const Note = styled.h4`
  font-size: 18px;
  font-weight: 700;
`;
const Info = styled.div`
  font-size: 12px;
  text-align: center;
`;