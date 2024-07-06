import img1 from '/src/assets/images/ap.svg'
import { useAtom } from 'jotai'
import { Company, OrgProfile } from '/src/layouts/layoutStore'
import { LuWallet } from 'react-icons/lu'
import { NairaSign } from '../services/functions'

type ColorProps = {
    color: string,
    text: string,
    min: number,
    max: number
} | undefined

export default function DashboardWallet() {
    const [comp,] = useAtom(Company)
    const [profile,] = useAtom(OrgProfile)


    const COLORTYPES = [
        {
            color: 'border-[#6cd719]',
            text: 'text-[#6cd719]',
            min: 0,
            max: 50
        },
        {
            color: 'border-amber-500',
            text: 'text-amber-500',
            min: 50,
            max: 70
        },
        {
            color: 'border-red-500',
            text: 'text-red-500',
            min: 70,
            max: 100
        },
    ]
    const ageColor: ColorProps = COLORTYPES.find(ele => ele.min <= comp.average_aging && ele.max >= comp.average_aging)

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 mt-10">
                <div className="lg:col-span-5">
                    <div className="border border-[#B3AFAF] w-[46.437rem] h-[22.187rem] bg-[#FDFEFF] rounded-2xl flex flex-col justify-center">
                        <div className="w-11/12 mx-auto px-3 py-10">
                            <div className="flex items-center justify-between">
                                <div className="tts">Balance</div>
                                <div className="flex items-center gap-5">
                                    <button className="btn2 !h-[2rem] !w-[6.375rem] rounded-full text-white">Approved</button>
                                    <button className="text-primary border border-primary !h-[2rem] !w-[6.375rem] rounded-full">Available</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-10 mt-6">
                                <div className="">
                                    <div className={`w-[14rem] border-[1rem] ${ageColor?.color || 'border-[#6cd719]'} h-[14rem] flex flex-col items-center justify-center rounded-full`}>
                                        <div className="text-5xl tts"> {comp.average_aging}% </div>
                                        <div className="">Spent Balance</div>
                                    </div>
                                </div>
                                <div className=" text-[2.81rem]">{NairaSign}{comp.postpaid_max?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white mb-4 rounded-xl shadow-2xl px-8 w-[18.18rem] h-[8rem] flex flex-col justify-center">
                        <div className="">Unpaid Transactions</div>
                        <div className="grid grid-cols-2 mt-5 gap-3">
                            <div className="text-xl">{comp.amount_owing?.toLocaleString() || 0}</div>
                            <div className="w-fit ml-auto"> <LuWallet className={`text-[2.2rem] ${ageColor?.text || 'text-[#76b3f9]'}`} /> </div>
                            {/* <div className="w-fit ml-auto"> <LuWallet className={`text-[2.2rem] text-[#77b2f9]`} /> </div> */}
                        </div>
                    </div>
                    <div className="bg-white mb-4 rounded-xl shadow-2xl px-8 w-[18.18rem] h-[8rem] flex flex-col justify-center">
                        <div className="">Total Flights</div>
                        <div className="grid grid-cols-2 mt-5">
                            <div className="text-2xl">{profile.payment_history?.length || 0}</div>
                            <div className="w-fit ml-auto"><img src={img1} alt="" className="" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
