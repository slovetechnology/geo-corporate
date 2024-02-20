import React, { useEffect, useState } from 'react'
import ApiRoutes from '/src/services/ApiRoutes';
import HttpServices from '/src/services/Tiqwaapi';
import { formatAirportTitle } from '/src/components/functions';
import { NairaSign } from '/src/components/functions';
import moment from 'moment';
import { WebDateFormat } from '/src/components/functions';
import { AuthGetApi, MainApi } from '/src/services/Geoapi';

const SingleTransaction = ({ item, HandleTicketViewing, PassDetails}) => {
    const [flight, setFlight] = useState({})
    useEffect(() => {
        const FetchFlight = async () => {
            try {
                if(item.booking_code) {

                const result = await HttpServices.get(
                    `${ApiRoutes.flights.manage_booking}/${item.booking_code}`
                );
                const payload = result.data.data;
                if(result.data.success) return setFlight(payload)
                }
            } catch (error) {
                //
            }
        }
        FetchFlight()
    }, [])

    return (
        <>
        <tr className='border-b cursor-pointer'
        onClick={() => PassDetails(item)}
        >
            <td className='p-3'>{item.name}</td>
            <td className='p-3'>{NairaSign}{parseInt(item?.amount)?.toLocaleString()}</td>
            <td className='p-3'>{Object.keys(flight).length > 0 ?  formatAirportTitle(flight?.outbound[0]?.airportFrom) : ''}</td>
            <td className='p-3'>{Object.keys(flight).length > 0 ?  formatAirportTitle(flight?.outbound[0]?.airportTo) : ''}</td>
            <td className='p-3'>{Object.keys(flight).length > 0 ? moment(flight?.outbound[0]?.departureTime).format(WebDateFormat) : ''}</td>
            <td className='p-3'>{item.organization_name || '--'}</td>
            <td className='p-3'>{item.status}</td>
            <td className='p-3 cursor-pointer' onClick={() => HandleTicketViewing(flight)}>View Ticket</td>
        </tr>
        </>
    )
}

export default SingleTransaction