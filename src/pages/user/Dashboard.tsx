import { useAtom } from "jotai";
import Layout from "/src/layouts/Layout";
import { Company, OrgProfile } from "/src/layouts/layoutStore";
import SingleTransaction from "./SingleTransaction";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "/src/components/utils/Alert";
import img from '/src/assets/images/dd.svg'
import ViewTicket from "/src/components/components/ViewTicket";
import UploadDocument from "./UploadDocument";
import Flightcard, { FlightRequest } from "/src/components/components/flights/Flightcard";
import { AccountType, FlightcardUsers } from "/src/components/services/functions";
import DashboardWallet from "/src/components/components/DashboardWallet";





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

export default function Dashboard() {
    const [comp,] = useAtom(Company)
    const [profile,] = useAtom(OrgProfile)
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [single, setSingle] = useState({ status: false, data: {} })
    const [image, setImage] = useState<any>({ img: null, file: '' })
    const [views, setViews] = useState(false)
    const locals = JSON.parse(localStorage.getItem(FlightRequest) || "null")

    useEffect(() => {
        if (locals) return localStorage.removeItem(FlightRequest)
    }, [])


    const handlePreview = (e: any) => {
        const value = e.target.files[0]
        if (value) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImage({
                    img: fileReader.result,
                    file: value
                });
            };
            fileReader.readAsDataURL(value);
            setViews(true)
        }
    };

    function HandleTicketViewing(value: any) {
        if (value?.amount) {
            return setSingle({ status: true, data: value })
        }
        setTimeout(() => {
            setMsg({ status: "", message: "" })
        }, 2000);
        return setMsg({ message: 'Looks like this transaction is not connected to a flight ticket', status: "error" })
    }

    // if (isLoading) return (
    //     <Layout>
    //         <div className="tts text-[2.85rem]">Hello, {comp?.organization_name}</div>
    //         <div className="text-zinc-500">Welcome back!</div>
    //         <div className="mt-20">
    //         </div>
    //     </Layout>
    // )

    return (
        <>
            {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({ ...single, status: false })} />}
            {views && <UploadDocument
                image={image}
                closeView={() => setViews(false)}
            />}
            {msg.message && <Alert status={msg.status} message={msg.message} />}
            <Layout>
                <div className="tts text-[2.8125rem] tts">Hello, {comp?.organization_name}</div>
                <div className="text-zinc-500">Welcome back!</div>
                {profile.documents?.length < 1 && <div className="">
                    <label className="w-fit cursor-pointer">
                        <div className="h-[16.2rem] border-2 bg-[#76B3F933] mt-10 cursor-pointer border-dashed border-primary w-full rounded-lg flex items-center justify-center flex-col gap-6">
                            <img src={img} alt="" />
                            <div className="w-2/5 mx-auto text-center px-4">Select or drag your company’s identity document (CAC) to upload</div>
                        </div>
                        <input type="file" hidden onChange={handlePreview} />
                    </label>
                </div>}
                {comp.account_type === AccountType.postpaid && <DashboardWallet />}
                <div className="mt-10">
                    <Flightcard
                        reloadFlight={() => null}
                        userType={FlightcardUsers.home}
                        shadow={true}
                    />
                </div>
                <div className="mt-16 -z-[99]">
                    <div className="overflow-x-auto p-5">
                        <div className=' w-fit lg:w-full'>
                            <div className="tablediv">
                                <div className="w-11/12 mx-auto grid grid-cols-5 pb-5">
                                    <div className="tts text-2xl col-span-4">Recent Transactions</div>
                                    <div className="col-span-1 w-fit ml-auto">
                                        <Link to="/transactions" className='text-[#A7A0FF] text-[1.0625rem] underline capitalize'>view more</Link>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            {dataKeys.map((ele: string, index: number) => (
                                                <th className="truncate" key={index}>{ele}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profile.payment_history?.length > 0 ? profile.payment_history.slice(0, 6)?.map((item: any, index: number) => (
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
        </>
    )
}


