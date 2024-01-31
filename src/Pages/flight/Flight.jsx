
import FlightCard from "/src/components/flight/Flightcard";
import React, { useEffect, useRef, useState, Suspense } from "react";
import styled from "styled-components";
import Flightnavbar from "/src/components/flight/flightnavbar";
import Flightitenary from "/src/components/flight/flightitenary";
import FlightLoader from "/src/components/flight/flightLoader";
import { useNavigate } from "react-router-dom";
import Tripsummary from "./tripsummary";
import Payment from "./payment";
// import Success from "./success";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAddons } from '/src/app/dataSlice';
import FlightFilterComponent from "/src/components/flight/FlightFilterComponent"
import FlightOffer from "./flightOffer";
import { BackToTop } from "/src/components/functions";
import { AlertError } from "/src/components/functions";
import { dispatchRefundable } from "/src/app/dataSlice";
import { FlightRequest } from "/src/components/flight/Flightcard";
import moment from "moment";
import { FilterMultiCityRefundables } from "/src/components/functions";
import { TripName } from "/src/components/flight/Flightcard";
import { FirebaseImage } from "/src/components/functions";
import { BannerTypes } from "/src/components/functions";
import { dispatchSelectedAddons, storePassenger } from "/src/app/dataSlice";
import HttpServices from "/src/services/Tiqwaapi";
import ApiRoutes from "/src/services/ApiRoutes";
import GeoLayout from "/src/components/GeoLayout";
const Passengerdetail = React.lazy(() => import("./passengerdetail"))


function Flight({ onDeals }) {
  const navigate = useNavigate()
  const localTrip = JSON.parse(localStorage.getItem(TripName))
  const [flightError, setFlightError] = useState(`No Flight available at the moment, check your flight date and try again!.`)
  const [flightList, setFlightList] = useState([]);
  const [flightList2, setFlightList2] = useState([]);
  const [flightList3, setFlightList3] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [mobile, setMobile] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [pageItem, setPageItem] = useState(0)
  const [loadflight, setLoadflight] = useState(true)
  const [singleFlight, setSingleFlight] = useState({})
  const [ads, setAds] = useState([])
  const [displayed_flight, set_displayed_flight] = useState({
    open: false,
    data: null,
  });

  const dispatch = useDispatch()
  let earlytime = useRef()
  let maxsortPrice = useRef()
  let minsortPrice = useRef()

  // Flight Loader state
  const [flightLoading, setFlightLoading] = useState({
    open: true,
    flightData: {
      origin: "",
      destination: "",
      passenger: "",
      departureDate: '',
      returnDate: '',
      cabin: "",
      type: ''
    },
  });

  // filter flight by cheapest and earliest
  const sendFilteration = (tag, val) => {
    if (flightList) {
      if (tag === 'all') return setFlightList3(flightList)
      let data;
      if (tag === 'time') {
        data = flightList.filter(ele => ele.totalDuration === val)
      } else {
        data = flightList.filter(ele => parseInt(ele.amount) === val)
      }
      if (data.length > 0) {
        return setFlightList3(data)
      } else {
        setFlightList3([])
        return setFlightError(`Looks like we were unable to find a perfect match for you at the moment`)
      }
    }
  }

  // filter flight with stops
  const storeStops = val => {
    let filterData;
    if (flightList) {
      if (localTrip !== 'multi-city') {
        filterData = flightList.filter((item) => {
          return item.outboundStops === val
        })
      } else {
        let finals = flightList.filter(route => {
          const totalStops = route.routes.reduce((accumulator, segment) => {
            return accumulator + segment.totalSegmentStops;
          }, 0);
          // return totalStops;
          if (totalStops === 0) {
            return route
          } else if (val < 2) {
            if (val === totalStops) return route
          } else if (totalStops >= 2) {
            return route
          }
        })
        filterData = finals
      }
      if (val === 'all') {
        return setFlightList3(flightList)
      }
      setMobile(!mobile)
      if (filterData.length > 0) {
        return setFlightList3(filterData)
      } else {
        setFlightList3([])
        return setFlightError(`Looks like there are no flights at the moment with ${val} stops`)
      }
    }
  }


  // filter by price
  const handleFilterByPrice = val => {
    const result = flightList.filter((item) => {
      return item.amount >= val[0] && item.amount <= val[1]
    })
    if (result.length > 0) {
      return setFlightList3(result)
    } else {
      setFlightList3([])
      return setFlightError(`Looks like there are no flights at the moment with the minimum of ${val[0]} and maximum of ${val[1]}`)
    }
  }

  const handleRefunds = val => {
    const value = val === 'true' ? true : val === 'false' ? false : 'all'

    if (value === 'all') return setFlightList3(flightList)
    const result = flightList.filter(ele => (ele.inbound.length > 0 ? ele.inbound[0].refundable === value : ele.outbound[ele.outbound.length - 1].refundable === value))
    if (result.length > 0) {
      return setFlightList3(result)
    } else {
      setFlightList3([])
      return setFlightError(`Looks like there are no ${value ? 'refundable' : 'non-refundable'} tickets at the moment`)
    }
  }

  const total = []
  // filtr flight by airline
  const storeAirline = (total) => {
    setFlightList(total);
    setFlightList3(total)
  }


  const displayFlight = async (flight) => {
    let isRefundable;
    setSingleFlight({})
    if (localTrip !== 'multi-city') {
      isRefundable = flight.inbound.length > 0 ? flight.inbound[0].refundable ? 'refundable' : 'non-refundable' : flight.outbound[flight.outbound.length - 1].refundable ? 'refundable' : 'non-refundable'
    } else {
      isRefundable = FilterMultiCityRefundables(flight)
    }
    dispatch(dispatchRefundable(isRefundable))
    set_displayed_flight((prevState) => {
      return {
        ...prevState,
        open: true,
      };
    });
    setSingleFlight(flight)
    dispatch(dispatchSelectedAddons([]))
    dispatch(storePassenger([]))
  };

  // close modal
  const closeDisplay = () => {
    set_displayed_flight({
      open: false,
      data: null,
    });
  };


  const handleFlightEffectV2 = useCallback(async () => {
    const localTrip = JSON.parse(localStorage.getItem(TripName))
    const localMulties = JSON.parse(localStorage.getItem(FlightRequest))

    if (!localMulties) {
      navigate('/')
    }
    let people = parseInt(localMulties?.adults) + parseInt(localMulties?.children) + parseInt(localMulties?.infants)
    setLoadflight(true)
    setFlightLoading((prevState) => {
      return {
        ...prevState,
        open: true,
        flightData: {
          origin: localMulties.origin || localMulties.destinations[0]?.origin,
          destination: localMulties.destination || localMulties.destinations[localMulties.destinations?.length - 1]?.destination,
          departureDate: localMulties.departureDate || localMulties.destinations[0]?.departureDate,
          returnDate: localMulties.returnDate || '',
          passenger: people,
          cabin: localMulties.cabin,
          type: localMulties.flighttype,
        },
      };
    });
    try {

      setTimeout(async () => {
        let response;
        if (localTrip === 'multi-city') {
          let newMulties, newTrips = [];
          localMulties?.destinations?.map(ele => {
            const data = {
              origin: ele.origin,
              destination: ele.destination,
              departureDate: moment(ele.departureDate).format('YYYY-MM-DD')
            }
            newTrips.push(data)
          })
          newMulties = {
            ...localMulties,
            destinations: newTrips
          }
          response = await HttpServices.post(
            ApiRoutes.flights.multi_search_flight,
            newMulties
          )
        } else if (localTrip === 'return') {
          response = await HttpServices.post(
            ApiRoutes.flights.search_flight,
            localMulties
          );
        } else {
          const flighttrips = {
            ...localMulties,
            returnDate: ""
          }
          response = await HttpServices.post(
            ApiRoutes.flights.search_flight,
            flighttrips
          );
        }
        if (response.data.success) {
          setLoadflight(false)
          const payload = response?.data.data.results
          if (Array.isArray(payload) && payload.length > 0) {
            setFlightList(payload);
            setFlightList2(payload)
            setFlightList3(payload)
          } else {
            setFlightList([]);
            setFlightList2([]);
            setFlightList3([]);
          }
          // sorting through the data to get the highest price
          const findMax = payload.reduce((max, product) => (product?.amount > max ? product?.amount : max), payload[0]?.amount);
          const findMin = payload.reduce((min, product) => (product?.amount < min ? product?.amount : min), payload[0]?.amount);
          const minTime = payload.reduce((min, product) => (product?.totalDuration < min ? product?.totalDuration : min), payload[0]?.totalDuration);
          maxsortPrice.current = parseInt(findMax)
          minsortPrice.current = parseInt(findMin)
          earlytime.current = minTime
        }
        // Remove loader
        setFlightLoading((prevState) => {
          return {
            ...prevState,
            open: false,
          };
        });
      }, 2000);
    } catch (error) {
      // Remove loader
      setFlightLoading((prevState) => {
        return {
          ...prevState,
          open: false,
        };
      });
      setLoadflight(false)
      // return AlertError(`${error}`)
    }
  }, [])
  // }, [localTrip])

  useEffect(() => {
    handleFlightEffectV2()
  }, [handleFlightEffectV2])

  const reloadFlight = () => {
    handleFlightEffectV2()
  }

  // getting flight Addons
  const fetchFlightAddons = useCallback(async () => {
    try {
      const res = await HttpServices.get(
        ApiRoutes.addons.get_addons
      )
      dispatch(fetchAllAddons(res.data.data.addons))
    } catch (error) {
      return AlertError(`${error}`)
    }
  }, [dispatch])

  useEffect(() => {
    fetchFlightAddons()
  }, [fetchFlightAddons])

  // open flight filter for mobile
  const handleFilterForMobile = () => {
    if (flightList3?.length > 0) {
      setMobile(!mobile)
    }
  }

  const AirlineFrontendFilter = (values) => {
    return setFlightList3(values)
  }

  return (
    <div>
      <GeoLayout>
        <FlightLoader loading={flightLoading} />
        {!loadflight && flightList2?.length > 0 && <div className={`${mobile ? '' : 'hidden'} fixed w-full h-screen bg-black/60 left-0 top-0 z-[99] overflow-y-auto scrolls lg:hidden`}>
          <FlightFilterComponent
            flightList2={flightList2}
            maxsortPrice={maxsortPrice}
            minsortPrice={minsortPrice}
            storeAirline={storeAirline}
            storeStops={storeStops}
            loadflight={loadflight}
            closeMobile={() => setMobile(!mobile)}
            handleFilterByPrice={handleFilterByPrice}
          />
        </div>}
        {pageItem === 0 && (
          <div>
            <Wrapper>
              <WrapContent>Flight Details</WrapContent>
            </Wrapper>
            <FlightNav>
              <Flightnavbar active={1} />
            </FlightNav>
            <div className=" max-w-6xl w-11/12 pt-6 mx-auto">
              <FlightCard
                reloadFlight={reloadFlight}
                handleFilterForMobile={handleFilterForMobile}
              />
            </div>
            <SectionHolder>
              <Section>
                <LeftSection>
                  {/* flight filter component */}
                  {loadflight ? <div>
                    <div className='mb-3 bg-slate-200 animate-pulse rounded-lg h-[40rem]'></div>
                  </div> : <div>
                    {flightList2?.length > 0 ? <FlightFilterComponent
                      flightList2={flightList2}
                      maxsortPrice={maxsortPrice}
                      minsortPrice={minsortPrice}
                      storeAirline={storeAirline}
                      storeStops={storeStops}
                      handleRefunds={handleRefunds}
                      closeMobile={() => setMobile(!mobile)}
                      handleFilterByPrice={handleFilterByPrice}
                    /> :
                      <div className='mb-3 bg-slate-200 animate-pulse rounded-lg h-[40rem]'></div>}
                  </div>}
                </LeftSection>
                <RightSection>
                  {/* Flight Offers */}
                  <Suspense fallback={'loading...'}>
                    <FlightOffer
                      isopen={isopen}
                      flightList2={flightList2}
                      handleOpen={displayFlight}
                      setisopen={setisopen}
                      loadflight={loadflight}
                      flightError={flightError}
                      minprice={minsortPrice.current}
                      earlytimed={earlytime.current}
                      flightList={flightList3}
                      sendFilteration={sendFilteration}
                      AirlineFrontendFilter={AirlineFrontendFilter}
                    />
                  </Suspense>
                </RightSection>
              </Section>
            </SectionHolder>
          </div>
        )}
        {displayed_flight.open && (
          <Flightitenary
            // isopen={displayed_flight.open}
            close={closeDisplay}
            onDeals={onDeals}
            singleFlight={singleFlight}
            setSingleFlight={setSingleFlight}
            currs={singleFlight}
            changePage={() => {
              setPageItem(1)
              BackToTop()
              setShowPass(true)
              set_displayed_flight((prevState) => {
                return {
                  ...prevState,
                  open: false,
                };
              });
            }}
          />
        )}
        {/*----------------------------PAGES----------------------------- */}
        {showPass && <div className={pageItem === 1 ? '' : 'hidden'}>
          <Suspense fallback='loading...'><Passengerdetail
            changePage={(item) => setPageItem(item)}
            flightDetails={singleFlight}
            setFlightDetails={setSingleFlight}
          /></Suspense>
        </div>}
        {pageItem === 2 && <div>
          <Tripsummary changePage={(item) => setPageItem(item)} flightDetails={singleFlight} />
        </div>}
        {pageItem === 3 && <div>
          <Payment changePage={(item) => setPageItem(item)} flightDetails={singleFlight} />
        </div>}
        {/* {pageItem === 4 && <div>
          <Success changePage={(item) => setPageItem(item)} flightDetails={singleFlight} />
        </div>} */}
        {/*----------------------------PAGES----------------------------- */}
      </GeoLayout>
    </div>
  );
}

export default Flight;

const Wrapper = styled.div``;
const WrapContent = styled.div`
  margin: 0 auto;
  max-width: 1160px;
  padding: 20px;
  background: #fff;
  font-size: 16px;
  font-weight: 600;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;


const FlightNav = styled.div`
  background: #171b4a;
  padding: 20px;
  width: 100%;
`;
const SectionHolder = styled.div`
  background: #f4f8fa;
  width: 100%;
  padding: 20px 0;
`;
const Section = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1160px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  padding: 0 20px 100px;

  @media only screen and (max-width: 996px) {
    grid-template-columns: 1fr;
  }
`;
const LeftSection = styled.div`
  @media only screen and (max-width: 996px) {
    display: none;
  }
`;
const RightSection = styled.div``;

const BottomCard = styled.div`
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px;
`;

const ExploreWrapper = styled.div``;
const Explore = styled.div`
  font-size: 14px;
  color: #fff;
`;
const ExploreBtn = styled.button`
  width: 100%;
  max-width: 159px;
  height: 54px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  width: 163px;
  height: 54px;
  background: #2e61e6;
  border-radius: 27px;
  cursor: pointer;
`;
const Small = styled.h4`
  font-size: 20px;
  color: #fff;
  margin-bottom: 15px;
`;