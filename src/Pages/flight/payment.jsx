import lock from "/src/assets/images/lock.svg";
import tick from "/src/assets/images/tick.svg";
import Flightnavbar from "/src/components/flight/flightnavbar";
import PayCard from "/src/components/flight/PayCard";
import { Dialcodes } from "/src/components/countrycodes";
import { AlertError } from "/src/components/functions";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SlDocs } from "react-icons/sl";
import { copyFunc } from "/src/components/functions";
import { NairaSign } from "/src/components/functions";
import Swal from "sweetalert2";
import { BackToTop } from "/src/components/functions";
import { FaArrowLeft } from "react-icons/fa";
import { ErrorMessage } from "/src/components/functions";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";
import Loading from "/src/components/Loading";
import { onlinesitename } from "/src/services/Geoapi";

function Payment({changePage, flightDetails}) {
  const [loading, setLoading] = useState(false);
  const { selectedAddons, passengers } = useSelector(state => state.data);
  const copyref = useRef()
  const [booked, setBooked] = useState(false)
  const priceLimit = 500000
  const priceAction =  parseInt(flightDetails.amount) > priceLimit
  const [activeTab, setActiveTab] = useState(!priceAction ? { tag: 1, text: "Make Payment" } : { tag: 2, text: "Submit request" });

  const [forms, setForms] = useState({
    email: passengers[0].email || "",
    name: `${passengers[0].title} ${passengers[0].firstName} ${passengers[0].lastName}` || "",
    phoneNumber: passengers[0].phoneNumber.split(' ')[1] || "",
    phoneCode: passengers[0].phoneNumber.split(' ')[0] || Dialcodes[0].dial_code,
  });


  const handleForms = e => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleTabClick = (tabIndex, tabText) => {
    setActiveTab({ tag: tabIndex, text: tabText });
  };

  // book the flight now in order to generate the ivoice for accepting payments
  const BookFlightTicket = async () => {
    if (!booked) {
      if (!forms.name) return AlertError("Name is required");
      if (!forms.email) return AlertError("Email is required");
      if (!forms.phoneCode) return AlertError("Country Dail code is required");
      if (!forms.phoneNumber) return AlertError("Phone number is required");

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
            if (activeTab.tag === 1) {
              CardPayment({ bookedData: payload.data, invoiceData: invoiceRes.data.data })
            } else if (activeTab.tag === 2) {
              BankTransfer({ bookedData: payload.data, invoiceData: invoiceRes.data.data })
            }
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
        AlertError.log(`${ErrorMessage}`)
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
          ...forms,
          phoneNumber: `${forms.phoneCode}${forms.phoneNumber}`
        },
        redirectUrl: `${onlinesitename}geo/verify-payment/${bookedData.bookingCode}?expand=addons,invoice`,
      };
      await HttpServices.post(ApiRoutes.payment.initialize_payment, info);
      localStorage.removeItem('passengers')
      setActiveTab({ tag: 3, text: '' })
      BackToTop()
    } catch (error) {
      return AlertError(`${ErrorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const CardPayment = async ({ bookedData, invoiceData }) => {
    setLoading(true);
    try {
      const info = { 
        invoiceCode: invoiceData.invoiceCode,
        paymentChannel: "ONLINE",
        customer: {
          ...forms,
          phoneNumber: `${forms.phoneCode}${forms.phoneNumber}`
        },
        redirectUrl: `${onlinesitename}geo/verify-payment/${bookedData.bookingCode}?expand=addons,invoice`,
      };
      const res = await HttpServices.post(ApiRoutes.payment.initialize_payment, info);
      let result = res.data.data;
      // localStorage.removeItem('passengers')
      window.location = result.link;

    } catch (error) {
      return AlertError(`${ErrorMessage}`)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Wrap>
        <WrapContent>Payment</WrapContent>
      </Wrap>
      <FlightNav>
        <Flightnavbar active={4} />
      </FlightNav>
      <Wrapper>
        <PaymentWrapper>
          <LeftSection>
            <Navigation className="border">
              {!priceAction && <CeditCardNav
                className={activeTab.tag === 1 ? "active" : ""}
                onClick={() => handleTabClick(1, "Make Payment")}
              >
                Credit Card
              </CeditCardNav>}
              <BankNav
                className={`${[2, 3].includes(activeTab.tag) ? "active" : ""} `}
                onClick={() => handleTabClick(2, "Submit request")}
              >
                Bank Transfer
              </BankNav>
              <div className="w-fit ml-auto">
                <div onClick={() => changePage(2)} className="flex items-center justify-end mb-5 gap-2 text-blue-600 cursor-pointer w-fit ml-auto">
                  <FaArrowLeft className="text-xs" />
                  <span className="text-lg">Back</span>
                </div>
              </div>
            </Navigation>

            {activeTab.tag === 1 && (
              <CreditCardSection>
                <CardContent>
                  <div className='w-full'>
                    <form>
                      <div className='mb-2'>
                        <div className='text-slate-600'>
                          {" "}
                          Fullname <span className='text-red-700'>*</span>{" "}
                        </div>
                        <Input
                          autoComplete="off"
                          type='text'
                          name='name'
                          value={forms.name}
                          className="capitalize"
                          onChange={handleForms}
                          placeholder='Enter Fullname'
                        />
                      </div>
                      <div className='mb-2'>
                        <div className='text-slate-600'>
                          {" "}
                          Email Address <span className='text-red-700'>*</span>{" "}
                        </div>
                        <Input
                          autoComplete="off"
                          type='text'
                          name='email'
                          value={forms.email}
                          onChange={handleForms}
                          placeholder='Enter Email'
                        />
                      </div>
                      <div className='text-slate-600'>
                        Phone Number <span className='text-red-700'>*</span>{" "}
                      </div>
                      <div className="grid grid-cols-6">
                        <SelectInput
                          name="phoneCode"
                          value={forms.phoneCode}
                          onChange={handleForms}
                        >
                          {Dialcodes.map((item, i) => (
                            <option key={i} value={item.dial_code}>{item.dial_code}</option>
                          ))}
                        </SelectInput>
                        <div className='mb-3 col-span-5'>
                          <Input
                            autoComplete="off"
                            type='number'
                            name='phoneNumber'
                            value={forms.phoneNumber}
                            onChange={handleForms}
                            placeholder='Enter Phone Number'
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </CreditCardSection>
            )}

            {activeTab.tag === 2 && (
              <BankSection>
                <CardContent>
                  <Cost>
                    {NairaSign}{parseInt(flightDetails.amount).toLocaleString()}
                  </Cost>
                  <Desc className="text-center">
                  Please pay the total amount of <span className="text-mainblue">{NairaSign}{parseInt(flightDetails.amount).toLocaleString()}</span> to the provided bank details and share the payment confirmation via WhatsApp to 09087675823. Kindly note that this reservation will be valid for 1 hour
                  </Desc>

                  <DetailsWrapper>
                    <InfoWrap>
                      <InfoTitle>Bank Name</InfoTitle>
                      <InfoDetail className="text-right">FIDELITY BANK PLC </InfoDetail>
                    </InfoWrap>
                    <InfoWrap>
                      <InfoTitle>Account Name</InfoTitle>
                      <InfoDetail className="text-right"> GEO TRAVELS AND TOURS LIMITED</InfoDetail>
                    </InfoWrap>
                    <InfoWrap>
                      <InfoTitle className="mt-2">Account Number</InfoTitle>
                      <div className="flex items-center justify-end gap-3">
                        <input
                          ref={copyref}
                          type='text'
                          readOnly
                          defaultValue={`4011183216`}
                          className='font-semibold bg-transparent rounded-lg w-full text-right text-[#171B4A] outline-none py-2 text-base'
                        />
                        <div onClick={() => copyFunc(copyref)} className='cursor-pointer flex items-center gap-1'>
                          <SlDocs /> Copy
                        </div>
                      </div>
                    </InfoWrap>
                  </DetailsWrapper>

                  <AccountInfo>
                  Note: The above account details are only for this transaction. Please do not use them for any other payments.
                  </AccountInfo>

                  <Expiration className="text-center">
                    <b className="text-zinc-600">Disclaimer</b>, GeoTravel would like to emphasise that we are not liable for payments made to incorrect account details. Kindly confirm the recipient’s information before proceeding with any transactions.
                  </Expiration>

                  <SecureWrapper>
                    <SecureImg src={lock} alt='lock' />
                    100% PROTECTED AND SECURED
                  </SecureWrapper>
                </CardContent>
              </BankSection>
            )}

            {activeTab.tag === 3 && (
              <BankSection>
                <CardContent>
                  <Tickmg src={tick} alt='tick' />
                  <Desc>Transfer Successfully initiated</Desc>
                  <div>Awaiting payment confirmation.</div>
                  <Cost>
                    {NairaSign}
                    {parseInt(flightDetails.amount).toLocaleString()}
                  </Cost>

                  <div className="bg-slate-100 p-3 rounded-md">
                    <div className="font-bold text-zinc-600 border-b pb-2 mb-2">Customer Information</div>
                    <div className="grid grid-cols-2 p-1">
                      <div className="text-sm">Fullname</div>
                      <div className="text-right text-sm">{forms.name}</div>
                    </div>
                    <div className="grid grid-cols-2 p-1">
                      <div className="text-sm">Email Address</div>
                      <div className="text-right text-sm">{forms.email}</div>
                    </div>
                    <div className="grid grid-cols-2 p-1">
                      <div className="text-sm">Phone Number</div>
                      <div className="text-right text-sm">{forms.phoneNumber}</div>
                    </div>
                  </div>

                  <SecureWrapper>
                    <SecureImg src={lock} alt='lock' />
                    100% PROTECTED AND SECURED
                  </SecureWrapper>
                </CardContent>
              </BankSection>
            )}
          </LeftSection>
          <RightSection>
            <PayCard
              activeTab={activeTab}
              BookFlightTicket={BookFlightTicket}
              flightDetails={flightDetails}
            />
          </RightSection>
        </PaymentWrapper>
      </Wrapper>
      {/* <Footer /> */}
    </div>
  );
}

export default Payment;

const SelectInput = styled.select`
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
const PaymentWrapper = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 120px 20px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;

  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
    padding: 50px 20px;
  }
`;

const LeftSection = styled.div``;
const RightSection = styled.div``;

const Navigation = styled.div`
  background: #fff;
  padding: 20px 30px;
  display: flex;
`;
const CeditCardNav = styled.h4`
  margin-right: 20px;
  font-size: 14px;

  cursor: pointer;
  :active {
    color: #2e61e6;
  }
`;
const BankNav = styled.h4`
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
  :active {
    color: #2e61e6;
  }
`;
const CreditCardSection = styled.div``;

const CardContent = styled.div`
  background: #fff;
  padding: 50px 30px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BankSection = styled.div``;

const Cost = styled.h4`
  font-size: 24px;
  color: #2e61e6;
  margin-bottom: 15px;
`;
const Desc = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;
const DetailsWrapper = styled.div`
  background: #f4fbfe;
  padding: 20px 30px;
  width: 100%;
  margin: 20px 0;
`;
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
const InfoTitle = styled.div`
  font-weight: 600;
`;
const InfoDetail = styled.div`
  font-weight: 600;
`;
const AccountInfo = styled.div`
  font-size: 12px;
`;
const Expiration = styled.div`
  color: #b4b5c4;
  font-size: 12px;
  margin: 5px 0;
`;
const TIme = styled.span`
  color: #fb2b56;
  font-size: 12px;
`;
const SecureWrapper = styled.div`
  background: #fff7e9;
  padding: 5px;
  font-size: 12px;
  margin: 20px;
  display: flex;
  align-items: center;
`;
const SecureImg = styled.img`
  margin-right: 10px;
`;

const Tickmg = styled.img`
  width: 8rem;
`;