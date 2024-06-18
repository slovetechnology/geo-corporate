import Header from "/src/components/components/Header";
import Flightcard from "/src/components/components/flights/Flightcard";
import { FlightcardUsers } from "/src/components/services/functions";
import Layout from "/src/layouts/Layout";
import img4 from '/src/assets/images/img4.jpg'
import Formbutton from "/src/components/utils/Formbutton";
import img from "/src/assets/images/img.jpg"
import img1 from "/src/assets/images/img1.jpg"
import img2 from "/src/assets/images/img2.jpg"
import img3 from "/src/assets/images/img3.jpg"

type DealType = {
    img: string;
    title: string;
    deal_price: string;
    price: string;
}

const Deals = [
    {
        img: img,
        title: "Tokyo, Japan",
        deal_price: "₦140,000",
        price: "₦640,000"
    },
    {
        img: img1,
        title: "Barcelona, Spain",
        deal_price: "₦140,000",
        price: "₦640,000"
    },
    {
        img: img2,
        title: "Kingston, Canada",
        deal_price: "₦140,000",
        price: "₦640,000"
    },
    {
        img: img3,
        title: "Florence, Italy",
        deal_price: "₦140,000",
        price: "₦640,000"
    },
]

export default function SearchBookings() {
    return (
        <Layout>
            <Header />
            <Flightcard
                reloadFlight={() => null}
                userType={FlightcardUsers.home}
                shadow={false}
            />
            <div
                style={{ background: `url(${img4})` }}
                className="h-[22.7rem] w-full rounded-3xl">
                <div className="bg-black/30 w-full h-full rounded-3xl">
                    <div className="grid grid-cols-3 w-11/12 mx-auto pt-16">
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-3xl tts">Save at least 25% this spring</div>
                            <div className="text-white text-sm">Travel during school holidays. Save 25% on select hotels. Book before March 25.</div>
                            <div className="w-3/6">
                                <Formbutton type="button" title="Book" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="my-10">
                <div className="tts text-2xl">Last minute deals</div>
                <div className="">Offers displayed: from March 22 to March 24</div>
                </div>
                <div className="overflow-x-auto scrollsdown">
                <div className="flex w-fit items-center gap-10">
                    {Deals.map((item: DealType, index) => (
                        <div className="w-[15rem]" key={index}>
                            <img src={item.img} alt="" className="w-full h-[14.5rem] rounded-xl" />
                            <div className="py-5">
                            <div className="text-xl font-bold">{item.title}</div>
                            <div className="flex items-center gap-3">
                                <div className="text-xl">{item.deal_price}</div>
                                <div className="text-sm line-through">{item.price}</div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </Layout>
    )
}
