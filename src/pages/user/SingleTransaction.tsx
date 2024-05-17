import { useQuery } from "@tanstack/react-query"
import { Apis, TiqwaGetApi } from "/src/components/services/Api"
import { NairaSign, formatAirportTitle } from "/src/components/services/functions"
import moment from "moment"

type Props = {
    item: any,
    HandleTicketViewing: (event: string) => void
}

const Status = [
    { stat: ['PAID', 'paid'], cl: 'text-[#57b014] bg-[#e9f8e9] text-xs rounded-lg font-bold py-1.5 px-4' },
    { stat: ['APPROVED UNPAID'], cl: 'text-[#f5b334] bg-[#fff8df] text-xs rounded-lg font-bold py-1.5 px-4' },
]

export default function SingleTransaction({ item, HandleTicketViewing }: Props) {
const {data, isLoading} = useQuery({
    queryKey: ['dsh-flights'],
    queryFn: async () => {
        const response = await TiqwaGetApi(`${Apis.manage_bookings}/${item?.booking_code}`)
        return response.data
    }
})
const OpenSingleRecord = (value: any) => {
    console.log(value)
}

const OpenTicket = (e: any) => {
    e.stopPropagation()
    HandleTicketViewing(data)
}
if(isLoading) return null
    return (
        <tr className='tr-extra'
        onClick={() => OpenSingleRecord({item, data})}
        >
            <td className="truncate">{item.name}</td>
            <td className="truncate">{NairaSign}{parseInt(item?.amount)?.toLocaleString()}</td>
            <td className="truncate">{Object.keys(data).length > 0 ? formatAirportTitle(data?.outbound[0]?.airportFrom) : ''}</td>
            <td className="truncate">{Object.keys(data).length > 0 ? formatAirportTitle(data?.outbound[0]?.airportTo) : ''}</td>
            <td className="truncate">{Object.keys(data).length > 0 ? moment(data?.outbound[0]?.departureTime).format('MMM MM, YYYY') : ''}</td>
            <td className="uppercase truncate text-sm" ><span className={Status.find((ele: any) => ele.stat.includes(item.status))?.cl}>{item.status}</span></td>
            <td className="cursor-pointer truncate underline" onClick={OpenTicket}>View Ticket</td>
        </tr>
    )
}
