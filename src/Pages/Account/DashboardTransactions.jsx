import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthGetApi, MainApi } from '/src/services/Geoapi'
import {useSelector} from 'react-redux'
import SingleTransaction from './SingleTransaction'
import ViewTicket from '/src/components/flight/ViewTicket'
import { AlertError } from '/src/components/functions'


const TableHeaders = [
    "Traveller's Name",
    "Amount Paid",
    "Origin",
    "Destination",
    "Origin Date/Time",
    "Initiated By",
    "Approved By",
    "---",
]
const DashboardTransactions = () => {
    const {user} = useSelector(state => state.data)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [single, setSingle] = useState({
        status: false,
        data: {}
    })
    useEffect(() => {
        const FetchTransactions = async () => {
            setLoading(false)
            try {
                const response = await AuthGetApi(`${MainApi.auth.all_payments}/${user.id}`)
                if(response.status === 200) {
                    setItems(response.data)
                }
            } catch (error) {
                //
            }finally {
                setLoading(false)
            }
        }
        FetchTransactions()
    }, [])
    const HandleTicketViewing = (data) => {
        if(Object.keys(data).length > 0) {
            return setSingle({
                status: true,
                data: data
            })
        }
        return AlertError('Looks like this transaction is not connected to a flight ticket')
    }
    return (
        <div className='mt-10'>
        {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({...single, status: false})} /> }
            <div className="grid grid-cols-2 mb-5">
                <div className="font-bold text-3xl">Latest Transactions</div>
                <div className="w-fit ml-auto mt-4">
                    <Link to="/geo/transactions" className="bg-mainblue py-2 px-4 rounded-lg text-sm text-white">View more</Link>
                </div>
            </div>
            <div className="w-full overflow-x-auto scrollsdown">
                <div className="bg-white">
                    <table className="table table-auto w-full border">
                        <thead>
                            <tr className='border-b'>
                                {TableHeaders.map((item, i) => (
                                    <td className='p-3 border-r last:border-none font-bold' key={i}>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && items.length > 0 && items.slice(0, 5).map((item, i) => (
                                <SingleTransaction key={i} item={item} HandleTicketViewing={HandleTicketViewing} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardTransactions
