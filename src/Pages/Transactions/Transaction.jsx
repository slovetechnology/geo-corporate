import GeoLayout from '/src/components/GeoLayout'
import React, { useEffect, useState } from 'react'
import { AuthGetApi, MainApi } from '/src/services/Geoapi'
import { useSelector } from 'react-redux'
import ViewTicket from '/src/components/flight/ViewTicket'
import SingleTransaction from '/src/Pages/Account/SingleTransaction'
import { AlertError } from '/src/components/functions'
import aeroplaneImg from "/src/assets/images/aeroplane.svg";
import TransactionDetailsModal from './TransactionDetailsModal'


const TableHeaders = [
    "Traveller's Name",
    "Amount Paid",
    "Origin",
    "Destination",
    "Origin Date/Time",
    "Initiated By",
    "Payment Status",
    "---",
]


const Transaction = () => {
    const { user } = useSelector(state => state.data)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [opens, setOpens] = useState({
        status: false,
        data: {}
    })
    const [single, setSingle] = useState({
        status: false,
        data: {}
    })
    useEffect(() => {
        const FetchTransactions = async () => {
            setLoading(true)
            try {
                const response = await AuthGetApi(`${MainApi.auth.all_payments}/${user.id}`)
                if (response.status === 200) {
                    setItems(response.data)
                }
            } catch (error) {
                //
            } finally {
                  setLoading(false)
            }
        }
        FetchTransactions()
    }, [])
    const HandleTicketViewing = (data) => {
        setOpens({ ...opens, status: false })
        if (Object.keys(data).length > 0) {
            return setSingle({
                status: true,
                data: data
            })
        }
        return AlertError('Looks like this transaction is not connected to a flight ticket')
    }
    const PassDetails = (value) => {
        setOpens({
            status: true,
            data: value
        })
    }
    return (
        <GeoLayout>
            {opens.status && <TransactionDetailsModal
                closeView={() => setOpens({ ...opens, status: false })}
                data={opens.data}
            />}
            <div className='mt-10 w-11/12 mx-auto'>
                <div className='bg-[#272A55] text-white py-12 px-10 relative mb-10'>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className='col-span-2'>
                            <p className=''>Total Transactions</p>
                            <p className='text-xl font-semibold'>{items?.length || 0}</p>
                        </div>
                    </div>
                    <img src={aeroplaneImg} alt='aeroplaneImg' className='-z-[0] w-40 absolute right-6 top-8' />
                </div>
                {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({ ...single, status: false })} />}
                <div className="w-full overflow-x-auto scrollsdown">
                    <div className="bg-white">
                        <table className="table table-auto w-full border">
                            <thead>
                                <tr className='border-b'>
                                    {TableHeaders.map((item, i) => (
                                        <td className='p-3 last:border-none font-bold ' key={i}>{item}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && items.length > 0 && items.slice(0, 5).map((item, i) => (
                                    <SingleTransaction
                                        key={i} item={item}
                                        HandleTicketViewing={HandleTicketViewing}
                                        PassDetails={PassDetails}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {loading && <div className="text-center mt-10 pb-5 animate-pulse">Loading contents, do hold on....</div>}
                    </div>
                </div>
            </div>
        </GeoLayout>
    )
}

export default Transaction
