import axios from 'axios';
import { MainToken } from './functions';
import Cookies from 'js-cookie'



// const baseUrl = 
export let baseUrl: string;
if (window.location.origin.includes('gowithgeo.com')) {
    baseUrl = `https://api.gowithgeo.com`
} else {
    //   baseUrl = `https://api.dev.gowithgeo.com`
    baseUrl = `https://geo-travel-e8d032e3dc4f.herokuapp.com`
}

export let webUrl:string;
if (window.location.origin.includes('gowithgeo.com')) {
  webUrl = `https://prod.geotravel.travelcham.com`
} else {
  webUrl = `https://sandbox.geotravel.travelcham.com`
}

const corp = `/corporates/`
const org = `/corporates/organization/`
const reset = `/reset/password/`


export const Apis = {
    signup: org + `onboard`,
    login: org + `login`,
    send_email: reset + `request-reset-email/`,
    reset_password: reset + `password-reset-complete`,
    validate_signup_email: corp + `validate-email/`,
    validate_signup_email_otp: corp + `validate-otp/`,
    resend_signup_email_otp: corp + `resend-otp/`,
    query_otp: corp + `query-otp/`,
    view_org: org + `view`,
    org: org + `list`,
    manage_bookings: `flights/bookings`,
    upload_document: corp + `documents/uploads`,
    query_email: corp + `query-email/`,
}

export const TiqwaGetApi = async (endpoint: string) => {
    const res = await fetch(`${webUrl}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.json()
}

export const ClientGetApi = async (endpoint: string) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.json()
}

export const ClientPostApi = async (endpoint: string, data: any) => {
    const res: any = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    const result = await res.json()
    return result
}
export const ClientPutApi = async (endpoint: string, data: any) => {
    const res: any = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await res.json()
    return result
}
export const ClientPatchApi = async (endpoint: string, data: any) => {
    const res = await axios.patch(`${baseUrl}${endpoint}`, data, {
        headers: {
            // 'Content-Type': 'application/json-patch+json'
        }
    })
    return res.data
}

export const AuthGetApi = async (endpoint: string) => {
    const webToken = Cookies.get(MainToken)
    const res = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.json()
}

export const AuthPostApi = async (endpoint: string, data: any) => {
    const webToken = Cookies.get(MainToken)
    const res = await axios.post(`${baseUrl}${endpoint}`, data, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.data
}

export const AuthPutApi = async (endpoint: string, data: any) => {
    const webToken = Cookies.get(MainToken)
    const res = await axios.put(`${baseUrl}${endpoint}`, data, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.data
}
