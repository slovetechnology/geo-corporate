
import styled from "styled-components";

export const ExploreBtn = styled.button`
  width: 121px;
  height: 54px;
  background: #2e61e6;
  border-radius: 27px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
  box-shadow: none;
  flex-shrink: 0;
  @media only screen and (max-width: 568px) {
    margin-top: 20px;
    width: 100%;
  }
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 0 0px;
  z-index: 9;
  position: relative;
`;
export const CardHolder = styled.div`
  /* overflow-x: auto; */
  height: auto;
  width: 100%;
  background: transparent;
`;

export const RoutesWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const RouteItem = styled.div`
  font-weight: 600;
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  color: #171b4a;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
export const SelectDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  text-transform: capitalize;
`;

export const SelectedDiv = styled.div`
  flex-direction: column;
  gap: 20px;
  position: absolute;
  z-index: 99;
  background: #fff;
  width: 150px;
  height: 135px;
  padding: 20px;
  top: 30px;
  label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    white-space: nowrap;
  }
`;
export const SelectedDiv0 = styled.div`
  flex-direction: column;
  gap: 20px;
  position: absolute;
  z-index: 99;
  background: #fff;
  width: 200px;
  height: fit-content;
  top: 30px;
  label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    white-space: nowrap;
  }
`;
export const Img = styled.img``;
export const Icon2 = styled.img``;

export const PassengersList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PassengerSpan = styled.span`
  display: flex;
  align-items: center;
  font-weight: 800;
`;

export const PassengerSpan1 = styled.div`
  @media only screen and (max-width: 568px) {
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PassengerWrapper = styled.div`
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  z-index: 99;
  background: #fff;
  width: 15rem;
  padding: 20px;
  top: 40px;
  right: 0;
`;
export const Passengers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const Group = styled.div``;
export const IncrementWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 5px;
  input {
    width: 10%;
    border: none;
    outline: none;
    font-weight: 600;
    gap: 10px;
  }
`;
export const IncrementBtn = styled.button`
  padding: 4px 8px;
  border-radius: 2px;
  background-color: #f2f2f2;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const DecrementBtn = styled.button`
  padding: 4px 8px;
  border-radius: 2px;
  background-color: #f2f2f2;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const DoneBtn = styled.button`
  background: #2e61e6;
  width: 30%;
  color: #fff;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
`;

export const DirectionsWrapper = styled.div`
  margin: 5px 0;
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media only screen and (max-width: 992px) {
    /* flex-direction: column; */
    width: 100%;
    flex-wrap: wrap;
  }
`;
export const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  @media screen and (max-width: 568px) {
    flex-wrap: wrap;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  height: 54px;
  width: 100%;

  @media only screen and (max-width: 568px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const InputSuggestWrapper = styled.div`
  display: grid;
  gap: 20px;
  max-height: 400px;
  width: 100%;
  width: 250px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  z-index: 9;
`;
export const InputSuggest = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  cursor: pointer;
  :hover {
    background-color: #2e61e610;
    p {
      color: #2e61e6;
    }
  }
  div {
    display: grid;
    gap: 10px;
    overflow: hidden;
    h2 {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  span {
    flex-shrink: 0;
    display: inline-block;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #545454;
    border-radius: 5px;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: calc(100% - 50%);
  @media only screen and (max-width: 568px) {
    margin-bottom: 5px;
    width: calc(100%);
  }
`;

export const Input = styled.input`
  font-size: 14px;
  color: #171b4a;
  width: 100%;
  height: 56px;
  border: 1px solid #eaeaea;
  background: #fff;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 14px;
  color: #171b4a;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
  @media only screen and (max-width: 568px) {
    width: 100%;
  }
`;

export const DeptDay = styled.span`
  font-size: 12px;
  color: #8b8da4;
  padding: 5px;
`;

export const TextArea = styled.textarea`
  font-size: 14px;
  color: #171b4a;
  border: 1px solid #eaeaea;
  background: #fff;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 14px;
  color: #171b4a;

  :active,
  :focus {
    outline: none;
    border: 1px solid #eaeaea;
  }
`;
