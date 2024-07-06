import Header from "/src/components/components/Header";
import Flightcard from "/src/components/components/flights/Flightcard";
import { FlightcardUsers } from "/src/components/services/functions";
import Layout from "/src/layouts/Layout";
import SingleFlightOffer from "./SingleFlightOffer";
import { useState } from "react";


const OptionsTabs = [
    {
        title: 'Cheapest'
    },
    {
        title: 'Earliest'
    },
]

export default function FlightSelector() {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <Layout>
            <Header />
            <Flightcard
                reloadFlight={() => null}
                userType={FlightcardUsers.home}
                shadow={false}
            />
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
                    <div className="lg:col-span-5">
                        <div className="flex items-center justify-between mb-7 px-3 w-full max-w-[90rem] bg-white rounded-2xl h-[4.0625rem] border dropshad2">
                            {OptionsTabs.map((item: {title: string}, index: number) => (
                                <div 
                                onClick={() => setActiveTab(index)}
                                className={`${activeTab === index ? 'border-primary' : 'border-white'} border-b-2 h-full w-2/5 flex items-center justify-center cursor-pointer transition-all`} key={index}>{item.title}</div>
                            ))}
                        </div>
                        <div className="">
                        {new Array(10).fill(0).map((item, index) => (
                            <div key={index} id={item}>
                                <SingleFlightOffer />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="lg:col-span-3"></div>
                </div>
            </div>
        </Layout>
    )
}
