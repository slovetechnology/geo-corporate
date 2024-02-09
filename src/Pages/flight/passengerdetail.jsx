import Flightnavbar from "/src/components/flight/flightnavbar";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import downplane from "/src/assets/images/downplane.svg";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSelectedAddons, storePassenger } from '/src/app/dataSlice';
import PassengersFlightForm from "/src/components/flight/PassengersFlightForm";
import moment from "moment";
import { AlertError, BackToTop, calcTotalInboundDuration, calcTotalOutboundDuration, convertKoboToNaira, convertKoboToNairaString, formatAirportSubtitle } from "/src/components/functions";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { TripName } from "/src/components/flight/Flightcard";
import { timeFormatBare } from "/src/components/functions";
import { NairaSign } from "/src/components/functions";
import ConfirmPassengersStorage from "/src/components/flight/ConfirmPassengersStorage";
import { AuthPostApi, MainApi } from "/src/services/Geoapi";

function Passengerdetail({ changePage, flightDetails, setFlightDetails }) {
  const [localData, setLocalData] = useState([])
  const { alladdons, pdetails } = useSelector(state => state.data)
  const [addonscheck, setAddonscheck] = useState([])
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [view, setView] = useState(false)

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0)
  const [nextPage, setNextPage] = useState(false)

  React.useEffect(() => {
    const UpdateAmount = () => {
      setTotal(flightDetails.pricing.payable)
    }
    UpdateAmount()
  }, [flightDetails])

  const getFormDetails = () => {
    setView(!view)
  }
  const handleManagement = (tag) => {
    try {
      if(tag === 'yes') {
        localData.map(async ele => {
          const body = {
            title: ele.title,
            first_name: ele.firstName,
            last_name: ele.lastName,
            middle_name: ele?.middleName,
            gender: ele.gender,
            date_of_birth: ele.dob,
            email_address: ele.email,
            phone: ele.phoneNumber,
            country_of_origin: ele?.documents?.nationalityCountry,
            passport_number: ele?.documents?.number,
            issue_date: ele?.documents?.issuingDate,
            expiry_date: ele?.documents?.expiryDate,
            issuing_authority: ele?.documents?.issuingCountry,
            organization: user.id
          }
          await AuthPostApi(MainApi.passengers.create, body)
        })
      }
      // make sure there is a passenger detail filled
      let dataArr = []
      let addonsArr = []
      flightDetails.priceSummary.map((item) => {
        return new Array(item.quantity).fill().map((item, i) => {
          return dataArr.push(i)
        })
      })
      if (localData.length > dataArr.length) return AlertError(`Invalid Extra passenger's information detected`)
      if (localData.length < dataArr.length) return AlertError(`Incomplete passenger's information detected, kindly fill out all passengers information to proceed`)
      if (localData.length < 1) return AlertError('Your passenger\'s information is required to be filled out')
      // book this flight
      addonscheck.map((item) => {
        return addonsArr.push(item._id)
      })
      dispatch(dispatchSelectedAddons(addonscheck))
      setFlightDetails({ ...flightDetails, amount: total, addons: addonsArr })
      dispatch(storePassenger(localData))
      // if tag === yes then save details
    } catch (error) {
      console.log(error)
    }finally {
      changePage(2)
      BackToTop()
      setView(false)
    }
  }

  const handleSelection = id => {
    const filtered = addonscheck.filter((item) => item._id !== id)
    setAddonscheck(filtered)
    let calc = 0
    filtered.map((item) => {
      return calc += convertKoboToNaira(item.price)
    })
    setTotal(calc + flightDetails.pricing.payable)
  }
  const unhandleSelection = item => {
    setAddonscheck([...addonscheck, item])
    setTotal(prev => prev + convertKoboToNaira(item.price))
  }

  const handleBackChanges = () => {
    setAddonscheck([])
    changePage(0)
  }


  return (
    <div>
     {view && <ConfirmPassengersStorage onclose={() => setView(!view)} handleManagement={handleManagement} />}
      <Wrapper>
        <WrapContent>Passenger Details</WrapContent>
      </Wrapper>
      <FlightNav>
        <Flightnavbar active={2} />
      </FlightNav>
      <SectionWrapper>
        <SectionContent>
          <LeftContent>
            <FormCard>
              <TitleSection>
                <SmallWrapper>
                  <div className="">
                    <div onClick={handleBackChanges} className="flex items-center justify-end mb-5 gap-2 text-blue-600 cursor-pointer w-fit ml-auto">
                      <FaArrowLeft className="text-xs" />
                      <span className="text-lg">Back</span>
                    </div>
                  </div>
                  <div className="bg-red-300/30 shadow-xl border border-red-400 rounded-lg p-3 mb-5 text-red-900 text-sm">
                    <span className="font-bold">Disclaimer:</span>  Kindly fill all fields with the required exact information as on your international passport, and please provide accurate details as you will be liable for inaccurate information you share.
                  </div>
                  <div className={`capitalize w-fit text-xs ${flightDetails.documentRequired ? 'bg-teal-200' : 'bg-orange-200'} rounded-md py-2 px-3 font-semibold`}>{!flightDetails.documentRequired ? 'local flight' : 'international flight'}</div>
                  <InfoTitle className="font-bold mb-3">Personal Information  </InfoTitle>
                  <div className="mt-5">You can auto fill previously saved information by entering the first (3) characters of either the passenger's first name, middle name, last name, email address or phone number.</div>
                </SmallWrapper>
              </TitleSection>

              {flightDetails.priceSummary.map((item, i) => {
                return (
                  <div key={i}>
                    {
                      new Array(item.quantity).fill().map((data, j) => {
                        return <PassengersFlightForm
                          key={j}
                          indexs={j}
                          flight={item}
                          getData={data}
                          localData={localData}
                          setLocalData={setLocalData}
                          total={item.quantity}
                          setNextPage={setNextPage}
                          flightDetails={flightDetails}
                        />
                      })}
                  </div>
                )
              })}
            </FormCard>

            <div className={nextPage ? '' : 'hidden'}>
              <FormCard>
                <TitleSection>
                  <SmallWrapper>
                    <InfoTitle>Flight Addons</InfoTitle>
                  </SmallWrapper>
                </TitleSection>
                <FormSection>
                  <div>
                    {alladdons.map((item, i) => (
                      <AddonWrapper onClick={() => { addonscheck.includes(item) ? handleSelection(item._id) : unhandleSelection(item) }} key={i}>
                        <div className={`h-[20px] text-sm flex items-center justify-center mr-3 w-[25px] text-white border ${addonscheck.includes(item) ? 'bg-blue-700' : 'bg-slate-300'}`}> <FaCheck /> </div>

                        <Details>
                          <Title>{item.name}:</Title>
                          <Info>
                            {item.description}
                          </Info>
                        </Details>

                        <Amount>{NairaSign}{(convertKoboToNairaString(item.price)).toLocaleString()}</Amount>
                      </AddonWrapper>
                    ))}

                  </div>
                </FormSection>
              </FormCard>
              <BookingBtn onClick={getFormDetails}>
                Next
              </BookingBtn>
            </div>
          </LeftContent>
          <RightContent>
            <RightContentItem>
              {localTrip !== 'multi-city' ? <>
                <TopSection>
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
                    <div className="-ml-[1.3rem]">
                      <Img src={downplane} className="rotate-180" />
                    </div>
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
                </TopSection>
                <BottomSection>
                  <PassengersWrapper>
                    <div className='font-semibold text-slate-700 mb-3 text-lg'>Flight Base Fare</div>
                    <PassHolder>
                      <Hold>
                        <div className='block w-full'>
                          {flightDetails.priceSummary.map((item, i) => (
                            <div className='flex items-center justify-between' key={i}>
                              <div className='capitalize last:mb-5'>{item.passengerType} x {item.quantity}</div>
                              <div className='text-sm'>{NairaSign} {parseInt(item.totalPrice).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>

                      </Hold>
                      <Hold>
                      </Hold>
                      {addonscheck.map((item, i) => (
                        <PriceHold key={i}>
                          <Per>{item.name}: </Per>
                          <CostPer>{NairaSign} {convertKoboToNairaString(item.price).toLocaleString()}</CostPer>
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
                  <Total>Total Amount</Total>
                  <TotalCost>{NairaSign} {parseInt(total).toLocaleString()} </TotalCost>
                </AmountWrapper>
              </> : <>
                {/* ============================   multi city flight details */}
                <TopSection>
                  <TopWrap>
                    <InfoTitle>Flight Details</InfoTitle>
                  </TopWrap>
                  {flightDetails.routes?.length > 1 &&
                    flightDetails.routes?.map((flight, index) => (
                      <FlightSection key={index}>
                        {index === 0 ?
                          <ImgSection>
                            <Img src={downplane} />
                          </ImgSection> :
                          <div className="-ml-[1.3rem]">
                            <Img src={downplane} className="rotate-180" />
                          </div>}
                        <div className="w-full">
                          <GeneralTitle>Connecting Flights</GeneralTitle>
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
                </TopSection>
                <BottomSection>
                  <PassengersWrapper>
                    <div className='font-semibold text-slate-700 mb-3 text-lg'>Flight Base Fare</div>
                    <PassHolder>
                      <Hold>
                        <div className='block w-full'>
                          {flightDetails.priceSummary.map((item, i) => (
                            <div className='flex items-center justify-between' key={i}>
                              <div className='capitalize last:mb-5'>{item.passengerType} x {item.quantity}</div>
                              <div className='text-sm'>{NairaSign} {parseInt(item.totalPrice).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>

                      </Hold>
                      <Hold>
                      </Hold>
                      {addonscheck.map((item, i) => (
                        <PriceHold key={i}>
                          <Per>{item.name}: </Per>
                          <CostPer>{NairaSign} {convertKoboToNairaString(item.price).toLocaleString()}</CostPer>
                        </PriceHold>
                      ))}
                      {flightDetails.deal?._id && <PriceHold>
                        <Per>Discount</Per>
                        <CostPer>{flightDetails?.deal?.discountValue}% off</CostPer>
                      </PriceHold>}
                    </PassHolder>
                  </PassengersWrapper>
                </BottomSection>
                <AmountWrapper>
                  <Total>Total Amount</Total>
                  <TotalCost>{NairaSign} {parseInt(total).toLocaleString()} </TotalCost>
                </AmountWrapper>
              </>}
              {/* <FormCard>
                <TitleSection>
                  <SmallWrapper>
                    <InfoTitle>Discount and Vouchers</InfoTitle>
                    <FieldInfo>
                      If you don’t have any codes, you may skip this
                    </FieldInfo>
                  </SmallWrapper>
                </TitleSection>
                <FormSection>
                  <FormWrap>
                    <Input placeholder="Voucher Code" />
                    <div></div>
                  </FormWrap>
                </FormSection>
              </FormCard> */}
            </RightContentItem>
          </RightContent>
        </SectionContent>
      </SectionWrapper >

      {/* <Footer /> */}
    </div>
  );
}

export default Passengerdetail;
const Wrapper = styled.div``;
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
const FlightNav = styled.div`
  background: #171b4a;
  padding: 20px;
  width: 100%;
`;

const SectionWrapper = styled.div`
  background: #f4f8fa;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const SectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  grid-gap: 20px;
  padding: 0 20px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const LeftContent = styled.div``;
const FormCard = styled.div`
  background: #fff;
  padding: 40px 30px;
  margin-bottom: 30px;

  @media only screen and (max-width: 550px) {
    padding: 20px 15px;
  }
`;
const TitleSection = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
`;
const SmallWrapper = styled.div``;
const InfoTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;
const FieldInfo = styled.div`
  font-size: 14px;
`;

const FormSection = styled.div`
  margin-top: 30px;
`;
const FormWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;

  @media only screen and (max-width: 550px) {
    flex-direction: column;
    gap: unset;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 10px 0;
  padding: 0 15px;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;

const AddonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
`;
const Details = styled.div`
  width: 100%;
`;
const Title = styled.h4`
  margin-bottom: 10px;
  font-size: 18px;
`;
const Info = styled.div`
  font-size: 14px;
`;
const Amount = styled.h4`
  font-size: 20px;
`;
const BookingBtn = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  max-width: 187px;
  width: 100%;
  height: 54px;
  background: #2e61e6;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const RightContent = styled.div`
`;

const RightContentItem = styled.div`
  background: #fff;
  padding: 40px 30px;
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
const GeneralTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;
const DepatureInfo = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;
const DepatureImg = styled.img`
  width: 32px;
  height: 32px;
`;

const BottomSection = styled.div`
  padding: 20px 0;
  border-top: 3px dotted #eaeaea;
  border-bottom: 3px dotted #eaeaea;
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
  margin-top: 50px;
`;
const Total = styled.h4`
  font-size: 14px;
`;
const TotalCost = styled.h4`
  font-size: 20px;
`;