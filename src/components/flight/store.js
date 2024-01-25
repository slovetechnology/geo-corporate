
import {atom} from 'jotai'
import moment from 'moment'

export const FlightDataStore = atom({
    cabin: "economy",
    adults: 1,
    children:  0,
    infants: 0,
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    flighttype: 'return'
})

export const FlightNumber = atom(0)

export const FlightDelay = atom(false)

export const FLIGHTDATES = atom([
    {value: `${moment().format('YYYY-MM-DD')}`},
    {value: ``},
    {value: ``},
    {value: ``},
    {value: ``},
    {value: ``},
])
