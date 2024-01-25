
import React from 'react'
import styled from 'styled-components'
import barcode from "/src/assets/icons/barcode.png";
import plane from "/src/assets/icons/plane.svg";
import moment from 'moment/moment'
import { SlEnvolope, SlPhone } from 'react-icons/sl';
import Barcode from 'react-barcode';
import { formatAirport, timeFormatBare } from '/src/components/utils/functions';
import { WebDateFormat } from '/src/components/utils/functions';

const ReservationTicket = (props) => {
  const { flight } = props

  return (
    <div> 
      {flight.passengers?.map((dataitem, i) => (
        <div key={i}>
          {flight.outbound.length > 0 && flight.outbound?.map((item, i) => (
            <FlightWrap key={i}>
              <ContentWrapper>
                <FlightContent className='relative'>
                  {!flight.ticketed && <div className="z-[1] absolute top-[50%] -rotate-12 -left-[10%] text-3xl md:text-4xl opacity-40 font-bold text-red-400 text-center w-full">This is only a reservation. <div className="mt-6">It is NOT a flight ticket</div> </div>}
                  <LeftContent className='relative'>
                    {/* <div className={`absolute capitalize text-sm py-1.5 px-4 shadow-xl top-2 right-2  ${moment().isAfter(item.expiresAt) ? 'bg-orange-300' : 'bg-green-300'}`}>{moment().isAfter(item.expiresAt) ? 'expired' : 'not expired'}</div> */}
                    <div className="grid grid-cols-2">
                      <ImageWrapper>
                        <Img src={item.airlineDetails.logo} /> <Smdate> {item.airlineDetails.name} </Smdate>
                      </ImageWrapper>
                      <div className="text-right">
                        {!flight.ticketed && <div className="">{moment().isAfter(flight.expiresAt) ? 'Expired' : 'Expires'}: {moment(flight.expiresAt).format(WebDateFormat)}</div>}
                      </div>
                    </div>
                    <FirstSection>
                      <SectionOne>
                        <Los> {item.airportFrom} </Los>
                        <LocationWrapper>
                          <Time>{moment(item.departureTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item.airportFrom)}
                          </Location>
                        </LocationWrapper>
                      </SectionOne>
                      <SectionTwo>
                        <div className="flex items-center gap-4">
                          <div className="border w-fit rounded-lg p-1.5 text-xs">{flight.outboundStops} {`Stop${flight.outboundStops === 1 ? '' : 's'}`}</div>
                          <div className="border w-fit rounded-xl p-1.5 text-xs">{item.duration <= 60 ? `${item.duration}m` : timeFormatBare(item.duration)}</div>
                        </div>
                        <StopsImg src={plane} />
                      </SectionTwo>
                      <SectionThree>
                        <Los> {item.airportTo} </Los>
                        <LocationWrapper>
                          <Time>{moment(item.arrivalTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item.airportTo)}
                          </Location>
                        </LocationWrapper>
                      </SectionThree>
                    </FirstSection>
                    <div className="flex items-center justify-center mt-2 gap-6">
                      {flight.documentRequired && <div className="font-light tex-xs">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                      {/* {flight.documentRequired && <div className=" font-light tex-xs">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                    </div>
                    <div className='mb-3 grid grid-cols-3 gap-3'>
                      <PassContent>
                        <PassUser>Passenger Name</PassUser>
                        <PassInfo className='capitalize'>{`${dataitem.title} ${dataitem.firstName} ${dataitem.lastName}`}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Email</PassUser>
                        <PassInfo>{dataitem.email}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Contact</PassUser>
                        <PassInfo>{dataitem.phoneNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Booking Reference</PassUser>
                        <PassInfo>{flight.reference}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Baggage Allowance</PassUser>
                        <PassInfo>{item.baggage}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Boarding Time</PassUser>
                        <PassInfo>{moment(item.departureTime).format('DD-MM-YYYY h:mA')}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Ticket Number</PassUser>
                        <PassInfo>{item.flightNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Document Issue Date</PassUser>
                        <PassInfo>{moment(flight.createdAt).format('DD-MM-YYYY')}</PassInfo>
                      </PassContent>
                    </div>
                    <div className="flex text-sm text-slate-800 gap-2 items-center">
                      <div>Agency: </div>
                      <div className="">GEO TRAVELS & TOURS LTD
                        Plot 2b Oyinkan Abayomi Street
                        Ikoyi
                        LAGOS.</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlPhone />
                        <div className="">+2349092470278, +2349092469962</div>
                      </div>
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlEnvolope />
                        <div className=""> geotravelsandtourltd@gmail.com </div>
                      </div>
                    </div>
                    <div className='text-xs text-slate-500'>Data Protection Notice: Your personal data will be processed in accordance with the applicable carrier’s privacy policy and, if your booking is made via a reservation system provider (“GDS” ), with its privacy policy. These are available at http://www.iatatravelcenter.com/privacy or from the carrier or GDS directly. You should read this documentation, which applies to your booking and specifies, for example, how your personal data is collected, stored, used, disclosed and transferred. (applicable for interline carriage).</div>
                  </LeftContent>
                  <RightContent>
                    {/* <BarcodeImg src={barcode} alt="barcode" /> */}
                    {flight.ticketed && <div className="barcodeimg"><Barcode
                      value={`${flight.bookingCode}`} /></div>}
                  </RightContent>
                </FlightContent>
              </ContentWrapper>
            </FlightWrap>
          ))}
          {flight.inbound.length > 0 && flight.inbound?.map((item, i) => (
            <FlightWrap key={i}>
              <ContentWrapper>
                <FlightContent className='relative'>
                  {!flight.ticketed && <div className="z-[1] absolute top-[50%] -rotate-12 -left-[10%] text-3xl md:text-4xl opacity-40 font-bold text-red-400 text-center w-full">This is only a reservation. <div className="mt-6">It is NOT a flight ticket</div> </div>}
                  <LeftContent className='relative'>
                    {/* <div className={`absolute capitalize text-sm py-1.5 px-4 shadow-xl top-2 right-2  ${moment().isAfter(item.expiresAt) ? 'bg-orange-300' : 'bg-green-300'}`}>{moment().isAfter(item.expiresAt) ? 'expired' : 'not expired'}</div> */}
                    <div className="grid grid-cols-2">
                      <ImageWrapper>
                        <Img src={item.airlineDetails.logo} /> <Smdate> {item.airlineDetails.name} </Smdate>
                      </ImageWrapper>
                      <div className="text-right">
                        {!flight.ticketed && <div className="">{moment().isAfter(flight.expiresAt) ? 'Expired' : 'Expires'}: {moment(flight.expiresAt).format(WebDateFormat)}</div>}
                      </div>
                    </div>
                    <FirstSection>
                      <SectionOne>
                        <Los> {item.airportFrom} </Los>
                        <LocationWrapper>
                          <Time>{moment(item.departureTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item.airportFrom)}
                          </Location>
                        </LocationWrapper>
                      </SectionOne>
                      <SectionTwo>
                        <div className="flex items-center gap-4">
                          <div className="border w-fit rounded-lg text-xs">{flight.outboundStops} {`Stop${flight.outboundStops === 1 ? '' : 's'}`}</div>
                          <div className="border w-fit rounded-xl text-xs">{item.duration <= 60 ? `${item.duration}m` : timeFormatBare(item.duration)}</div>
                        </div>
                        <StopsImg src={plane} className='rotate-180' />
                      </SectionTwo>
                      <SectionThree>
                        <Los> {item.airportTo} </Los>
                        <LocationWrapper>
                          <Time>{moment(item.arrivalTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item.airportTo)}
                          </Location>
                        </LocationWrapper>
                      </SectionThree>
                    </FirstSection>
                    <div className="flex items-center justify-center mt-2 gap-6">
                      {flight.documentRequired && <div className="font-light tex-xs">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                      {/* {flight.documentRequired && <div className=" font-light tex-xs">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                    </div>
                    <div className='mb-3 grid grid-cols-3 gap-3'>
                      <PassContent>
                        <PassUser>Passenger Name</PassUser>
                        <PassInfo className='capitalize'>{`${dataitem.title} ${dataitem.firstName} ${dataitem.lastName}`}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Email</PassUser>
                        <PassInfo>{dataitem.email}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Contact</PassUser>
                        <PassInfo>{dataitem.phoneNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Booking Reference</PassUser>
                        <PassInfo>{flight.reference}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Baggage Allowance</PassUser>
                        <PassInfo>{item.baggage}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Boarding Time</PassUser>
                        <PassInfo>{moment(item.departureTime).format('h:mA')}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Ticket Number</PassUser>
                        <PassInfo>{item.flightNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Document Issue Date</PassUser>
                        <PassInfo>{moment(flight.createdAt).format('DD-MM-YYYY')}</PassInfo>
                      </PassContent>
                    </div>
                    <div className="flex text-sm text-slate-800 gap-2 items-center">
                      <div>Agency: </div>
                      <div className="">GEO TRAVELS & TOURS LTD
                        Plot 2b Oyinkan Abayomi Street
                        Ikoyi
                        LAGOS.</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlPhone />
                        <div className="">+2349092470278, +2349092469962</div>
                      </div>
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlEnvolope />
                        <div className=""> geotravelsandtourltd@gmail.com </div>
                      </div>
                    </div>
                    <div className='text-xs text-slate-500'>Data Protection Notice: Your personal data will be processed in accordance with the applicable carrier’s privacy policy and, if your booking is made via a reservation system provider (“GDS” ), with its privacy policy. These are available at http://www.iatatravelcenter.com/privacy or from the carrier or GDS directly. You should read this documentation, which applies to your booking and specifies, for example, how your personal data is collected, stored, used, disclosed and transferred. (applicable for interline carriage).</div>
                  </LeftContent>
                  <RightContent>
                    {flight.ticketed && <div className="barcodeimg">
                      <Barcode
                        value={`${flight.bookingCode}`} />
                    </div>}
                  </RightContent>
                </FlightContent>
              </ContentWrapper>
            </FlightWrap>
          ))}
          {flight.routes?.map((item, i) => (
            <FlightWrap key={i}>
              <ContentWrapper>
                <FlightContent className='relative'>
                  {!flight.ticketed && <div className="z-[1] absolute top-[50%] -rotate-12 -left-[10%] text-3xl md:text-4xl opacity-40 font-bold text-red-400 text-center w-full">This is only a reservation. <div className="mt-6">It is NOT a flight ticket</div> </div>}
                  <LeftContent className='relative'>
                    <div className="grid grid-cols-2">
                      <ImageWrapper>
                        <Img src={item.segments[0]?.airlineDetails?.logo} /> <Smdate> {item.segments[0]?.airlineDetails?.name} </Smdate>
                      </ImageWrapper>
                      <div className="text-right">
                        {!flight.ticketed && <div className="">{moment().isAfter(flight.expiresAt) ? 'Expired' : 'Expires'}: {moment(flight.expiresAt).format(WebDateFormat)}</div>}
                      </div>
                    </div>
                    <FirstSection>
                      <SectionOne>
                        <Los> {item?.segments[0]?.airportFrom} </Los>
                        <LocationWrapper>
                          <Time>{moment(item?.segments[0]?.departureTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item?.segments[0]?.airportFrom)}
                          </Location>
                        </LocationWrapper>
                      </SectionOne>
                      <SectionTwo>
                        <div className="flex items-center gap-4">
                          <div className="border w-fit rounded-lg p-1.5 text-xs">{item.totalSegmentStops} {`Stop${item.totalSegmentStops === 1 ? '' : 's'}`}</div>
                          <div className="border w-fit rounded-xl p-1.5 text-xs">{item.totalSegmentDuration <= 60 ? `${item.totalSegmentDuration}m` : timeFormatBare(item.totalSegmentDuration)}</div>
                        </div>
                        <StopsImg src={plane} />
                      </SectionTwo>
                      <SectionThree>
                        <Los> {item?.segments[item.segments.length - 1]?.airportTo} </Los>
                        <LocationWrapper>
                          <Time>{moment(item?.segments[item.segments.length - 1]?.arrivalTime).format('h:ma')}</Time>
                          <Location>
                            {formatAirport(item?.segments[item.segments.length - 1]?.airportTo)}
                          </Location>
                        </LocationWrapper>
                      </SectionThree>
                    </FirstSection>
                    <div className="flex items-center justify-center mt-2 gap-6">
                      {flight.documentRequired && <div className="font-light tex-xs">Class {item?.segments[item.segments.length - 1]?.bookingClass.length > 0 ? item?.segments[item.segments.length - 1]?.bookingClass : 'None'}</div>}
                      {/* {flight.documentRequired && <div className=" font-light tex-xs">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                    </div>
                    <div className='mb-3 grid grid-cols-3 gap-3'>
                      <PassContent>
                        <PassUser>Passenger Name</PassUser>
                        <PassInfo className='capitalize'>{`${dataitem.title} ${dataitem.firstName} ${dataitem.lastName}`}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Email</PassUser>
                        <PassInfo>{dataitem.email}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Passenger Contact</PassUser>
                        <PassInfo>{dataitem.phoneNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Booking Reference</PassUser>
                        <PassInfo>{flight.reference}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Baggage Allowance</PassUser>
                        <PassInfo>{item?.segments[item.segments.length - 1]?.baggage}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Boarding Time</PassUser>
                        <PassInfo>{moment(item?.segments[item.segments.length - 1]?.departureTime).format('DD-MM-YYYY h:mA')}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Ticket Number</PassUser>
                        <PassInfo>{item?.segments[item.segments.length - 1]?.flightNumber}</PassInfo>
                      </PassContent>
                      <PassContent>
                        <PassUser>Document Issue Date</PassUser>
                        <PassInfo>{moment(flight.createdAt).format('DD-MM-YYYY')}</PassInfo>
                      </PassContent>
                    </div>
                    <div className="flex text-sm text-slate-800 gap-2 items-center">
                      <div>Agency: </div>
                      <div className="">GEO TRAVELS & TOURS LTD
                        Plot 2b Oyinkan Abayomi Street
                        Ikoyi
                        LAGOS.</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlPhone />
                        <div className="">+2349092470278, +2349092469962</div>
                      </div>
                      <div className="flex text-sm text-slate-800 gap-2 items-center">
                        <SlEnvolope />
                        <div className=""> geotravelsandtourltd@gmail.com </div>
                      </div>
                    </div>
                    <div className='text-xs text-slate-500'>Data Protection Notice: Your personal data will be processed in accordance with the applicable carrier’s privacy policy and, if your booking is made via a reservation system provider (“GDS” ), with its privacy policy. These are available at http://www.iatatravelcenter.com/privacy or from the carrier or GDS directly. You should read this documentation, which applies to your booking and specifies, for example, how your personal data is collected, stored, used, disclosed and transferred. (applicable for interline carriage).</div>
                  </LeftContent>
                  <RightContent>
                    {/* <BarcodeImg src={barcode} alt="barcode" /> */}
                    {flight.ticketed && <div className="barcodeimg"><Barcode
                      value={`${flight.bookingCode}`} /></div>}
                  </RightContent>
                </FlightContent>
              </ContentWrapper>
            </FlightWrap>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ReservationTicket

const ContentWrapper = styled.div`
  background: #fff;
  margin: 10px 0;
`;

// @media only screen and (max-width: 870px) {
//   transform: rotate(90deg) scale(0.7);
// } ;

const FlightContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
`;
const LeftContent = styled.div`
  border-right: 2px dotted #e1e3e4;
  padding: 40px 5px;
  @media only screen and (max-width: 870px) {
    background: #fff;
  } ;
`;
const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 5px;
  @media only screen and (max-width: 870px) {
    background: #fff;
  } ;
`;
const BarcodeImg = styled.img`
  width: 100%;
`;
const FirstSection = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  border-bottom: 2px solid #eaeaea;
`;
const SectionOne = styled.div`
  display: flex;
  align-items: center;
`;
const ImageWrapper = styled.div`
  padding-right: 10px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;
const Smdate = styled.h4`
  font-size: 16px;
`;
const LocationWrapper = styled.div`
  width: 185px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
`;
const Los = styled.h2`
  font-size: 30px;
`;
const Time = styled.h4`
  font-size: 14px;
`;
const Location = styled.div`
  font-size: 14px;
`;
const SubLocation = styled.span`
  color: #777;
  padding-left: 2px;
`;
const SectionTwo = styled.div`
  width: 10rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const StopsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Stops = styled.div`
  width: 47px;
  height: 20px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #b4b5c4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;
const StopsImg = styled.img`
  margin: 5px 0;
`;
const SectionThree = styled.div`
  display: flex;
  align-items: center;
`;

// const PassInfoWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   margin-top: 10px;
//   gap: 0.3rem;
// `;
const PassContent = styled.div`
padding: 1rem;
word-wrap: break-word;
`;
const PrintTicketDesktop = styled.button`
  width: 100%;
  max-width: 159px;
  height: 54px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  width: 163px;
  height: 54px;
  background: #2e61e6;
  border-radius: 27px;
  cursor: pointer;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlightWrap = styled.div`
  margin: 0 auto;
  padding: 30px 10px;
`;
const PassInfo = styled.h4`
  font-size: 14px;
`;
const PassUser = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 550;
`;