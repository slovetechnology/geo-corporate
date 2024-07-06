

import img from "/src/assets/images/bagage.svg"
import img1 from "/src/assets/images/bagage2.svg"
import img2 from "/src/assets/images/airline.svg"
import Formbutton from "/src/components/utils/Formbutton";
import { useState } from "react";
import { SlClock } from "react-icons/sl";

export default function SingleFlightOffer() {
    const [open, setOpen] = useState(false)
    return (

        <div className="bg-white dropshad2 rounded-3xl border mb-3">
            <div className="grid grid-cols-1 lg:grid-cols-10">
                <div className="lg:col-span-7 py-7 pl-7 border-r-2 border-dotted">
                    <div className="grid grid-cols-4 text-sm gap-2">
                        <div className="">
                            <img src={img2} alt="" className="" />
                            <div className="">lufthansa</div>
                        </div>
                        <div className="">
                            <div className="tts">8:45 PM</div>
                            <div className="">los.  May 1</div>
                        </div>
                        <div className="">
                            <div className="text-center text-xs py-1">19h 15m</div>
                            <div className="w-full h-[0.05rem] bg-zinc-500"></div>
                            <div className="text-center text-xs py-1">1 stop</div>
                        </div>
                        <div className="">
                            <div className="tts">5:00 AM</div>
                            <div className="">NBO.  May 2</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 text-sm gap-2 mt-10 w-full">
                        <div className="">
                            <img src={img2} alt="" className="" />
                            <div className="">lufthansa</div>
                        </div>
                        <div className="">
                            <div className="tts">8:45 PM</div>
                            <div className="">los.  May 1</div>
                        </div>
                        <div className="">
                            <div className="text-center text-xs py-1">19h 15m</div>
                            <div className="w-full h-[0.05rem] bg-zinc-500"></div>
                            <div className="text-center text-xs py-1">1 stop</div>
                        </div>
                        <div className="">
                            <div className="tts">5:00 AM</div>
                            <div className="">NBO.  May 2</div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 py-7 pr-7">
                    <div className="flex items-center justify-end gap-3">
                        <img src={img} alt="" className="" />
                        <img src={img1} alt="" className="" />
                    </div>
                    <div className="text-right text-xs text-zinc-500 mt-1">Included: personal item, carry-on bag, checked bag</div>
                    <div className="tts text-xl text-right mt-12 tts">₦3,000,000</div>
                    <div className="-mt-3 w-4/5 ml-auto">
                        <Formbutton title={open ? 'Hide Details' : "View Details"} type="button" onClick={() => setOpen(!open)} />
                    </div>
                </div>
            </div>
            {open && <>
                <div className="py-7 w-11/12 mx-auto border-y">
                    <div className="mb-5">
                        <div className="tts">Flight to Kenya</div>
                        <div className="text-xs font-extralight">1 Stop  .  9h </div>
                        <div className="grid grid-cols-7 text-xs mb-10">
                            <div className="col-span-5 pl-4 mt-3">
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LOS  .  Muritala mohammed airport</div>
                                </div>
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LFW  .  Lomé-Tokoin Airport </div>
                                </div>
                                <div className="flex items-center gap-3 ml-3">
                                    <SlClock />
                                    <div className="">Layover 2h 15m</div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                    <img src={img2} alt="" className="w-30 h-30" />
                                    <div className="">Lufthansa <div>AC828  .  Economy Flight time 1h</div> </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 text-xs">
                            <div className="col-span-5 pl-4 mt-3">
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LOS  .  Muritala mohammed airport</div>
                                </div>
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LFW  .  Lomé-Tokoin Airport </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                    <img src={img2} alt="" className="w-30 h-30" />
                                    <div className="">Lufthansa <div>AC828  .  Economy Flight time 1h</div> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="tts">Flight to Lagos</div>
                        <div className="text-xs font-extralight">1 Stop  .  9h </div>
                        <div className="grid grid-cols-7 text-xs">
                            <div className="col-span-5 pl-4 mt-3">
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LOS  .  Muritala mohammed airport</div>
                                </div>
                                <div className="mb-3">
                                    <div className="">Wed, May 1   .   10:25 AM</div>
                                    <div className="tts">LFW  .  Lomé-Tokoin Airport </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center gap-2">
                                    <img src={img2} alt="" className="w-30 h-30" />
                                    <div className="">Lufthansa <div>AC828  .  Economy Flight time 1h</div> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-5 py-7 w-11/12 border-b mx-auto">
                    <div className="col-span-2">
                        <div className="tts">Baggage</div>
                        <div className="text-xs">The total baggage included in the price</div>
                    </div>
                    <div className="col-span-3 border-l border-zinc-300 pl-5">
                        {new Array(2).fill(0).map((ele, index) => (
                            <div className="mb-4" id={ele} key={index}>
                                <div className="tts mb-3">{index === 0 ? 'Flight to Kenya' : 'Flight to Lagos'}</div>
                                {new Array(3).fill(0).map((item, i) => (
                                    <div className="mb-4" id={item} key={i}>
                                        <div className="flex items-center gap-5">
                                            <img src={i === 2 ? img : img1} alt="" className="w-7 h-auto" />
                                            <div className="w-full text-xs">
                                                <div className="">1 personal item</div>
                                                <div className="grid grid-cols-7">
                                                    <div className="col-span-5">Fits under the seat in front of you</div>
                                                    <div className="text-primary text-right">Included</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-11/12 mx-auto py-7 text-sm">
                    <div className="grid grid-cols-7">
                        <div className="col-span-5">
                            <div className="tts text-xl">₦3,000,000</div>
                            <div className="">Total price for all travelers</div>
                        </div>
                        <div className="col-span-2 w-3/5 ml-auto">
                            <Formbutton title="Pay Now" type="button" />
                        </div>
                    </div>
                    <div className="grid grid-cols-7">
                        <div className="col-span-5">
                            <div className="tts text-xl">₦5,000,000</div>
                            <div className="">Total price for all travelers</div>
                        </div>
                        <div className="col-span-2 w-3/5 ml-auto">
                            <Formbutton title="Pay Later" type="button" />
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}
