import { useQuery } from "@tanstack/react-query"
import { Apis, TiqwaGetApi } from "/src/components/services/Api"
import { NairaSign, WebDateFormat, formatAirportTitle } from "/src/components/services/functions"
import moment from "moment"

type Props = {
    item: any,
    HandleTicketViewing: (event: string) => void
}

const Status = [
    { stat: ['PAID', 'paid'], cl: 'text-[#57b014] bg-[#e9f8e9] rounded-lg font-bold py-1.5 px-4' },
    { stat: ['APPROVED UNPAID'], cl: 'text-[#f5b334] bg-[#fff8df] rounded-lg font-bold py-1.5 px-4' },
]

export default function SingleTransaction({ item, HandleTicketViewing }: Props) {
const {data, isLoading} = useQuery({
    queryKey: ['dsh-flights'],
    queryFn: async () => {
        const response = await TiqwaGetApi(`${Apis.manage_bookings}/${item?.booking_code}`)
        return response.data
    }
})
if(isLoading) return null
    return (
        <tr className='tr-extra'>
            <td>{item.name}</td>
            <td>{NairaSign}{parseInt(item?.amount)?.toLocaleString()}</td>
            <td>{Object.keys(data).length > 0 ? formatAirportTitle(data?.outbound[0]?.airportFrom) : ''}</td>
            <td>{Object.keys(data).length > 0 ? formatAirportTitle(data?.outbound[0]?.airportTo) : ''}</td>
            <td>{Object.keys(data).length > 0 ? moment(data?.outbound[0]?.departureTime).format(WebDateFormat) : ''}</td>
            <td>{item.organization_name || '--'}</td>
            <td>--</td>
            <td className="uppercase" ><span className={Status.find((ele: any) => ele.stat.includes(item.status))?.cl}>{item.status}</span></td>
            <td className="cursor-pointer" onClick={() => HandleTicketViewing(data)}>View Ticket</td>
        </tr>
    )
}
