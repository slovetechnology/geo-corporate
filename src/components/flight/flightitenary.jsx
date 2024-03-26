import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "/src/assets/images/close.svg";
import DepartPlaneIcon from "/src/assets/images/departureplane.svg";
import ReturnPlaneIcon from "/src/assets/images/returnplane.svg";
import { useSelector } from "react-redux";
import moment from "moment";
import { WebDateFormat, timeFormat } from "/src/components/functions";
import { FaMinus, FaTimes } from "react-icons/fa";
import { AlertError } from "/src/components/functions";
import Loading from "/src/components/Loading";
import { NairaSign } from "/src/components/functions";
import { TripName } from "/src/components/flight/Flightcard";
import { formatAirportName, formatAirportTitle } from "/src/components/functions";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";
import { Link } from "react-router-dom";
import { TYPES } from "/src/components/GeoNavbar";

function Flightitenary({ close, onDeals, changePage, singleFlight, setSingleFlight, currs }) {
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false)
  const [currentFlight, setCurrentFlight] = useState(currs)
  const [screen, setScreen] = useState(false)
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const { refundable, user } = useSelector(state => state.data)

  const ContinueBooking = () => {
    setSingleFlight(currentFlight);
    // if (user.account_type === TYPES[1].account_type) {
    //   // check if the average aging max has been exceeded
    //   if (user.average_aging > user.average_aging_max) {
    //     return setActiveTab(3)
    //   }
    //   if (user.post_paid_balance < currentFlight.amount) {
    //     return setActiveTab(4)
    //   }
    // }
    return changePage()
  }

  const ConfirmPricing = async () => {
    setLoading(true)
    try {
      const valid_flight = typeof singleFlight === "object" ? singleFlight : false;
      if (valid_flight) {
        const response = await HttpServices.get(`${ApiRoutes.flights.get_price}/${valid_flight.id}?showDeal=${onDeals}`)
        if (response.data.success) {
          const result = response.data.data
          if (result.priceChange) {
            setScreen(true)
            return setCurrentFlight(result)
          } else {
            setScreen(false)
            setSingleFlight(result)
            // if (user.account_type === TYPES[1].account_type) {
            //   // check if the average aging max has been exceeded
            //   if (user.average_aging > user.average_aging_max) {
            //     return setActiveTab(3)
            //   }
            //   if (user.post_paid_balance < currentFlight.amount) {
            //     return setActiveTab(4)
            //   }
            // }
            return changePage()
            // return changePage()
          }
        } else {
          AlertError(`This route is currently not available`)
          return close()
        }
      }
    } catch (error) {
      AlertError(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper Wrapper className="_blurSearchmodal">
      {loading && <Loading />}
      <ModalWrapper className="scrolls">
        <TopSection>
          <SmTitle>
            <Itenary
              className={activeTab === 1 ? "active" : ""}
              onClick={() => handleTabClick(1)}
            >
              Flight Itinerary
            </Itenary>
            <Itenary
              className={`${activeTab === 2 ? "active" : ""} text-slate-400`}
              onClick={() => handleTabClick(2)}
            >
              Fare Rules
            </Itenary>
          </SmTitle>

          <span onClick={() => close()}>
            <CloseImg src={CloseIcon} />
          </span>
        </TopSection>

        {activeTab === 1 && (
          localTrip !== 'multi-city' ?
            <div>
              <div className="scrolls" style={{ overflow: "auto", padding: "20px" }}>
                <div className="py-3 border-b mb-3">
                  <div className="flex gap-3">
                    <img src={DepartPlaneIcon} alt="DepartPlaneIcon" className="self-start" />
                    <div className="">
                      <div className="text-blue-600 capitalize font-semibold">departure flights</div>
                      {singleFlight.outbound.map((item, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          {item.airportFrom.city} <FaMinus /> {item.airportTo.city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* flight outbound */}
                {singleFlight.outbound.map((item, index) => (
                  <div key={index}>
                    <div className="flex gap-3 py-4 px-3">
                      <div className="w-[15%]">
                        <div className="text-xs text-center mb-3">{item.departureDate}</div>
                        <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="airlineDetails" className="w-8" /> </div>
                      </div>

                      <div className="w-[85%]">
                        <div className="grid grid-cols-5 gap-5">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                              {item.departureTime}
                              <FaMinus />
                              {item.arrivalTime}
                            </div>
                            <div className="text-slate-600 mb-4">
                              <span> {item.airportFrom.city} {item.airportFrom.name} {item.airportFrom.airportCode}  </span>
                              <FaMinus />
                              <span>  {item.airportTo.city} {item.airportTo.name} {item.airportTo.airportCode}  </span>
                            </div>
                            <div className="mb-3">
                              <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                              <div className="flex items-center mt-2 gap-6">
                                <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>
                                {/* <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div> */}
                              </div>
                            </div>
                            <div className="mb-3">
                              <span className="font-semibold capitalize">baggage: </span>
                              <span>{item.baggage}</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                            <div className="text-sm">{item.cabinType}</div>
                          </div>
                        </div>
                      </div>


                    </div>

                    {index === 0 && singleFlight.outbound.length > 0 && singleFlight.outbound.map((item, i) => (
                      typeof (item.layover) === 'number' &&
                      <div className="" key={i}>
                        <div className="my-5">
                          <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                            <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className=""> {item.airportTo.city} {item.airportTo.name} {item.airportTo.airportCode}  </span></div>
                            <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {singleFlight.inbound.length > 0 ?
                  <div>
                    <div className="py-3 border-b mb-3">
                      <div className="flex gap-3">
                        <img src={ReturnPlaneIcon} alt="ReturnPlaneIcon" className="self-start w-7" />
                        <div className="">
                          <div className="text-blue-600 capitalize font-semibold">return flights</div>
                          {singleFlight.inbound.map((item, index) => (
                            <div className="flex items-center gap-3" key={index}>
                              {item.airportFrom.city} <FaMinus /> {item.airportTo.city}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* flight inbound */}
                    {singleFlight.inbound.map((item, index) => (
                      <div key={index}>
                        <div className="flex gap-3 py-4 px-3">
                          <div className="w-[15%]">
                            <div className="text-xs text-center mb-3">{item.departureDate}</div>
                            <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="airlineDetails" className="w-8" /> </div>
                          </div>

                          <div className="w-[85%]">
                            <div className="grid grid-cols-5 gap-5">
                              <div className="col-span-3">
                                <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                                  {item.departureTime}
                                  <FaMinus />
                                  {item.arrivalTime}
                                </div>
                                <div className="text-slate-600 mb-4">
                                  <span> {item.airportFrom.city} {item.airportFrom.name} {item.airportFrom.airportCode} </span>
                                  <FaMinus />
                                  <span> {item.airportTo.city} {item.airportTo.name} {item.airportTo.airportCode} </span>
                                </div>
                                <div className="mb-3">
                                  <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                                  <div className="flex items-center mt-2 gap-6">
                                    {singleFlight.documentRequired && <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                                    {/* {singleFlight.documentRequired && <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <span className="font-semibold capitalize">baggage: </span>
                                  <span>{item.baggage}</span>
                                </div>
                              </div>
                              <div className="col-span-2">
                                <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                                <div className="text-sm">{item.cabinType}</div>
                              </div>
                            </div>
                          </div>


                        </div>

                        {index === 0 && singleFlight.inbound.length > 0 && singleFlight.inbound.map((item, i) => (
                          typeof (item.layover) === 'number' &&
                          <div className="" key={i}>
                            <div className="my-5">
                              <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                                <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className=""> {item.airportTo.city} {item.airportTo.name} {item.airportTo.airportCode}  </span></div>
                                <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  : null}
              </div>
              {screen ? <div className="py-7 px-4 bg-blue-900">
                <div className="grid grid-cols-5">
                  <div className='col-span-3'>
                    <div className=''>
                      <div className="text-slate-200 text-lg mb-3">This flight price has changed from  </div>
                      <div className="text-slate-100 text-xl"> <span className="text-orange-200">{NairaSign}{parseInt(singleFlight.amount)?.toLocaleString()}</span> to <span className="text-orange-200">{NairaSign}{parseInt(currentFlight.amount)?.toLocaleString()}</span> </div>
                    </div>
                  </div>
                  <div className='col-span-2 text-right'>
                    <button
                      className="_primary-btn"
                      onClick={ContinueBooking}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div> :
                <div className="py-7 px-4 bg-blue-900">
                  <div className="grid grid-cols-5">
                    <div className='col-span-3'>
                      <div className=''>
                        <div className="text-slate-300">Total Costs</div>
                        <div className="text-slate-100 text-xl">&#8358; {parseInt(singleFlight.amount).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className='col-span-2 text-right'>
                      <button
                        className="_primary-btn"
                        onClick={ConfirmPricing}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>}
            </div>
            :
            <div>
              {/* ====================================   testing multi flight search result   =========================================   */}
              <div className="scrolls" style={{ overflow: "auto", padding: "20px" }}>
                {singleFlight?.routes?.map((flight, index) => (
                  <div key={index}>
                    <div className="py-3 border-b mb-3">
                      <div className="flex gap-3">
                        <img src={index === 0 ? DepartPlaneIcon : ReturnPlaneIcon} alt="ReturnPlaneIcon" className="self-start w-7" />
                        <div className="">
                          <div className="text-blue-600 capitalize font-semibold">{index === 0 ? `departure flights` : `connecting flights`}</div>

                          <div className="flex items-center gap-3">
                            {flight?.segments[0]?.airportFrom} <FaMinus /> {flight?.segments[flight?.segments.length - 1]?.airportTo}
                          </div>
                        </div>
                      </div>
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
                        <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
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
              {screen ? <div className="py-7 px-4 bg-blue-900">
                <div className="grid grid-cols-5">
                  <div className='col-span-3'>
                    <div className=''>
                      <div className="text-slate-200 text-lg mb-3">This flight price has changed from  </div>
                      <div className="text-slate-100 text-xl"> <span className="text-orange-200">{NairaSign}{parseInt(singleFlight.amount)?.toLocaleString()}</span> to <span className="text-orange-200">{NairaSign}{parseInt(currentFlight.amount)?.toLocaleString()}</span> </div>
                    </div>
                  </div>
                  <div className='col-span-2 text-right'>
                    <button
                      className="_primary-btn"
                      onClick={ContinueBooking}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div> :
                <div className="py-7 px-4 bg-blue-900">
                  <div className="grid grid-cols-5">
                    <div className='col-span-3'>
                      <div className=''>
                        <div className="text-slate-300">Total Costs</div>
                        <div className="text-slate-100 text-xl">{NairaSign}{parseInt(singleFlight.amount).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className='col-span-2 text-right'>
                      <button
                        className="_primary-btn"
                        onClick={ConfirmPricing}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>}
            </div>
        )}


        {activeTab === 2 && (
          <div>
            <div style={{ padding: "20px" }}>
              <h4> Fare Rules </h4> <br />
              <ul>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> This ticket is <span className="font-bold">{refundable}</span> </li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div>  In the case of no-show, certain airlines do not permit refunds or ticket changes on a ticket.</li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> At least one adult is required to travel with one infant.</li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> For international trips, ensure you have the required valid visa before embarking on the journey. GeoTravel will not be liable for airport restrictions due to an invalid visa.</li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> Tickets to Kuala Lumpur should be within 14 days, not more than 14 days.</li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> For cancellation of bookings with insurance, there shall be no refund of the amount paid for insurance.</li>
                <li className='flex items-center gap-2 mb-2'> <div className='p-1 rounded-lg bg-teal-500 w-fit'></div> For travelers with medical issues, kindly contact us before booking.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="p-5">
            <div className="w-fit mx-auto text-8xl p-3 rounded-full border text-slate-300"> <FaTimes /> </div>
            <div className="text-center my-5 text-3xl">Oops!...</div>
            <div className="text-center mb-10">there seem to be some unpaid transactions that have exceeded agreed aging duration. Kindly click <Link to="/geo/transactions" className="text-mainblue">here</Link> to pay for the transactions</div>
          </div>
        )}
        {activeTab === 4 && (
          <div className="p-5">
            <div className="w-fit mx-auto text-8xl p-3 rounded-full border text-slate-300"> <FaTimes /> </div>
            <div className="text-center my-5 text-3xl">Unable to book Ticket</div>
            <div className="text-center">Please fund <Link to="/geo/transactions" className="text-mainblue">here</Link>  to offset you postpaid bill</div>
          </div>
        )}
      </ModalWrapper>{" "}
    </Wrapper>
  );
}

export default Flightitenary;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;
const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 0;
  width: 100%;
  max-width: 680px;
  background: #ffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  max-height: 600px;
  @media only screen and (max-width: 615px) {
    height: 100%;
    padding: 70px 10px;
  }
`;
const TopSection = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 20px;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  align-items: center;

  span {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efefef;
    cursor: pointer;
  }
`;
const Itenary = styled.h4`
  font-size: 16px;
  cursor: pointer;
`;
const CloseImg = styled.img``;

const SmTitle = styled.div`
  display: flex;
  gap: 20px;
`;