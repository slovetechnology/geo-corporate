import React, { useEffect, useState } from "react";
import styled from "styled-components";
import comparearrows from "/src/assets/images/comparearrows.svg";
import loadingplane from '/src/assets/images/planeloading.svg'
import loadingbg from '/src/assets/images/loadingbg.png'
import { FaMinus } from "react-icons/fa";
import { FlightNumber } from "./store";
import {useAtom} from 'jotai'

function FlightLoader({ loading }) {
  const { flightData, open } = loading;
  const [num, setNum] = useAtom(FlightNumber)
  useEffect(() => {
    const interval = setInterval(() => {
      if(num === 100) {
        return clearInterval(interval)
      }else {
        setNum(prev => prev + 1)
      }
    }, 10);
    return () => clearInterval(interval);
  }, [num]);
  return open ? (
    <Wrapper>
      <LoaderContainer>
        <img src={loadingbg} alt="loadingbg" className="" />
        <Small>Getting the best fares</Small>
        <LocationWrapper>
          <FlightLocation>{flightData.origin}</FlightLocation>
          <AnimatorWrapper>
            <AnimateDirection src={comparearrows} />
            <Direction src={comparearrows} />
          </AnimatorWrapper>
          <FlightLocation>{flightData.destination}</FlightLocation>
        </LocationWrapper>
        {flightData.type === 'return' ? <div className="flex items-center gap-3">
          <div className="">{flightData.departureDate}</div>
          <FaMinus />
          <div className="">{flightData.returnDate}</div>
        </div> : 
          <div className="">{flightData.departureDate}</div>
        }
        <Small className='capitalize'>{flightData.passenger} Passenger{flightData.passenger !== "1" ? 's' : null}, {flightData.cabin}</Small>

        <div className="w-11/12 mx-auto my-6">
          <div className="bg-slate-100 w-full h-1 relative">
          {/* <img src={loadingplane} alt="loadingplane" className={`absolute transition-all -top-[0.68rem]`} style={{ left: `${num - 11}%` }} /> */}
            <div className="absolute top-0 left-0 bg-blue-700 h-1 rounded-lg" style={{ width: `${num}%` }}>
              <img src={loadingplane} alt="" className="w-fit ml-auto -mt-[0.67rem]" />
            </div>
          </div>
        </div>
      </LoaderContainer>
    </Wrapper>
  ) : (
    <div></div>
  );
}

export default FlightLoader;

const Wrapper = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  width: 269px;
  padding-bottom: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 10px;
`;
const Small = styled.div`
  color: #171b4a;
  font-size: 12px;
`;
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const FlightLocation = styled.h4`
  font-size: 24px;
`;
const AnimatorWrapper = styled.div`
  position: relative;
  width: fit-content;
  display: block;
  margin: 0 10px;
`;
const AnimateDirection = styled.img`
  position: absolute;
  opacity: 0.75;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
`;
const Direction = styled.img`
`;
