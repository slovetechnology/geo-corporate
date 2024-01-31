import React from 'react'
import FlightSelector from './FlightSelector'
import PageLayout from '/src/components/navigation/PageLayout'
const Flight = () => {
  return (
    <PageLayout>
      <FlightSelector onDeals={false} />
    </PageLayout>
  )
}

export default Flight 