import { NairaSign } from '/src/components/utils/functions'
import React, { useState } from 'react'
import { BsFilterRight } from 'react-icons/bs';
import { Keyboard, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const AllAirlines = ({ flightList, AirlineFrontendFilter }) => {
    const dataArr = []
    const [airlines, ] = useState([])

    const handleDuplicates = () => {
        let dataId = 0
        flightList.map((item) => {
            item.outbound.map((data) => {
                dataArr.push({ id: dataId++, name: data.airlineDetails.name, amount: item.amount, logo: data.airlineDetails.logo, currency: item.currency, airline: data.airlineDetails.code })
            })
        })
        const unique2 = dataArr.filter((obj, index) => {
            return index === dataArr.findIndex(o => obj.name === o.name);
        });
        if (airlines?.includes('all')) {
            unique2.map((item) => {
                if (!airlines?.includes(item.airline)) {
                    airlines.push(item.airline)
                }
            })
        }
        return unique2.map((item, i) => (
            <SwiperSlide className={`bg-white text-mainblue w-[8rem] break-words h-auto cursor-pointer hover:shadow-lg transition-all rounded-md border`} key={i}>
                <div onClick={() => handleAirlines(item)} className="flex items-center justify-center hover:bg-blue-50 flex-col h-[7rem]">
                    <img src={item.logo} alt="" className="w-8 h-8 object-cover" />
                    <div className="font-semibold text-xs text-center mt-3 w-10/12">{item.name}</div>
                </div>
                <div onClick={() => handlleAirlinePrice(item)} className="">
                    <div className="text-center hover:bg-blue-50 text-zinc-500 p-1.5 border-t text-sm font-medium">{NairaSign}{item.amount.toLocaleString()}</div>
                </div>
            </SwiperSlide>
        ))
    }
    const handleAirlines = (values) => {
        const finals = []
        flightList.map((item) => {
            item.outbound.map((data) => {
                if (data.airlineDetails.name === values.name) {
                    finals.push(item)
                }
            })
        })
        AirlineFrontendFilter(finals)
    }
    const handlleAirlinePrice = (values) => {
        const finals = []
        flightList.map((item) => {
            item.outbound.map((data) => {
                if (item.amount === values.amount) {
                    finals.push(item)
                }
            })
        })
        AirlineFrontendFilter(finals)
    }

    const ResetAirlines = () => {
        AirlineFrontendFilter(flightList)
    }
    return (
        <div className="mb-1">
            <div className="grid grid-cols-2">
                <div className="ml-5 text-sm"> <span className="font-semibold">Group by:</span> <span className="text-mainblue">Airline</span> </div>
                <button onClick={ResetAirlines} className="flex items-center justify-end mr-5 text-mainblue capitalize"> <BsFilterRight /> reset</button>
            </div>
            <div className="grid grid-cols-1 my-4 md:grid-cols-7">
                <div className="md:col-span-2 hidden md:block">
                    <div className=" w-[8rem] break-words">
                        <div className="h-[7rem]"></div>
                        <div className="p-1.5 font-semibold text-zinc-500 text-center border-t text-sm">Compare</div>
                    </div>
                </div>
                <div className="md:col-span-5 overflow-x-auto scrollsdown ">
                    {/* <div className="flex justify-center mx-auto gap-1 w-fit py-4 items-stretch"> */}
                        <div className="relative">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={5}
                                centeredSlides={false}
                                slidesPerGroupSkip={1}
                                grabCursor={true}
                                keyboard={{
                                    enabled: true,
                                }}
                                breakpoints={{
                                    769: {
                                        slidesPerView: 4,
                                        slidesPerGroup: 1,
                                    },
                                }}
                                scrollbar={false}
                                navigation={true}
                                loop={true}
                                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                                className='mySwiper'
                            >
                                {handleDuplicates()}
                            </Swiper>
                        </div>
                        {/* {handleDuplicates()} */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default AllAirlines

