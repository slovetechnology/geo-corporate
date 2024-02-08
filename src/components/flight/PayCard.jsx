
import { AlertWarning, calcTotalInboundDuration, calcTotalOutboundDuration, formatAirportSubtitle } from "/src/components/functions";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import downplane from "/src/assets/images/downplane.svg";
import { TripName } from "./Flightcard";
import { timeFormatBare } from "/src/components/functions";



function PayCard(props) {
  const { activeTab, flightDetails } = props
  const { selectedAddons } = useSelector(state => state.data)
  const localTrip = JSON.parse(localStorage.getItem(TripName))

  const HandleButtonEvent = async () => {
    try {
      props.BookFlightTicket()
    } catch (error) {
      return AlertWarning(error)
    }
  }
  return (
    <div>
      <RightContentItem>
        <CostPrice>Cost</CostPrice>
        {localTrip !== 'multi-city' ? <TopSection>
          <TopWrap>
            <InfoTitle>Flight Details</InfoTitle>
            {/* <Flight onClick={backtoFlight}>Edit Flight</Flight> */}
          </TopWrap>
          <FlightSection>
            <ImgSection>
              <Img src={downplane} />
            </ImgSection>
            <div className="w-full">
              <GeneralTitle>Depart</GeneralTitle>
              <div>
                <DepartureWrapper className="border-b-2 w-full border-dotted pb-2 mb-2">
                  <DepatureItems className="w-full">
                    <DepatureInfo className='text-xs'>
                      {moment(flightDetails.outbound[0]?.departureTime).format('h:mA')} — {moment(flightDetails.outbound[flightDetails.outbound.length - 1]?.arrivalTime).format('h:mA')} ({calcTotalOutboundDuration(flightDetails)})
                      <div>
                        {formatAirportSubtitle(flightDetails.outbound[0]?.airportFrom)}
                        —{" "}
                        {formatAirportSubtitle(flightDetails.outbound[flightDetails.outbound.length - 1]?.airportTo)}
                      </div>
                      <div className='uppercase text-sm'>{flightDetails.outbound[0]?.cabinType} Class</div>
                    </DepatureInfo>
                  </DepatureItems>
                  <DepatureImg
                    src={flightDetails.outbound[0]?.airlineDetails.logo}
                    alt={flightDetails.outbound[0]?.airlineDetails.name} />
                </DepartureWrapper>
              </div>
            </div>
          </FlightSection>
          {flightDetails.inbound.length > 0 && <FlightSection>
            {flightDetails.inbound.length > 0 && <ImgSection>
              <Img src={downplane} className="rotate-180" />
            </ImgSection>}
            <div className="w-full">
              <GeneralTitle>Arrive</GeneralTitle>
              <div>
                <DepartureWrapper className="border-b-2 w-full border-dotted pb-2 mb-2">
                  <DepatureItems className="w-full">
                    <DepatureInfo className='text-xs'>
                      {moment(flightDetails.inbound[0]?.departureTime).format('h:mA')} — {moment(flightDetails.inbound[flightDetails.inbound.length - 1]?.arrivalTime).format('h:mA')} ({calcTotalInboundDuration(flightDetails)})
                      <div>
                        {formatAirportSubtitle(flightDetails.inbound[0]?.airportFrom)}
                        —{" "}
                        {formatAirportSubtitle(flightDetails.inbound[flightDetails.inbound.length - 1]?.airportTo)}
                      </div>
                      <div className='uppercase text-sm'>{flightDetails.inbound[0]?.cabinType} Class</div>
                    </DepatureInfo>
                  </DepatureItems>
                  <DepatureImg
                    src={flightDetails.inbound[0]?.airlineDetails.logo}
                    alt={flightDetails.inbound[0]?.airlineDetails.name} />
                </DepartureWrapper>
              </div>
            </div>
          </FlightSection>}
        </TopSection> :
          <TopSection>
            <TopWrap>
              <InfoTitle>Flight Details</InfoTitle>
              {/* <Flight onClick={backtoFlight}>Edit Flight</Flight> */}
            </TopWrap>
            {flightDetails.routes?.length > 1 &&
              flightDetails.routes?.map((flight, index) => (
                <FlightSection key={index}>
                  {index === 0 ? <ImgSection>
                    <Img src={downplane} />
                  </ImgSection> : <div className="-ml-[1.3rem]">
                    <Img src={downplane} className="rotate-180" />
                  </div>}
                  <div className={`w-full ${index === 0 ? '' : `ml-4`}`}>
                    <GeneralTitle>{index === 0 ? `Depart` : 'Connecting Flights'}</GeneralTitle>
                    <div>
                      <DepartureWrapper className="border-b-2 w-full border-dotted pb-2 mb-2">
                        <DepatureItems className="w-full">
                          <DepatureInfo className='text-xs'>
                            {moment(flight?.segments[0]?.departureTime).format('h:mA')}
                            —
                            {moment(flight?.segments[flight?.segments.length - 1]?.arrivalTime).format('h:mA')} ({timeFormatBare(flight.totalSegmentDuration)})
                            <div>
                              {formatAirportSubtitle(flight.segments[0]?.airportFrom)}
                              —{" "}
                              {formatAirportSubtitle(flight.segments[flight.segments.length - 1]?.airportTo)}
                            </div>
                            <div className='uppercase text-sm'>{flight.segments[0]?.cabinType} Class</div>
                          </DepatureInfo>
                        </DepatureItems>
                        <DepatureImg
                          src={flight.segments[0]?.airlineDetails.logo}
                          alt={flight.segments[0]?.airlineDetails.name} />
                      </DepartureWrapper>
                    </div>
                  </div>
                </FlightSection>
              ))}
          </TopSection>}
        <BottomSection>
          <PassengersWrapper>
            <div className='font-semibold text-slate-700 mb-3 text-lg'>Flight Base Fare</div>
            <PassHolder>
              <Hold>
                <div className='block w-full'>
                  {flightDetails.priceSummary.map((item, i) => (
                    <div className='flex items-center justify-between' key={i}>
                      <div className='capitalize last:mb-5'>{item.passengerType} x {item.quantity}</div>
                      <div className='text-sm'>&#8358; {parseInt(item.totalPrice).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

              </Hold>
              {selectedAddons.map((item, i) => (
                <PriceHold key={i}>
                  <Per>{item.name}: </Per>
                  <CostPer>&#8358; {(item.price / 100).toLocaleString()}</CostPer>
                </PriceHold>
              ))}
              {flightDetails.deal?._id && <PriceHold>
                <Per>Discount</Per>
                <CostPer>{flightDetails.deal.discountValue}% off</CostPer>
              </PriceHold>}
            </PassHolder>
          </PassengersWrapper>
        </BottomSection>
        <AmountWrapper>
          <Total>Actual Total Amount </Total>
          <TotalCost>&#8358; {parseInt(flightDetails.pricing.payable).toLocaleString()}</TotalCost>
        </AmountWrapper>

        {activeTab.tag !== 3 ? <AmountBtn className='flex items-center gap-3' onClick={HandleButtonEvent}> {activeTab?.text} </AmountBtn> : null}
      </RightContentItem>
    </div>
  );
}

export default PayCard;

const RightContentItem = styled.div`
  background: #fff;
  padding: 20px 30px;
`;
const BottomSection = styled.div`
  padding: 10px 0;
  border-bottom: 3px dotted #eaeaea;
`;
const CostPrice = styled.h4`
  border-bottom: 3px solid #eaeaea;
  padding: 10px 0;
`;
const PassengersWrapper = styled.div``;
const PassHolder = styled.div`
  margin: 25px 0;
`;
const Hold = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PriceHold = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Per = styled.div`
  font-size: 14px;
`;
const CostPer = styled.div`
  font-size: 14px;
`;

const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-bottom: 3px dotted #eaeaea;
`;
const AmountBtn = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  width: 187px;
  height: 54px;
  background: #2e61e6;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
`;
const Total = styled.h4`
  font-size: 14px;
`;
const TotalCost = styled.h4`
  font-size: 20px;
`;
const GeneralTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 5px;
`;
const InfoTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;
const TopSection = styled.div``;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;
const FlightSection = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;
const ImgSection = styled.div``;
const Img = styled.img`
  padding-right: 20px;
`;
const DepartureWrapper = styled.div`
  display: flex;
`;
const DepatureItems = styled.div``;
const DepatureInfo = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;
const DepatureImg = styled.img`
  width: 32px;
  height: 32px;
`;