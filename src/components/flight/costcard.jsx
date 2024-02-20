
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import downplane from "/src/assets/images/downplane.svg";

import { calcTotalInboundDuration, calcTotalOutboundDuration, formatAirportSubtitle, timeFormatBare } from "/src/components/functions";
import moment from "moment";
import { BackToTop } from "/src/components/functions";
import { TripName } from "./Flightcard";
import { onlinesitename } from "/src/services/Geoapi";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";
import Swal from "sweetalert2";
import { AlertError } from "/src/components/functions";
import { AuthPostApi, MainApi } from "/src/services/Geoapi";
import Loading from "/src/components/Loading";
import {useNavigate} from 'react-router-dom'
import Cookies from "js-cookie";
import { TYPES } from "/src/components/GeoNavbar";
import { FlightMode } from "/src/components/functions";

function Costcard(props) {
  const { activeTab, changePage, flightDetails } = props
  const { selectedAddons, user, passengers } = useSelector(state => state.data)
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const mode = Cookies.get(FlightMode)

  const HandleButtonEvent = async () => {
    if(user.account_type === TYPES[0].account_type || mode === TYPES[0].account_type) {
      changePage(3)
      return BackToTop()
    }
    BookFlightTicket()
  }
  
  // book the flight now in order to generate the ivoice for accepting payments
  const BookFlightTicket = async () => {
    if (!booked) {
      const addonsArr = []

      selectedAddons.map((item) => {
        return addonsArr.push(item._id)
      })
      const passengersData = {
        addons: [
          ...addonsArr
        ],
        bookAtDealPrice: flightDetails.deal?._id ? true : false,
        invoiceUrl: `${onlinesitename}flight-invoice/`,
        passengers: [...passengers]
      }

      setLoading(true)
      try {
        const response = await HttpServices.post(
          `${ApiRoutes.flights.book_flight}/${flightDetails.id}`,
          passengersData
        )
        const { data } = response
        if (data.success) {
          const payload = data
          const invoiceRes = await HttpServices.get(
            `${ApiRoutes.invoice.get_invoice_details}/${payload.data.invoice}`
          )
          setBooked(true)
          if (invoiceRes.data.success) {
            BankTransfer({ bookedData: payload.data, invoiceData: invoiceRes.data.data })
          }
        } else {
          Swal.fire({
            title: 'Request failed',
            text: `${data.message?.message || data.message?.description}`,
            icon: 'error',
            showConfirmButton: false
          })
        }
      } catch (error) {
        AlertError(`${error.message}`)
      } finally {
        setLoading(false)
      }
    } else {
      Swal.fire({
        title: 'Request failed',
        text: 'Looks like an action has already been taken on this ticket',
        icon: 'error',
        showConfirmButton: false
      })
    }
  }
  
  const BankTransfer = async ({ bookedData, invoiceData }) => {
    setLoading(true);
    try {
      const info = {
        invoiceCode: invoiceData.invoiceCode,
        paymentChannel: "TRANSFER",
        customer: {
          email: passengers[0].email || "",
          name: `${passengers[0].title} ${passengers[0].firstName} ${passengers[0].lastName}` || "",
          phoneCode: passengers[0].phoneNumber.split(' ')[0] || Dialcodes[0].dial_code,
          phoneNumber: `${passengers[0].phoneCode}${passengers[0].phoneNumber}`
        },
        redirectUrl: `${onlinesitename}geo/verify-payment/${bookedData.bookingCode}?expand=addons,invoice`,
      };
      await HttpServices.post(ApiRoutes.payment.initialize_payment, info);

      // call geo payment api for prepaid account on bank transfer
      if(user.account_type === 'POSTPAID') {
        const formbody = {
          amount: parseInt(invoiceData.amount),
          email: passengers[0].email || "",
          name: `${passengers[0].title} ${passengers[0].firstName} ${passengers[0].lastName}` || "",
          phonenumber: passengers[0].phoneNumber.split(' ')[1] || "",
          booking_code: bookedData.bookingCode,
          status: 'APPROVED UNPAID',
          reference: bookedData.reference,
          module: 'POSTPAID',
          organization: user.id
        }
         await AuthPostApi(MainApi.auth.payment, formbody)
      }
      localStorage.removeItem('passengers')
      navigate(`/geo/verify-payment/${bookedData.bookingCode}?expand=addons,invoice`,)
    } catch (error) {
      return AlertError(`${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
     {loading && <Loading />}
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
                  <div className={`w-full ${index === 0 ? `` : `ml-4`}`}>
                    <GeneralTitle>{index === 0 ? `Depart` : `Connecting Flights`}</GeneralTitle>
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
              {flightDetails?.deal?._id && <PriceHold>
                <Per>Discount</Per>
                <CostPer>{flightDetails.deal.discountValue}% off</CostPer>
              </PriceHold>}
            </PassHolder>
          </PassengersWrapper>
        </BottomSection>
        <AmountWrapper>
          <Total>Actual Total Amount </Total>
          <TotalCost>&#8358; {parseInt(flightDetails.amount).toLocaleString()}</TotalCost>
        </AmountWrapper>

        {activeTab.tag !== 3 ? <AmountBtn className='flex items-center gap-3' onClick={HandleButtonEvent}> {(user.account_type === TYPES[0].account_type || mode === TYPES[0].account_type) ? activeTab?.text : 'Book Now'} </AmountBtn> : null}
      </RightContentItem>
    </div>
  );
}

export default Costcard;

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