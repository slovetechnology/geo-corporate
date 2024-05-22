
import Layout from '/src/layouts/Layout'
import Header from '/src/components/components/Header'
import { SlMagnifier } from 'react-icons/sl'
import { useState } from 'react'
import ViewTicket from '/src/components/components/ViewTicket'
import Alert from '/src/components/utils/Alert'
import SingleTransaction from './SingleTransaction'
import { useAtom } from 'jotai'
import { OrgProfile } from '/src/layouts/layoutStore'

const dataKeys = [
    "",
    "Traveller's Name",
    "Amount Paid",
    "Origin",
    "Destination",
    "Origin Date/Time",
    "Payment Status",
    "---",
]

export default function Transactions() {
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [single, setSingle] = useState({ status: false, data: {} })
    const [profile,] = useAtom(OrgProfile)

    function HandleTicketViewing(value: any) {
        if (value?.amount) {
            return setSingle({ status: true, data: value })
        }
        setTimeout(() => {
            setMsg({ status: "", message: "" })
        }, 2000);
        return setMsg({ message: 'Looks like this transaction is not connected to a flight ticket', status: "error" })
    }

    return (
        <Layout>
            {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({ ...single, status: false })} />}

            {msg.message && <Alert status={msg.status} message={msg.message} />}
            <Header />
            <div className="grid grid-cols-2 w-11/12 mx-auto">
                <div className="">
                    {/* <button className='btn capitalize h-[2.8rem] px-4 text-white rounded-lg font-medium'>add passenger</button> */}
                </div>
                <div className="">
                    <div className="rounded-full py-0 px-3 flex items-center bg-zinc-200 w-full lg:w-3/6 ml-auto">
                        <SlMagnifier />
                        <input type="text" className="input bg-transparent outline-none text-sm !border-none" placeholder='Search...' />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                    <div className="overflow-x-auto p-5">
                        <div className=' w-fit lg:w-full'>
                            <div className="tablediv">
                                <table>
                                    <thead>
                                        <tr>
                                            {dataKeys.map((ele: string, index: number) => (
                                                <th className='truncate' key={index}>{ele}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {profile.payment_history?.length > 0 ? profile.payment_history?.map((item: any, index: number) => (
                                         item.booking_code !== null && <SingleTransaction
                                                item={item}
                                                key={index}
                                                HandleTicketViewing={HandleTicketViewing} />
                                        )) : 
                                        <tr className="tr-extra">
                                            {dataKeys.slice(0, -1).map((ele: string, index: number) => (
                                              <th className="" key={index}> <div className="w-10 mx-auto mt-5 h-1 bg-slate-500 rounded-lg" id={ele}></div></th>
                                            ))}
                                        </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        </Layout>
    )
}


