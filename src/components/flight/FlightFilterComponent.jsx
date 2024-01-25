import React, { Suspense, useState } from 'react'
import styled from 'styled-components';
import FilterByAirline from './filterByAirline';
import FilterStops from './filterStops';
import downarrow from "/src/assets/icons/downarrow.svg";
import { FaTimes } from 'react-icons/fa';
import FilterRefundables from './FilterRefundables';
import { TripName } from './flightcard';
import MainPriceRanger from '/src/components/utils/MainPriceRanger';
import FilterMulticityAirlines from './FilterMulticityAirlines';

const FlightFilterComponent = (props) => {
  const { flightList2, maxsortPrice, closeMobile, minsortPrice, storeAirline, handleFilterByPrice, storeStops, handleRefunds } = props
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [budget, setBudget] = useState(true);
  const [outings, setoutings] = useState(true);
  const [airline, setairline] = useState(true);
  const [refunds, setrefunds] = useState(true);

  const openBudget = () => {
    setBudget(!budget);
  };
  //End Open Flight Details Modal-------------------
  const openoutings = () => {
    setoutings(!outings);
  };
  const openairline = () => {
    setairline(!airline);
  };
  const openrefunds = () => {
    setrefunds(!refunds);
  };
  return (
    <CardWrapper>
      <div className='p-5' onClick={closeMobile}>
        <div className='flex items-center justify-end rounded-lg bg-slate-200 p-2 cursor-pointer w-fit ml-auto'> <FaTimes /> </div>
      </div>
      <CardSections>
        <InfoSection>
          <Filter>
            {/* <Filter onClick={(val) => changePage((val = 1))}> */}
            Filter
          </Filter>
        </InfoSection>
        <Clear>Clear All</Clear>
      </CardSections>
      <HeroSections className=''>
        <CtrlSection className="mb-5">
          <Filter>Price</Filter>
          <Img src={downarrow} alt="arrow" onClick={openBudget} />
        </CtrlSection>
        <div className="w-full">
          {budget ? <Suspense fallback={'loading...'}>
            <MainPriceRanger
              maxprice={maxsortPrice.current}
              minprice={minsortPrice.current}
              handlePrice={handleFilterByPrice}
            />
          </Suspense> : null}
        </div>
      </HeroSections>
      <HeroSections>
        <CtrlSection>
          <Filter>Stops</Filter>
          <Img src={downarrow} alt="arrow" onClick={openoutings} />
        </CtrlSection>
        {outings ? (
          <FilterStops
            storeStops={storeStops}
          />
        ) : null}
      </HeroSections>
      <HeroSections>
        <CtrlSection>
          <Filter>Refunds</Filter>
          <Img src={downarrow} alt="arrow" onClick={openrefunds} />
        </CtrlSection>
        {refunds ? (
          <FilterRefundables
            handleRefunds={handleRefunds}
          />
        ) : null}
      </HeroSections>

      <HeroSections>
        <CtrlSection>
          <Filter>Airline</Filter>
          <Img src={downarrow} alt="arrow" onClick={openairline} />
        </CtrlSection>
        <div className="w-full">
          {airline ? (
            <Suspense fallback={'loading...'}>
              {localTrip !== 'multi-city' ?
                <FilterByAirline
                  flightList={flightList2}
                  storeAirline={storeAirline}
                /> :
                <FilterMulticityAirlines
                  flightList={flightList2}
                  storeAirline={storeAirline}
                />
              }
            </Suspense>
          ) : null}
        </div>
      </HeroSections>
    </CardWrapper>
  )
}

export default FlightFilterComponent

const SliderInput = styled.input`
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border: 0.3rem solid white;
  box-shadow: 1px 2px 6px lightgrey;
  background: red;
  border-radius: 50%;
  cursor: pointer;
}
::-webkit-progress-bar {
  background-color: #777;
  border-radius: 20px;
}

::-webkit-progress-value {
  background-color: rgb(20, 240, 221);
  border-radius: 20px;
}
`;

const CardWrapper = styled.div`
  background: #fff;
`;
const CardSections = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e3e4;

  padding: 35px;
`;
const HeroSections = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e3e4;
  padding: 35px;
  place-items: flex-start;
`;
const CtrlSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const InfoSection = styled.div``;
const Filter = styled.h4`
  font-size: 16px;
`;
const Filt = styled.div`
  font-size: 14px;
`;
const Clear = styled.h4`
  color: #2e61e6;
  font-size: 14px;
  cursor: pointer;
`;

const Img = styled.img`
  cursor: pointer;
`;

