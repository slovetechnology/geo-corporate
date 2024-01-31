import PageLayout from '/src/components/navigation/PageLayout'
import React from 'react'
import FlightSelector from './FlightSelector'

const CheapFlights = () => {
    return (
        <PageLayout>
            <FlightSelector onDeals={false} />
        </PageLayout>
    )
}

export default CheapFlights