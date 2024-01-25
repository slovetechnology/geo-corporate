import React from 'react'
import { Link } from 'react-router-dom'


const TableHeaders = [
    "Traveller's Name",
    "Origin",
    "Destination",
    "Origin Date/Time",
    "Initiated By",
    "Approved By",
    "---",
]
const DashboardTransactions = () => {
    return (
        <div className='mt-10'>
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
                            <tr className='border-b bg-zinc-200'>
                                {TableHeaders.map((item, i) => (
                                    <td className='p-3 border-r last:border-none border-zinc-400 font-bold' key={i}>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {new Array(5).fill(0).map((item, i) => (
                                <tr className='border-b' key={i}>
                                    <td className='p-3 border-r'>Kalistus Madu</td>
                                    <td className='p-3 border-r'>Lagos</td>
                                    <td className='p-3 border-r'>Abuja</td>
                                    <td className='p-3 border-r'>10/20/2024 05:10:20AM</td>
                                    <td className='p-3 border-r'>Organization Name</td>
                                    <td className='p-3 border-r'>Organization Staff</td>
                                    <td className='p-3'>View Ticket</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardTransactions
