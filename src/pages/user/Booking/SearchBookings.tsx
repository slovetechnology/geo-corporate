import Header from "/src/components/components/Header";
import Flightcard from "/src/components/components/flights/Flightcard";
import { FlightcardUsers } from "/src/components/services/functions";
import Layout from "/src/layouts/Layout";

export default function SearchBookings() {
    return (
        <Layout>
            <Header />
            <Flightcard
                reloadFlight={() => null}
                userType={FlightcardUsers.home}
                shadow={false}
            />
        </Layout>
    )
}
