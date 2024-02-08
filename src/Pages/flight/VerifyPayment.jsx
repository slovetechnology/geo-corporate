import spins from "/src/assets/images/spins.gif";
import errorimg from "/src/assets/images/error.svg";
import tick from "/src/assets/images/tick.svg";
import BookedFlightItinerary from "/src/components/flight/BookedFlightItinerary";
import ReservationTicket from "/src/components/flight/ReservationTicket";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AlertError } from "/src/components/functions";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";
import GeoLayout from "/src/components/GeoLayout";
import { AuthPostApi, MainApi } from "/src/services/Geoapi";
import { useSelector } from 'react-redux'
import { AuthGetApi } from "/src/services/Geoapi";


const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false)
  const [loaded, setLoaded] = useState("");
  const [detail, setDetail] = useState({});
  const [flight, setFlight] = useState({})
  const { bookingCode } = useParams()
  const { user } = useSelector(state => state.data)

  const getSearchParams = useCallback(
    (val = "") => {
      const data = searchParams?.get(val);
      return data ?? "";
    },
    [searchParams]
  );

  const confirmTransaction = useCallback(async () => {
    if (user.account_type === 'PREPAID') {
      if (getSearchParams("status") === "cancelled") {
        return setTimeout(() => {
          setLoading(false);
          setLoaded("error");
        }, 3000);
      }
      try {
        const res = await HttpServices.get(
          `${ApiRoutes.payment.verify_payment}/${getSearchParams("transaction_id")}`
        );
        if (!res.data.success) {
          setLoaded("error");
          return false;
        } else {
          const result = await HttpServices.get(
            `${ApiRoutes.flights.manage_booking}/${bookingCode}`
          );
          const payload = result.data.data;
          setLoaded("success");
          setDetail(payload);
          // call geo payment api for prepaid account on bank transfer
          if (user.account_type === 'PREPAID') {
            const formbody = {
              amount: parseInt(res.data.data.amount),
              email: payload.passengers[0].email || "",
              name: `${payload.passengers[0].title} ${payload.passengers[0].firstName} ${payload.passengers[0].lastName}` || "",
              phonenumber: payload.passengers[0].phoneNumber.split(' ')[1] || "",
              booking_code: payload.bookingCode,
              status: payload.paymentStatus,
              reference: payload.reference,
              module: 'CARD PAYMENT',
              organization: user.id
            }
            const allres = await AuthGetApi(`${MainApi.auth.all_payments}/${user.id}`)
            const findRes = allres.data.find(ele => ele.book_code === payload.bookingCode)
            if(!findRes) {
              await AuthPostApi(MainApi.auth.payment, formbody)
            } 
          }
        }
      } catch (error) {
        return AlertError(`${error}`)
      } finally {
        setLoading(false)
      }
    }else {
      const result = await HttpServices.get(
        `${ApiRoutes.flights.manage_booking}/${bookingCode}`
      );
      const payload = result.data.data;
      setLoaded("success");
      setDetail(payload);
      setTimeout(() => {
        setLoading(false)
      }, 4000);
    }
  }, [getSearchParams]);

  useLayoutEffect(() => {
    confirmTransaction();
    // eslint-disable-next-line
  }, []);

  const handleView = value => {
    setFlight(detail)
    setView(!view);
  };
  return (
    <GeoLayout>
      {view && <BookedFlightItinerary flight={flight} closeView={() => setView(!view)} />}
      {loading && (
        <div className='flex flex-col justify-center items-center w-full agp-3'>
          <img src={spins} alt={spins} className='w-32 h-auto' />
          <div className='text-sm text-slate-600 drop-shadow-sm text-center'>
            Verifying Your Payment process, please wait...
          </div>
        </div>
      )}
      {!loading && (
        <div>
          {loaded === "error" && (
            <div>
              <CardContent>
                <CardImg src={errorimg} alt={errorimg} />
                <Note>Unavailable</Note>
                <Info>'An Error Occured while verifying your card payment'</Info>
              </CardContent>
            </div>
          )}

          {loaded === "success" && (
            <Wrapper>
              <SuccessWrapper>
                <SuccessImg src={tick} />
                <SucWrap>
                  <SuccessTitle>Booking Reservation Successful</SuccessTitle>
                  <PassUser>
                    An email has been sent to you containing your ticket and boarding pass
                  </PassUser>
                </SucWrap>
              </SuccessWrapper>
              <div className="max-w-[1160px] mx-auto">
                <ReservationTicket
                  flight={detail}
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <button onClick={handleView} className='my-10 capitalize bg-[#2e61e6] text-white rounded-lg py-3 px-6'>view flight itinerary</button>
                {flight.ticketed && <button onClick={() => window.print()} className='my-10 border border-[#2e61e6] text-[#2e61e6] py-3 px-6 rounded-lg'>Print Ticket</button>}
              </div>
            </Wrapper>
          )}
        </div>
      )}
    </GeoLayout>
  );
};

export default VerifyPayment;

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
  font-size: 14px;
`;
const Info = styled.div`
  font-size: 12px;
`;

const Wrapper = styled.div`
  background: #f4f8fa;
`;
const SuccessWrapper = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  align-items: center;
`;
const SuccessImg = styled.img``;
const SucWrap = styled.div``;
const SuccessTitle = styled.h4`
  font-size: 24px;
`;
const PassUser = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;
