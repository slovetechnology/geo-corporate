import Loading from '/src/components/Loading'
import { NairaSign } from '/src/components/functions'
import Popup from '/src/components/Popup'
import React, { useState } from 'react'
import { AlertError } from '/src/components/functions'
import { AuthPostApi, MainApi } from '/src/services/Geoapi'
import { onlinesitename } from '/src/services/Geoapi'

const TransactionDetailsModal = ({ closeView, data }) => {
    const [loading, setloading] = useState(false)
    const [screen, setScreen] = useState(1)
    const OffetBill = () => {
        setScreen(2)
    }

    const ConfirmRequest = async () => {
        setloading(true)
        const formbody = {
            redirect_url: `${onlinesitename}geo/verify-request/`,
            invoice_id: data.id,
        }
        try {
            const response = await AuthPostApi(MainApi.auth.offset_bill, formbody)
            window.location.assign(response.flutter_payment[0])
        } catch (error) {
            AlertError(`${error.message}`)
        }finally {
            setloading(false)
        }
    }
    return (
        <Popup onclose={closeView}>
            {loading && <Loading />}
            {screen === 2 && <>
                <div className="p-3 border-b">
                    <div className="text-xl font-bold">Offset Bill</div>
                </div>
                <div className="text-center font-bold mt-10">Kindly confirm your request to offset this bill</div>
                <div className="grid grid-cols-2 gap-10 mt-10">
                    <button className="bg-slate-300 py-3 px-5 rounded-md capitalize">cancel</button>
                    <button onClick={ConfirmRequest} className="bg-mainblue text-white py-3 px-5 rounded-md capitalize">proceed</button>
                </div>
            </>}
            {screen === 1 && <>
                <div className="p-3 border-b">
                    <div className="text-xl font-bold">Transaction Details</div>
                </div>
                <div className="text-slate-500 pt-2">Customer Name</div>
                <div className="font-bold text-xl mb-4">{data.name}</div>
                <div className="grid grid-cols-2 gap-5 mb-3 py-2">
                    <div className="">
                        <div className="text-slate-500">Amount</div>
                        <div className="font-bold text-xl">{NairaSign}{parseInt(data.amount)?.toLocaleString()}</div>
                    </div>
                    <div className="">
                        <div className="text-slate-500">Booking Code</div>
                        <div className="font-bold text-xl">{data.booking_code}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3 py-2">
                    <div className="">
                        <div className="text-slate-500">Module</div>
                        <div className="font-bold text-xl">{data.module}</div>
                    </div>
                    <div className="">
                        <div className="text-slate-500">Customer Email</div>
                        <div className="font-bold text-xl">{data.email}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3 py-2">
                    <div className="">
                        <div className="text-slate-500">Customer Contact</div>
                        <div className="font-bold text-xl">{data.phonenumber}</div>
                    </div>
                    <div className="">
                        <div className="text-slate-500">Reference ID</div>
                        <div className="font-bold text-xl">{data.reference}</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3 py-2">
                    <div className="">
                        <div className="text-slate-500">Payment Status</div>
                        <div className="font-bold text-xl">{data.status}</div>
                    </div>
                </div>
                <div className="border-t pt-3">
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="text-slate-500">Date Initiated</div>
                            <div className="font-bold text-lg">{data.date_initiated}</div>
                        </div>
                        {data.status.toLowerCase().includes('unpaid') && <div className="">
                            <button onClick={OffetBill} className="bg-mainblue w-full text-white py-4 px-5 rounded-lg capitalize">Offset bill</button>
                        </div>}
                    </div>
                </div>
            </>}
        </Popup>
    )
}

export default TransactionDetailsModal
