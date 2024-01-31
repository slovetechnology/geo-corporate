import React from "react";
import styled from "styled-components";
import CloseIcon from "/src/assets/images/close.svg";
import DepartPlaneIcon from "/src/assets/images/departureplane.svg";
import ReturnPlaneIcon from "/src/assets/images/returnplane.svg";
import moment from "moment";
import { WebDateFormat, formatAirport, formatAirportTitle, timeFormat } from "/src/components/functions";
import { FaMinus } from "react-icons/fa";

function BookedFlightItinerary(props) {
  const { flight } = props
  return (
    <Wrapper Wrapper className="_blurSearchmodal">
      <ModalWrapper>
        <TopSection>
          <SmTitle>
            <Itenary>
              Flight Itinerary
            </Itenary>
            <Itenary
              className={`hidden`}>
              Fare Rules
            </Itenary>
          </SmTitle>

          <span onClick={props.closeView}>
            <CloseImg src={CloseIcon} />
          </span>
        </TopSection>
        <div className="scrolls" style={{ overflow: "auto", padding: "20px" }}>
          {flight.outbound.length > 0 && <div className="py-3 border-b mb-3">
            <div className="flex gap-3">
              <img src={DepartPlaneIcon} alt="DepartPlaneIcon" className="self-start" />
              <div className="">
                <div className="text-blue-600 capitalize font-semibold">departure flights</div>
                {flight.outbound.map((item, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
                  </div>
                ))}
              </div>
            </div>
          </div>}
          {flight.outbound.map((item, index) => (
            <div key={index}>
              <div className="flex gap-3 py-4 px-3">
                <div className="w-[15%]">
                  <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                  <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="" className="w-8" /> </div>
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
                          {flight.documentRequired && <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                          {/* {flight.documentRequired && <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
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
            </div>
          ))}
          {flight.inbound?.length > 0 ? <div>
            <div className="py-3 border-b mb-3">
              <div className="flex gap-3">
                <img src={ReturnPlaneIcon} alt="ReturnPlaneIcon" className="self-start w-7" />
                <div className="">
                  <div className="text-blue-600 capitalize font-semibold">return flights</div>
                  {flight.outbound.map((item, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {flight.inbound.map((item, index) => (
              <div key={index}>
                <div className="flex gap-3 py-4 px-3">
                  <div className="w-[15%]">
                    <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                    <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="airlineDetails" className="w-8" /> </div>
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
                            {flight.documentRequired && <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                            {/* {flight.documentRequired && <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
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
              </div>
            ))}

          </div> : null}
          {flight?.routes?.length > 0 && flight.routes.map((item, index) => (
            <div key={index}>
              <div>
                <div className="py-3 border-b mb-3">
                  <div className="flex gap-3">
                    <img src={index === 0 ? DepartPlaneIcon : ReturnPlaneIcon} alt="ReturnPlaneIcon" className="self-start w-7" />
                    <div className="">
                      <div className="text-blue-600 capitalize font-semibold">{
                        index === 0 ? `return flights` : `Connecting flights`
                      }</div>
                      {flight.outbound.map((item, index) => (
                        <div className="flex items-center gap-3" key={index}>
                          {formatAirportTitle(item?.segments[0]?.airportFrom)} <FaMinus /> {formatAirportTitle(item?.segments[0]?.airportTo)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 py-4 px-3">
                <div className="w-[15%]">
                  <div className="text-xs text-center mb-3">{moment(item?.segments[0]?.departureTime).format(WebDateFormat)}</div>
                  <div className="w-fit mx-auto"> <img src={item?.segments[0]?.airlineDetails.logo} alt="airlineDetails" className="w-8" /> </div>
                </div>

                <div className="w-[85%]">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                        {moment(item?.segments[0]?.departureTime).format('h:mA')}
                        <FaMinus />
                        {moment(item?.segments[0]?.arrivalTime).format('h:mA')}
                      </div>
                      <div className="text-slate-600 mb-4">
                        <span> {formatAirport(item?.segments[0]?.airportFrom)} </span>
                        <FaMinus />
                        <span> {formatAirport(item?.segments[item.segments.length - 1]?.airportTo)} </span>
                      </div>
                      <div className="mb-3">
                        <div className="font-semibold">{item?.segments[item.segments.length - 1]?.airlineDetails.name} - {item?.segments[item.segments.length - 1]?.flightNumber}</div>
                        <div className="flex items-center mt-2 gap-6">
                          {flight.documentRequired && <div className="font-light">Class {item?.segments[item.segments.length - 1]?.bookingClass.length > 0 ? item?.segments[item.segments.length - 1]?.bookingClass : 'None'}</div>}
                          {/* {flight.documentRequired && <div className=" font-light">Seat {item?.segments[item.segments.length - 1]?.equipmentType.length > 0 ? item?.segments[item.segments.length - 1]?.equipmentType : 'None'}</div>} */}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="font-semibold capitalize">baggage: </span>
                        <span>{item?.segments[item.segments.length - 1]?.baggage}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-semibold text-sm mb-3">{timeFormat(item?.segments[item.segments.length - 1]?.duration)}</div>
                      <div className="text-sm">{item?.segments[item.segments.length - 1]?.cabinType}</div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>
      </ModalWrapper>{" "}
    </Wrapper>
  );
}

export default BookedFlightItinerary;

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
  height: 600px;
  @media only screen and (max-width: 615px) {
    height: 100%;
    padding: 70px 10px;
  }
`;

const CardWrapper = styled.div`
  background: #fff;
  padding: 20px;
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
const DepatureWrapper = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;
const DepaturetextWrapper = styled.div`
  display: grid;
  gap: 10px;
`;
const ReturnWrapper = styled.div`
  padding: 20px 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;
const Dept = styled.h4`
  font-size: 14px;
  color: #2e61e6;
`;
const Route = styled.h4``;
const FlightInfoWrappper = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`;
const SectionOne = styled.div`
  display: grid;
  place-items: center;
  @media only screen and (max-width: 550px) {
    margin-bottom: 15px;
  }
`;
const SmallTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 5px;
`;
const SmallSectionImg = styled.img`
  width: 32px;
  height: 32px;
`;
const SectionTwo = styled.div`
  @media only screen and (max-width: 550px) {
    margin-bottom: 15px;
  }
`;
const SectionThree = styled.div``;
const TextInfo = styled.div`
  font-size: 14px;
`;
const Layover = styled.div`
  background: #fef7ea;
  padding: 30px;
  font-size: 14px;
  font-weight: 600;
`;

const CloseImg = styled.img``;

const SmTitle = styled.div`
  display: flex;
  gap: 20px;
`;
