// import Flightnavbar from "/src/components/flight/flightnavbar";
// import React, { useState, useRef } from "react";
// import styled from "styled-components";
// import barcode from "/src/assets/images/barcode.png";
// import plane from "/src/assets/images/plane.svg";
// import tick from "/src/assets/images/tick.svg";

// function Success({ changePage }) {
//   // const {flightDetails, flightBooked} = useSelector(state => state.data)
//   const printref = useRef()
//   // const flightDetails = {
//   //   id: 'aer_a37c4c08-da7b-40b9-a8b8-5aba1d3697dd',
//   //   fareBasis: {},
//   //   amount: 41042.15,
//   //   travelersPrice: [
//   //     {
//   //       adult: 38333
//   //     }
//   //   ],
//   //   priceSummary: [
//   //     {
//   //       passengerType: 'adult',
//   //       totalPrice: 41042.15,
//   //       quantity: 1
//   //     }
//   //   ],
//   //   currency: 'NGN',
//   //   totalDuration: 75,
//   //   outbound: [
//   //     {
//   //       operatingAirline: 'AJ',
//   //       cabinType: 'ECONOMY',
//   //       departureTime: '6:45:00 AM',
//   //       airlineDetails: {
//   //         logo: 'https://image.tiqwa.com/airlines/AJ.png',
//   //         name: 'Aero Contractors',
//   //         code: 'AJ'
//   //       },
//   //       bookingClass: {},
//   //       overnight: true,
//   //       duration: 75,
//   //       marketingAirline: 'AJ',
//   //       layover: {},
//   //       flightNumber: 'N2-121',
//   //       arrivalTime: '8:00:00 AM',
//   //       equipmentType: {},
//   //       marriageGroup: {},
//   //       baggage: '1x 20kg checkin allowance',
//   //       airportFrom: {
//   //         airportCode: 'LOS',
//   //         name: 'Murtala Muhammed',
//   //         city: 'Lagos',
//   //         country: 'Nigeria'
//   //       },
//   //       airportTo: {
//   //         airportCode: 'ABV',
//   //         name: 'Nnamdi Azikiwe Intl',
//   //         city: 'Abuja',
//   //         country: 'Nigeria'
//   //       },
//   //       departureDate: '4/13/2023',
//   //       arrivalDate: '4/13/2023'
//   //     }
//   //   ],
//   //   inbound: [],
//   //   totalOutboundDuration: 75,
//   //   totalInboundDuration: {},
//   //   outboundStops: 0,
//   //   inboundStops: 0,
//   //   pricing: {
//   //     markup: {
//   //       markupType: 'fixed',
//   //       markupValue: 0
//   //     },
//   //     payable: 41042.1505
//   //   }
//   // }
//   // const flightBooked = {
//   //   passengers: [
//   //     {
//   //       dob: '1996-08-21',
//   //       documents: {
//   //         documentType: 'passport',
//   //         expiryDate: '2025-04-18',
//   //         holder: true,
//   //         issuingCountry: 'NGN',
//   //         issuingDate: '2021-04-13',
//   //         nationalityCountry: 'Antarctica',
//   //         number: 'A868659594040'
//   //       },
//   //       email: 'slo@gmail.com',
//   //       firstName: 'george',
//   //       gender: 'male',
//   //       lastName: 'Godslove',
//   //       passengerType: 'adult',
//   //       phoneNumber: '08079606505050',
//   //       title: 'mr'
//   //     }
//   //   ],
//   //   ticketed: false,
//   //   cancelled: false,
//   //   inbound: [],
//   //   outbound: [
//   //     {
//   //       airlineDetails: {
//   //         code: 'VM',
//   //         logo: 'https://image.tiqwa.com/airlines/VM.png',
//   //         name: 'Max Air'
//   //       },
//   //       airportFrom: 'LOS',
//   //       airportTo: 'ABV',
//   //       arrivalTime: '2023-04-13T18:25:00',
//   //       baggage: '1x 20kg checkin allowance',
//   //       cabinType: 'Economy',
//   //       departureTime: '2023-04-13T17:20:00',
//   //       duration: 65,
//   //       flightNumber: 'VM1601',
//   //       marketingAirline: 'VM',
//   //       operatingAirline: 'VM',
//   //       overnight: false
//   //     }
//   //   ],
//   //   travelersPrice: [
//   //     {
//   //       adult: 50000
//   //     }
//   //   ],
//   //   _id: '6436bc9098f69966c885a2e1',
//   //   bookingCode: 'GSGY4PWSLWP8KHGO',
//   //   flightId: 'mxa_8a2ba236-3e89-4d43-842e-a7132b6e7214',
//   //   amount: 50500,
//   //   bookableSeats: 8,
//   //   createdAt: '2023-04-12T14:13:36.841Z',
//   //   currency: 'NGN',
//   //   documentRequired: false,
//   //   expiresAt: '2023-04-12T14:33',
//   //   inboundStops: '0',
//   //   priceChange: false,
//   //   pricing: {
//   //     markup: {
//   //       markupType: 'fixed',
//   //       markupValue: 0
//   //     },
//   //     payable: 50500
//   //   },
//   //   reference: 'TW-QARSNGJD69',
//   //   totalDuration: 65,
//   //   totalOutboundDuration: 65,
//   //   updatedAt: '2023-04-12T14:13:36.916Z',
//   //   __v: 0,
//   //   invoice: '6436bc9098f69966c885a2e3'
//   // }

//   const handlePrint = () => {
//     var prtContent = document.getElementById("printref");
//     var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
//     WinPrint.document.write(prtContent.inerHTML);
//     WinPrint.document.close();
//     WinPrint.focus();
//     WinPrint.print();
//     WinPrint.close();
//   }
//   return (
//     <div>
//       {/* <Navbar /> */}
//       <Wrap>
//         <WrapContent>Booking Confirmation</WrapContent>
//       </Wrap>
//       <FlightNav>
//         <Flightnavbar active={5} />
//       </FlightNav>
//       <Wrapper>
//         <SuccessWrapper>
//           <SuccessImg src={tick} />
//           <SucWrap>
//             <SuccessTitle>Booking Successful</SuccessTitle>
//             <PassUser>
//               An email has been sent to you containing your ticket and boarding
//               pass
//             </PassUser>
//           </SucWrap>
//         </SuccessWrapper>
//         {flightDetails.outbound.map((item, i) => (
//               <FlightWrap ref={printref} id="printref" key={i}>
//                 <ContentWrapper>
//                   <FlightContent>
//                     <LeftContent>
//                       <ImageWrapper>
//                         <Img src={item.airlineDetails.logo} /> <Smdate> {item.airlineDetails.name} </Smdate>
//                       </ImageWrapper>
//                       <FirstSection>
//                         <SectionOne>
//                           <Los> {item.airportFrom.airportCode} </Los>
//                           <LocationWrapper>
//                             <Time>{item.departureTime}</Time>
//                             <Location>
//                               {item.airportFrom.city}
//                               <SubLocation>
//                                 {item.airportFrom.name} (
//                                 {item.airportFrom.airportCode})
//                               </SubLocation>
//                             </Location>
//                           </LocationWrapper>
//                         </SectionOne>
//                         {/* <SectionTwo>
//                       <StopsWrapper>
//                         <Stops> 2 Stops </Stops> <Stops> 2 Stops </Stops>
//                       </StopsWrapper>
//                       <StopsImg src={plane} /> <Lay> Layover~2 h </Lay>
//                     </SectionTwo> */}
//                         <SectionTwo>
//                           <StopsWrapper>
//                             <Stops>{flightDetails.outboundStops} Stops</Stops>
//                             <Stops>{flightDetails.inboundStops} Stops</Stops>
//                           </StopsWrapper>
//                           <StopsImg src={plane} />
//                           <Lay>Layover ~ 2h</Lay>
//                         </SectionTwo>
//                         <SectionThree>
//                           <LocationWrapper>
//                             <Time>{item.arrivalTime}</Time>
//                             <Location>
//                               {item.airportTo.city}
//                               <SubLocation>
//                                 {item.airportTo.name} (
//                                 {item.airportTo.airportCode})
//                               </SubLocation>
//                             </Location>
//                           </LocationWrapper>
//                         </SectionThree>
//                       </FirstSection>
//                       <PassInfoWrapper>
//                         <PassContent>
//                           <PassUser>Passenger Name</PassUser>
//                           <PassInfo>{flightBooked?.passengers[0].firstName} {flightBooked?.passengers[0].lastName}</PassInfo> 
//                         </PassContent>
//                         <PassContent>
//                           <PassUser>Booking Reference</PassUser>
//                           <PassInfo>{flightBooked.reference}</PassInfo>
//                         </PassContent>
//                         <PassContent>
//                           <PassUser>Baggage Allowance</PassUser>
//                           <PassInfo>{item.baggage}</PassInfo>
//                         </PassContent>
//                         <PassContent>
//                           <PassUser>Boarding Time</PassUser>
//                           <PassInfo>{item.departureTime }</PassInfo>
//                         </PassContent>
//                         <PassContent>
//                           <PassUser>Ticket Number</PassUser>
//                           <PassInfo>{item.flightNumber}</PassInfo>
//                         </PassContent>
//                       </PassInfoWrapper>
//                     </LeftContent>
//                     <RightContent>
//                       <BarcodeImg src={barcode} alt="barcode" />
//                     </RightContent>
//                   </FlightContent>
//                 </ContentWrapper>
//                 <PrintTicketDesktop onClick={handlePrint} className='my-10'>Print Ticket</PrintTicketDesktop>
//               </FlightWrap>
//         ))}
//         <PrintTicket>Print Ticket</PrintTicket>
//       </Wrapper>
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default Success;

// const FlightNav = styled.div`
//   background: #171b4a;
//   padding: 20px;
//   width: 100%;
// `;
// const Wrap = styled.div``;
// const WrapContent = styled.div`
//   margin: 0 auto;
//   max-width: 1160px;
//   padding: 20px;
//   background: #fff;
//   font-size: 16px;
//   font-weight: 600;
//   display: none;

//   @media only screen and (max-width: 768px) {
//     display: block;
//   }
// `;
// const Wrapper = styled.div`
//   background: #f4f8fa;
// `;
// const FlightWrap = styled.div`
//   max-width: 1160px;
//   margin: 0 auto;
//   padding: 30px 20px;
//   @media only screen and (max-width: 870px) {
//     height: 70vh;
//   }

//   @media only screen and (max-width: 690px) {
//     height: 80vh;
//     padding: 0;
//   } ;
// `;
// const SuccessWrapper = styled.div`
//   max-width: 1160px;
//   margin: 0 auto;
//   padding: 30px 0;
//   display: flex;
//   align-items: center;
// `;
// const SuccessImg = styled.img``;
// const SucWrap = styled.div``;
// const SuccessTitle = styled.h4`
//   font-size: 24px;
// `;
// const ContentWrapper = styled.div`
//   background: #fff;
//   margin: 10px 0;
//   @media only screen and (max-width: 870px) {
//     transform: rotate(90deg) scale(0.7);
//   } ;
// `;

// const FlightContent = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 150px;
// `;
// const LeftContent = styled.div`
//   border-right: 2px dotted #e1e3e4;
//   padding: 40px 20px;
//   @media only screen and (max-width: 870px) {
//     background: #fff;
//   } ;
// `;
// const RightContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   padding: 30px 20px;
//   @media only screen and (max-width: 870px) {
//     background: #fff;
//   } ;
// `;
// const BarcodeImg = styled.img`
//   width: 100%;
// `;
// const FirstSection = styled.div`
//   display: flex;
//   margin-top: 30px;
//   align-items: center;
//   justify-content: center;
//   padding-bottom: 40px;
//   border-bottom: 2px solid #eaeaea;
// `;
// const SectionOne = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const ImageWrapper = styled.div`
//   padding-right: 20px;
//   display: flex;
//   align-items: center;
//   width: 100%;
// `;
// const Img = styled.img`
//   width: 32px;
//   height: 32px;
//   margin-right: 10px;
// `;
// const Smdate = styled.h4`
//   font-size: 16px;
// `;
// const LocationWrapper = styled.div`
//   width: 185px;
//   padding: 0 10px;
//   display: flex;
//   flex-direction: column;
// `;
// const Los = styled.h2`
//   font-size: 30px;
// `;
// const Time = styled.h4`
//   font-size: 14px;
// `;
// const Location = styled.div`
//   font-size: 14px;
// `;
// const SubLocation = styled.span`
//   color: #b4b5c4;
//   padding-left: 2px;
// `;
// const SectionTwo = styled.div`
//   padding: 0 30px;
//   display: flex;
//   flex-direction: column;
// `;
// const StopsWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
// const Stops = styled.div`
//   width: 47px;
//   height: 20px;
//   background: #ffffff 0% 0% no-repeat padding-box;
//   border: 1px solid #b4b5c4;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 10px;
// `;
// const StopsImg = styled.img`
//   margin: 10px 0;
// `;
// const Lay = styled.div`
//   font-size: 10px;
//   text-align: center;
// `;
// const SectionThree = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const PassInfoWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   margin-top: 20px;
// `;
// const PassContent = styled.div`
//   margin: 10px 0;
// `;
// const PassUser = styled.div`
//   font-size: 14px;
//   margin-bottom: 5px;
// `;
// const PassInfo = styled.h4`
//   font-size: 14px;
// `;

// const PrintTicket = styled.button`
//   width: 100%;
//   max-width: 159px;
//   height: 54px;
//   border: none;
//   outline: none;
//   color: #fff;
//   font-size: 14px;
//   width: 163px;
//   height: 54px;
//   background: #2e61e6;
//   border-radius: 27px;
//   cursor: pointer;
//   margin: 20px auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   display: none;
//   @media only screen and (max-width: 870px) {
//     display: flex;
//   }
// `;
// const PrintTicketDesktop = styled.button`
//   width: 100%;
//   max-width: 159px;
//   height: 54px;
//   border: none;
//   outline: none;
//   color: #fff;
//   font-size: 14px;
//   width: 163px;
//   height: 54px;
//   background: #2e61e6;
//   border-radius: 27px;
//   cursor: pointer;
//   margin: 20px auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   @media only screen and (max-width: 870px) {
//     display: none;
//   }
// `;

import React from 'react'

const success = () => {
  return (
    <div>
      success
    </div>
  )
}

export default success

