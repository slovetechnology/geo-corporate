import GeoLayout from '/src/components/GeoLayout'
import React, { useState } from 'react'
import spins from "/src/assets/images/spins.gif";
import errorimg from "/src/assets/images/error.svg";
import tick from "/src/assets/images/tick.svg";
import styled from "styled-components";

const VerifyBillOffset = () => {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState('success')
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
      {!loading && loaded === 'success' &&
        <Wrapper>
          <SuccessWrapper>
            <SuccessImg src={tick} />
            <SucWrap>
              <SuccessTitle>Payment Successfully Confirmed</SuccessTitle>
              <PassUser>
                You bill on this invoice has been successfully verified.
              </PassUser>
            </SucWrap>
          </SuccessWrapper>
        </Wrapper>
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
