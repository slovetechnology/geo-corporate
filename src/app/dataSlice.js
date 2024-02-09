import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flightList: [],
    pdetails: [],
    passengers: [],
    packimages: [],
    flightBooked: {},
    flightDetails: {},
    invoice: {},
    user: {},
    profile: {},
    trip: {},
    addons: {},
    alladdons: [],
    recentcity: {},
    visa: {},
    selectedAddons: [],
    roles: [],
    blog: {},
    activity: {},
    loader: true,
    pageItem: 0,
    refundable: ''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    dispatchPageItem: (state, action) => {
      state.pageItem = action.payload
    },
    dispatchRefundable: (state, action) => {
      state.refundable = action.payload
    },
    storeFlightDetail: (state, action) => {
        state.flightList = action.payload
    },
    storePassenger: (state, action) => {
        state.passengers = action.payload
    },
    storePackageImages: (state, action) => {
      state.packimages = action.payload
    },
    dispatchLoader: (state, action) => {
      state.loader = action.payload
    },
    setFlightBooked: (state, action) => {
      state.flightBooked = action.payload
    },
    setFlightDetails: (state, action) => {
      state.flightDetails = action.payload
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    dispatchProfile: (state, action) => {
      state.profile = action.payload
    },
    setBookedInvoice: (state, action) => {
      state.invoice = action.payload
    },
    setTripDetails: (state, action) => {
      state.trip = action.payload
    },
    setSingleAddons: (state, action) => {
      state.addons = action.payload
    },
    fetchAllAddons: (state, action) => {
      state.alladdons = action.payload
    },
    dispatchRecentCity: (state, action) => {
      state.recentcity = action.payload
    },
    dispatchVisaInfo: (state, action) => {
      state.visa = action.payload
    },
    dispatchSelectedAddons: (state, action) => {
      state.selectedAddons = action.payload
    },
    dispatchRoles: (state, action) => {
      state.roles = action.payload
    },
    dispatchBlog: (state, action) => {
      state.blog = action.payload
    },
    dispatchActivity: (state, action) => {
      state.activity = action.payload
    },
    dispatchPDetails: (state, action) => {
      state.pdetails = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeFlightDetail, dispatchPDetails, storePassenger, dispatchProfile, storePackageImages, setFlightBooked, setFlightDetails, setUserData, setBookedInvoice, setTripDetails, setSingleAddons, fetchAllAddons, dispatchRecentCity, dispatchVisaInfo, dispatchSelectedAddons, dispatchRoles, dispatchBlog, dispatchActivity, dispatchLoader, dispatchPageItem, dispatchRefundable } = counterSlice.actions

export default counterSlice.reducer