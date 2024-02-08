import GeoLayout from '/src/components/GeoLayout'
import React, { useEffect, useState } from 'react'
import { AuthGetApi, MainApi } from '/src/services/Geoapi'
import {useSelector} from 'react-redux'
import ViewTicket from '/src/components/flight/ViewTicket'
import SingleTransaction from '/src/Pages/Account/SingleTransaction'


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


const Transaction = () => {
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
      setSingle({
          status: true,
          data: data
      })
  }
  return (
    <GeoLayout>
    <div className='mt-10 w-11/12 mx-auto'>
    {single.status && <ViewTicket flight={single.data} closeView={() => setSingle({...single, status: false})} /> }
    <div className="w-full overflow-x-auto scrollsdown">
        <div className="bg-white">
            <table className="table table-auto w-full border">
                <thead>
                    <tr className='border-b'>
                        {TableHeaders.map((item, i) => (
                            <td className='p-3 border-r last:border-none font-bold ' key={i}>{item}</td>
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
    </GeoLayout>
  )
}

export default Transaction
