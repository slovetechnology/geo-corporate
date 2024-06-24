import Header from "/src/components/components/Header";
import Flightcard from "/src/components/components/flights/Flightcard";
import { FlightcardUsers } from "/src/components/services/functions";
import Layout from "/src/layouts/Layout";
import SingleFlightOffer from "./SingleFlightOffer";


export default function FlightSelector() {
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
                        {new Array(10).fill(0).map((item, index) => (
                            <div key={index} id={item}>
                                <SingleFlightOffer />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-3"></div>
                </div>
            </div>
        </Layout>
    )
}
