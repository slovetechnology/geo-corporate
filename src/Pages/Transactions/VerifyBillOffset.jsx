import GeoLayout from '/src/components/GeoLayout'
import React, { useCallback, useEffect, useState } from 'react'
import spins from "/src/assets/images/spins.gif";
import errorimg from "/src/assets/images/error.svg";
import tick from "/src/assets/images/tick.svg";
import styled from "styled-components";
import { AuthGetApi, MainApi } from '/src/services/Geoapi';
import { useSearchParams, useNavigate } from 'react-router-dom';

// http://localhost:5173/geo/verify-request/?status=completed&tx_ref=TA2I8B501M&tx_ref=4922048
const VerifyBillOffset = () => {
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState('')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const getSearchParams = useCallback(
    (val = "") => {
      const data = searchParams?.get(val);
      return data ?? "";
    },
    [searchParams]
  );


  useEffect(() => {
    const VerifyPayment = async () => {
      setLoading(true)
      if (getSearchParams("status") === "cancelled") {
        return setTimeout(() => {
          setLoading(false);
          setLoaded("error");
        }, 3000);
      }
      try {
        const res = await AuthGetApi(`${MainApi.auth.verify_offset_bill}/${getSearchParams("tx_ref")}`)
        if (res.status !== "success") {
          setLoaded("error");
          return false;
        } else {
          setLoaded(["success"]);
          setTimeout(() => {
            setLoaded(["loading", "success"])
            setTimeout(() => {
              navigate('/geo/transactions')
            }, 5000);
          }, 5000);
        }
      } catch (error) {
        return AlertError(`${error}`)
      } finally {
        setLoading(false)
      }

    }
    VerifyPayment()
  }, [])
  return (
    <GeoLayout>
      {loading && (
        <div className='flex flex-col justify-center items-center w-full agp-3'>
          <img src={spins} alt={spins} className='w-32 h-auto' />
          <div className='text-sm text-slate-600 drop-shadow-sm text-center'>
            Verifying Your Payment process, please wait...
          </div>
        </div>
      )}
      {!loading &&
        <>
          {loaded.includes('success') &&
            <Wrapper>
              {loaded.includes('loading') &&
                <div className="fixed top-0 left-0 w-full h-screen bg-mainblue/30 z-10 flex items-center justify-center">
                  <div className="w-11/12 max-w-lg bg-white rounded-lg p-4">
                    <div className="text-center py-10">Hold on, redirecting you to your transactions page</div>
                    <div className="w-fit mx-auto mb-10">
                      <img src={spins} alt={spins} className='w-20 h-auto' />
                    </div>
                  </div>
                </div>}
              <SuccessWrapper>
                <SuccessImg src={tick} />
                <SucWrap>
                  <SuccessTitle>Payment Successfully Confirmed</SuccessTitle>
                  <PassUser>
                    You bill on this invoice has been successfully verified.
                  </PassUser>
                </SucWrap>
              </SuccessWrapper>
            </Wrapper>}
        </>
      }
    </GeoLayout>
  )
}

export default VerifyBillOffset
const Wrapper = styled.div`
  display: flex;
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
