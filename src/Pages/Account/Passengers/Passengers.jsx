import { AlertError } from '/src/components/functions'
import GeoLayout from '/src/components/GeoLayout'
import React, { useCallback, useEffect, useState } from 'react'
import { AuthGetApi, MainApi } from '/src/services/Geoapi'
import aeroplaneImg from "/src/assets/images/aeroplane.svg";
import PassengersModal from './PassengersModal';

const TableHeaders = [
    "Title",
    "First Name",
    "Middle Name",
    "Last Name",
    "Gender",
    "Phone Number",
    "Email Address",
    "Date of birth",
]
const Passengers = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [opens, setOpens] = useState({
        status: false,
        data: {}
    })

    const FetchPassengers = useCallback(async () => {
        setLoading(true)
        try {
            const response = await AuthGetApi(MainApi.passengers.list)
            console.log(response.data)
            if (response.status === 200) {
                setItems(response.data)
            }
        } catch (error) {
            return AlertError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchPassengers()
    }, [FetchPassengers])
    return (
        <GeoLayout>
{opens.status && <PassengersModal 
onclose={() => setOpens({...opens, status: false})}
refetch={() => FetchPassengers()}
data={opens.data}
/> }
            <div className="w-11/12 mx-auto mt-10">
            <div className='bg-[#272A55] text-white py-12 px-10 relative mb-10'>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className='col-span-2'>
                            <p className=''>Total Passengers</p>
                            <p className='text-xl font-semibold'>{items?.length || 0}</p>
                        </div>
                        <div className="w-fit ml-auto z-[1]">
                            <button onClick={() => setOpens({...opens, status: !opens.status, data: {}})} className="bg-white text-black py-3 px-4 rounded-lg">Add Passenger</button>
                        </div>
                    </div>
                    <img src={aeroplaneImg} alt='aeroplaneImg' className='-z-[0] w-40 absolute right-6 top-8' />
                </div>
            <div className="w-full overflow-x-auto scrollsdown">
                <div className="bg-white">
                    <table className="table bg-white table-auto w-full border">
                        <thead>
                            <tr className='border-b'>
                                {TableHeaders.map((item, i) => (
                                    <td className='p-3 border-r last:border-none font-bold' key={i}>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && items.length > 0 && items.slice(0, 5).map((item, i) => (
                                <tr key={i} className="border-b cursor-pointer"
                                onClick={() => setOpens({
                                    ...opens,
                                    status: true,
                                    data: item
                                })}
                                >
                                    <td className='p-3 border-r'>{item.title}</td>
                                    <td className='p-3 border-r'>{item.first_name}</td>
                                    <td className='p-3 border-r'>{item.middle_name}</td>
                                    <td className='p-3 border-r'>{item.last_name}</td>
                                    <td className='p-3 border-r'>{item.gender}</td>
                                    <td className='p-3 border-r'>{item.phone}</td>
                                    <td className='p-3 border-r'>{item.email_address}</td>
                                    <td className='p-3 border-r'>{item.date_of_birth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <div className="text-center mt-10">Loading contents....</div> }
                </div>
            </div>
            </div>
        </GeoLayout>
    )
}

export default Passengers
