import { useAtom } from "jotai";
import Layout from "/src/layouts/Layout";
import { Company } from "/src/layouts/layoutStore";
import { Apis, AuthGetApi } from "/src/components/services/Api";
import SingleTransaction from "./SingleTransaction";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "/src/components/utils/Alert";
import img from '/src/assets/images/dd.svg'
import ViewTicket from "/src/components/components/ViewTicket";
import { useQuery } from "@tanstack/react-query";
import UploadDocument from "./UploadDocument";





const dataKeys = [
    "",
    "Traveller's Name",
    "Amount Paid",
    "Origin",
    "Destination",
    "Origin Date/Time",
    "Initiated By",
    "Approved By",
    "Payment Status",
    "---",
]

export default function Dashboard() {
    const [comp,] = useAtom(Company)
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [single, setSingle] = useState({ status: false, data: {} })
    const [image, setImage] = useState<any>({ img: null, file: '' })
    const [views, setViews] = useState(false)


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

    const { data, isLoading } = useQuery({
        queryKey: ['dsh-payments'],
        queryFn: async () => {
            const response = await AuthGetApi(`${Apis.all_payments}?page_size=5`)
            if (response.status === 200) return response.data
        },
        staleTime: 0
    })

    function HandleTicketViewing(value: any) {
        if (value?.amount) {
            return setSingle({ status: true, data: value })
        }
        setTimeout(() => {
            setMsg({ status: "", message: "" })
        }, 2000);
        return setMsg({ message: 'Looks like this transaction is not connected to a flight ticket', status: "error" })
    }

    if (isLoading) return (
        <Layout>
            <div className="font-extrabold text-[2.85rem]">Hello, {comp?.organization_name}</div>
            <div className="text-zinc-500">Welcome back!</div>
            <div className="mt-20">
            </div>
        </Layout>
    )

    return (
        <>
            {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({ ...single, status: false })} />}
            {views && <UploadDocument
            image={image}
                closeView={() => setViews(false)}
            />}
            {msg.message && <Alert status={msg.status} message={msg.message} />}
            <Layout>
                <div className="font-extrabold text-[2.85rem]">Hello, {comp?.organization_name}</div>
                <div className="text-zinc-500">Welcome back!</div>
                <label className="w-fit cursor-pointer">
                    <div className="h-[16.2rem] border-2 bg-[#76B3F933] mt-10 cursor-pointer border-dashed border-primary w-full rounded-lg flex items-center justify-center flex-col gap-6">
                        <img src={img} alt="" />
                        <div className="w-2/5 mx-auto text-center px-4">Select or drag your company’s identity document (CAC) to upload</div>
                    </div>
                    <input type="file" hidden onChange={handlePreview} />
                </label>
                <div className="mt-16">
                    <div className="overflow-x-auto p-5">
                        <div className=' w-fit lg:w-full'>
                            <div className="tablediv">
                                <div className="w-11/12 mx-auto grid grid-cols-5 pb-5">
                                    <div className="font-bold text-2xl col-span-4">Recent Transactions</div>
                                    <div className="col-span-1">
                                        <Link to="/transactions" className='text-primary underline capitalize'>view more</Link>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            {dataKeys.map((ele: string, index: number) => (
                                                <th key={index}>{ele}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 && data?.map((item: any, index: number) => (
                                            <SingleTransaction
                                                item={item}
                                                key={index}
                                                HandleTicketViewing={HandleTicketViewing} />
                                        ))}
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


