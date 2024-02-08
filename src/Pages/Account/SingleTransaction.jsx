import React, { useEffect, useState } from 'react'
import ApiRoutes from '/src/services/ApiRoutes';
import HttpServices from '/src/services/Tiqwaapi';
import { formatAirportTitle } from '/src/components/functions';
import { NairaSign } from '/src/components/functions';
import moment from 'moment';
import { WebDateFormat } from '/src/components/functions';

const SingleTransaction = ({ item, HandleTicketViewing}) => {
    const [flight, setFlight] = useState({})
    useEffect(() => {
        const FetchFlight = async () => {
            try {
                const result = await HttpServices.get(
                    `${ApiRoutes.flights.manage_booking}/${item.booking_code}`
                );
                const payload = result.data.data;
                if(result.data.success) return setFlight(payload)
            } catch (error) {
                //
            }
        }
        FetchFlight()
    }, [])


    return (
        <>
        <tr className='border-b'>
            <td className='p-3 border-r'>{item.name}</td>
            <td className='p-3 border-r'>{NairaSign}{parseInt(item?.amount)?.toLocaleString()}</td>
            <td className='p-3 border-r'>{Object.keys(flight).length > 0 ?  formatAirportTitle(flight?.outbound[0]?.airportFrom) : ''}</td>
            <td className='p-3 border-r'>{Object.keys(flight).length > 0 ?  formatAirportTitle(flight?.outbound[0]?.airportTo) : ''}</td>
            <td className='p-3 border-r'>{Object.keys(flight).length > 0 ? moment(flight?.outbound[0]?.departureTime).format(WebDateFormat) : ''}</td>
            <td className='p-3 border-r'>{item.organization_name || '--'}</td>
            <td className='p-3 border-r'>--</td>
            <td className='p-3 cursor-pointer' onClick={() => HandleTicketViewing(flight)}>View Ticket</td>
        </tr>
        </>
    )
}

export default SingleTransaction