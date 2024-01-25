import React, { useRef } from "react";
import styled from "styled-components";
import CloseIcon from "/src/assets/icons/close.svg";
import moment from "moment";
import { SlDocs } from "react-icons/sl";
import { BackToTop, GoodAlert, WebDateFormat, formatAirport, formatAirportTitle, timeFormat } from "/src/components/utils/functions";
import HttpServices from "/src/services/HttpServices";
import ApiRoutes from "/src/services/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { setBookedInvoice } from '/src/app/dataSlice';
import { FaMinus } from "react-icons/fa";
import DepartPlaneIcon from "/src/assets/icons/departureplane.svg";
import ReturnPlaneIcon from "/src/assets/icons/returnplane.svg";
import { AlertError } from "/src/components/utils/functions";

const FlightInvoice = (props) => {
    const { changePage } = props
    const { flightBooked } = useSelector(state => state.data)
    const dispatch = useDispatch()

    const proceedToPayment = async () => {
        try {
            const invoiceRes = await HttpServices.get(
                `${ApiRoutes.invoice.get_invoice_details}/${flightBooked.invoice}`
            )
            const resultFetched = invoiceRes.data.data
            dispatch(setBookedInvoice(resultFetched))
            BackToTop()
            return changePage()
        } catch (error) {
            return AlertError(`${error}`)
        }
    }
    const flightTitle = () => {
        return (
            flightBooked.outbound.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                    {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
                </div>
            ))
        )
    }
    const flightTitle2 = () => {
        return (
            flightBooked.inbound.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                    {formatAirportTitle(item.airportFrom)} <FaMinus /> {formatAirportTitle(item.airportTo)}
                </div>
            ))
        )
    }

    return (
        <Wrapper className="z-30" >
            <ModalWrapper>
                <TopSection>
                    <SmTitle>
                        <Itenary>
                        </Itenary>
                    </SmTitle>

                    <span onClick={props.closeView}>
                        <CloseImg src={CloseIcon} />
                    </span>
                </TopSection>
                <div className="scrolls" style={{ overflow: "auto", padding: "20px" }}>

                    <div className="p-3 border-b mb-3">
                        <div className="flex gap-3">
                            <img src={DepartPlaneIcon} alt="" className="self-start" />
                            <div className="">
                                <div className="text-blue-600 capitalize font-semibold">departure flights</div>
                                {flightTitle()}
                            </div>
                        </div>
                    </div>
                    {flightBooked.outbound.map((item, index) => (
                        <div key={index}>
                            <div className="flex gap-3 py-4 px-3">
                                <div className="w-[15%]">
                                    <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                                    <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="" className="w-8" /> </div>
                                </div>
                                <div className="w-[85%]">
                                    <div className="grid grid-cols-5 gap-5">
                                        <div className="col-span-3">
                                            <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                                                {moment(item.departureTime).format('h:mA')}
                                                <FaMinus />
                                                {moment(item.arrivalTime).format('h:mA')}
                                            </div>
                                            <div className="text-slate-600 mb-4">
                                                <span> {formatAirport(item.airportFrom)} </span>
                                                <FaMinus />
                                                <span> {formatAirport(item.airportTo)} </span>
                                            </div>
                                            <div className="mb-3">
                                                <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                                                <div className="flex items-center mt-2 gap-6">
                                                    {flightBooked.documentRequired && <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                                                    {/* {flightBooked.documentRequired && <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <span className="font-semibold capitalize">baggage: </span>
                                                <span>{item.baggage}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                                            <div className="text-sm">{item.cabinType}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {index === 0 && flightBooked.outbound.length > 0 && flightBooked.outbound.map((item, i) => (
                                typeof (item.layover) === 'number' &&
                                <div className="w-11/12 mx-auto" key={i}>
                                    <div className="my-5">
                                        <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                                            <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className="">{formatAirport(item.airportTo)} </span></div>
                                            <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    {flightBooked.inbound.length > 0 && <div className="p-3 border-b border-t mb-3">
                        <div className="flex gap-3">
                            <img src={ReturnPlaneIcon} alt="" className="self-start w-7" />
                            <div className="">
                                <div className="text-blue-600 capitalize font-semibold">return flights</div>
                                {flightTitle2()}
                            </div>
                        </div>
                    </div>}
                    {flightBooked.inbound.map((item, index) => (
                        <div key={index}>
                            <div className="flex gap-3 py-4 px-3">
                                <div className="w-[15%]">
                                    <div className="text-xs text-center mb-3">{moment(item.departureTime).format(WebDateFormat)}</div>
                                    <div className="w-fit mx-auto"> <img src={item.airlineDetails.logo} alt="" className="w-8" /> </div>
                                </div>
                                <div className="w-[85%]">
                                    <div className="grid grid-cols-5 gap-5">
                                        <div className="col-span-3">
                                            <div className="flex items-center gap-3 text-xs font-semibold mb-3">
                                                {moment(item.departureTime).format('h:mA')}
                                                <FaMinus />
                                                {moment(item.arrivalTime).format('h:mA')}
                                            </div>
                                            <div className="text-slate-600 mb-4">
                                                <span> {formatAirport(item.airportFrom)} </span>
                                                <FaMinus />
                                                <span> {formatAirport(item.airportTo)} </span>
                                            </div>
                                            <div className="mb-3">
                                                <div className="font-semibold">{item.airlineDetails.name} - {item.flightNumber}</div>
                                                <div className="flex items-center mt-2 gap-6">
                                                    {flightBooked.documentRequired && <div className="font-light">Class {item.bookingClass.length > 0 ? item.bookingClass : 'None'}</div>}
                                                    {/* {flightBooked.documentRequired && <div className=" font-light">Seat {item.equipmentType.length > 0 ? item.equipmentType : 'None'}</div>} */}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <span className="font-semibold capitalize">baggage: </span>
                                                <span>{item.baggage}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="font-semibold text-sm mb-3">{timeFormat(item.duration)}</div>
                                            <div className="text-sm">{item.cabinType}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {index === 0 && flightBooked.inbound.length > 0 && flightBooked.inbound.map((item, i) => (
                                typeof (item.layover) === 'number' &&
                                <div className="w-11/12 mx-auto" key={i}>
                                    <div className="my-5">
                                        <div className="bg-orange-100/40 border border-orange-400 p-3 rounded-lg text-sm grid grid-cols-7">
                                            <div className="col-span-5"> <b className="font-semibold"> Layover at:</b> <span className="">{formatAirport(item.airportTo)} </span></div>
                                            <b className="font-bold col-span-2 text-sm text-right">{timeFormat(item.layover)}</b>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="py-7 px-4 bg-blue-900">
                        <div className="grid grid-cols-5">
                            <div className='col-span-3'>
                                <div className=''>
                                    <div className="text-slate-300">Total Costs</div>
                                    <div className="text-slate-100 text-xl">&#8358; {flightBooked.pricing.payable.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className='col-span-2 text-right'>
                                <button
                                    onClick={proceedToPayment}
                                    className="_primary-btn"  >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </Wrapper >
    );
}


export default FlightInvoice

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;
const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 0;
  width: 100%;
  max-width: 680px;
  background: #ffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  height: 600px;
  @media only screen and (max-width: 615px) {
    height: 100%;
    padding: 70px 10px;
  }
`;
const TopSection = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 20px;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  align-items: center;

  span {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efefef;
    cursor: pointer;
  }
`;
const Itenary = styled.h4`
  font-size: 16px;
  cursor: pointer;
`;
const CloseImg = styled.img``;

const SmTitle = styled.div`
  display: flex;
  gap: 20px;
`;