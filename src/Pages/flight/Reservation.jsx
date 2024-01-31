import spins from "/src/assets/images/spins.gif";
import BookedFlightItinerary from "/src/components/flight/BookedFlightItinerary";
import ReservationTicket from "/src/components/flight/ReservationTicket";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import failimg from '/src/assets/images/fails.png'
import { AlertError } from "/src/components/functions";
import { usePDF } from "react-to-pdf";
import GeoLayout from "components/GeoLayout";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";


const Reservation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searched,] = useSearchParams()
  const [zone, setZone] = useState(1)
  const stats = searched.get('status')
  const [view, setView] = useState(false)
  const [flight, setFlight] = useState({});
  const [details, setDetails] = useState({})
  const [loads, setLoads] = useState(false)
  const [err, setErr] = useState({
    stat: false,
    message: ''
  })
  const { toPDF, targetRef } = usePDF({ filename: 'ticket.pdf', canvas: {
    useCORS: true
 }});

  const RunBooking = async () => {
    try {
      const res = await HttpServices.get(`${ApiRoutes.flights.manage_booking}/${id}`);
      const payload = res.data.data;
      if (res.data.success) {
        return setFlight(payload);
      }
      return setErr({
        stat: true,
        message: 'unable to find your booking'
      })
    } catch (error) {
      return AlertError(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchBookReservation = useCallback(async () => {
    if (stats) {
      if (stats === 'cancelled') {
        setTimeout(() => {
          setLoading(false);
          setZone('2')
        }, 5000);
      } else {
        RunBooking()
      }
    } else {
      RunBooking()
    }
  }, [id]);

  useEffect(() => {
    fetchBookReservation();
    // eslint-disable-next-line
  }, [fetchBookReservation]);


  const handleView = value => {
    setDetails(details)
    setView(!view);
  };

  if (err.stat) return (
    <GeoLayout>
      <div className="">
        <div className="flex items-center flex-col justify-center pt-5">
          <img src={failimg} alt="" className="w-[15rem]" />
          <div className="font-bold text-zinc-600">Looks like your transaction was not successful!.</div>
        </div>
      </div>
    </GeoLayout>
  )

  if (!err.stat) return (
    <GeoLayout className='bg-sky-50/50'>
      {view && <BookedFlightItinerary flight={flight} closeView={() => setView(!view)} />}
      {loading && (
        <div className='w-fit mx-auto pt-20'>
          <img src={spins} className="w-20" alt='' />{" "}
        </div>
      )}
      <div className=''>
        {!loading && (
          zone === 1 ?
            <div>
              <div className='grid grid-cols-2 w-10/12 mx-auto mt-16'>
                <div className='font-semibold text-2xl text-zinc-600'>
                  Found a matching flight{" "}
                  <span className='font-light text-sm uppercase'>{flight.reference}</span>{" "}
                </div>
                {!flight.ticketed && <div className=''>
                  <div className='text-right capitalize'>status</div>
                  {new Date(flight?.expiresAt).getTime() < Date.now() && (
                    <div className='text-right capitalize text-orange-400'>Expired</div>
                  )}
                  {new Date(flight?.expiresAt).getTime() > Date.now() && (
                    <div className='text-right capitalize text-green-400'>Active</div>
                  )}
                </div>}
              </div>
              <div className="max-w-[1160px] mx-auto">
                <div ref={targetRef} className="outcome mb-10 h-fit">
                  <ReservationTicket flight={flight} />
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <button onClick={handleView} className='my-10 capitalize bg-mainblue text-white rounded-lg py-3 px-6'>view flight itinerary</button>
                {flight.ticketed && <button disabled={!loads ? false : true} onClick={() => toPDF()} className={`my-10 border ${!loads ? 'border-mainblue text-mainblue' : 'borderslate-700 text-slate-600 cursor-pointer'} py-3 px-6 rounded-lg`}>{loads ? 'Downloading ticket' : 'Print / Download Ticket'}</button>}
                {/* {flight.ticketed &&  <button disabled={!loads ? false : true} onClick={DownloadPDF} className={`my-10 border ${!loads ? 'border-mainblue text-mainblue' : 'borderslate-700 text-slate-600 cursor-pointer'} py-3 px-6 rounded-lg`}>{loads ? 'Downloading ticket' : 'Print / Download Ticket'}</button>} */}
              </div>
            </div>
            :
            <div className="">
              <div className="flex items-center flex-col justify-center pt-5">
                <img src={failimg} alt="" className="w-[15rem]" />
                <div className="font-bold text-zinc-600">Looks like your transaction was not successful!.</div>
              </div>
            </div>
        )}
      </div>    </GeoLayout>
  );
};

export default Reservation;