import React from "react";
import styled from "styled-components";

function Flightnavbar({ active }) {
  return (
    <div>
      <NavWrapper>
        <NavItems className={active === 1 && "active-tab"}>
          <Numb className={active === 1 && "active-tab"}>1</Numb>
          <FlightLink>Select Flight</FlightLink>
        </NavItems>

        <NavItems className={active === 2 && "active-tab"}>
          <Numb className={active === 2 && "active-tab"}>2</Numb>
          <FlightLink>Passenger Details</FlightLink>
        </NavItems>

        <NavItems className={active === 3 && "active-tab"}>
          <Numb className={active === 3 && "active-tab"}>3</Numb>
          <FlightLink>Trip Summary</FlightLink>
        </NavItems>

        <NavItems className={active === 4 && "active-tab"}>
          <Numb className={active === 4 && "active-tab"}>4</Numb>
          <FlightLink>Payment</FlightLink>
        </NavItems>

        <NavItems className={active === 5 && "active-tab"}>
          <Numb className={active === 5 && "active-tab"}>5</Numb>
          <FlightLink>Booking Confimration</FlightLink>
        </NavItems>
      </NavWrapper>
    </div>
  );
}

export default Flightnavbar;

const NavWrapper = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* padding: 0 20px; */
  @media only screen and (max-width: 768px) {
    justify-content: center;

    a:nth-child(5) {
      width: 10%;
    }
  }
  a {
    width: 100%;
  }
`;
const NavItems = styled.div`
  color: #fff;
  display: flex;
  cursor: default;
  align-items: center;
  color: ${(props) =>
    props.className === "active-tab" ? "#ffffff" : "#8e8e8e"};
  position: relative;
  gap: 8px;
  @media only screen and (max-width: 768px) {
    ::after {
      content: "";
      width: 100%;
      height: 5px;
      background: #fff;
      position: absolute;
      left: 19px;
    }
  }
`;
const Numb = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) =>
    props.className === "active-tab" ? "#ffffff" : "#8e8e8e"};
  color: #171b4a;
  font-size: 14px;
`;
const FlightLink = styled.h4`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
