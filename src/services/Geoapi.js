import axios from "axios"
import Cookies from "js-cookie"
import { MainToken } from "../components/functions";

export const Enviroments = {
    staging: `https://geo-corporate.netlify.app/`,
    live: `https://corporate.gowithgeo.com/`,
    local: `http://localhost:5173/`
}
// const baseUrl = 
export let baseUrl;
export const localsitename = "http://localhost:5173/";
export let onlinesitename;
if (window.location.origin.includes('corporate.gowithgeo.com')) {
    baseUrl = `https://api.gowithgeo.com`
    onlinesitename = Enviroments.live
} else {
    baseUrl = `https://geo-travel-e8d032e3dc4f.herokuapp.com`
    onlinesitename = Enviroments.staging
}

const auth = `/corporates/`,
pass = `/passengers/`
const reset = `/reset/password/`



const auth_urls = {
    login: auth + `organization/login`,
    profile: auth + `organization/view`,
    user: `/authenticate/staff/info`,
    all_payments: auth + `organization/payments`,
    payment: auth+`corporate-payment/`,
    offset_bill: auth+`offset/payment/`,
    verify_offset_bill: auth+`payment/flutterwave/verify`,
}
const reset_urls = {
    send_email: reset+`request-reset-email/`,
    reset_password: reset+`password-reset-complete`,
}


const passenger_urls = {
    create: pass + `create`,
    update: pass + `update`,
    delete: pass + `delete`,
    list: pass + `list`,
}


export const MainApi = {
    auth: auth_urls,
    passengers: passenger_urls,
    forgot_password: reset_urls,
}


export const ClientGetApi = async (endpoint) => {
    const res = await axios.get(`${baseUrl}${endpoint}`)
    return res.data
}

export const ClientPostApi = async (endpoint, data) => {
    const res = await axios.post(`${baseUrl}${endpoint}`, data)
    return res.data
}

export const ClientPatchApi = async (endpoint, data) => {
    const res = await axios.patch(`${baseUrl}${endpoint}`, data)
    return res.data
}

export const AuthGetApi = async (endpoint) => {
    const webToken = Cookies.get(MainToken)
    const res = await axios.get(`${baseUrl}${endpoint}`, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.data
}

export const AuthPostApi = async (endpoint, data) => {
    const webToken = Cookies.get(MainToken)
    const res = await axios.post(`${baseUrl}${endpoint}`, data, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.data
}

export const AuthPutApi = async (endpoint, data) => {
    const webToken = Cookies.get(MainToken)
    const res = await axios.put(`${baseUrl}${endpoint}`, data, {
        headers: {
            authorization: `Bearer ${webToken}`,
        }
    })
    return res.data
}

export const AuthDeleteApi = async (endpoint, data) => {
    const webToken = Cookies.get(MainToken)
    const res = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            authorization: `Bearer ${webToken}`
        },
        method: "DELETE",
    })
    const result = await res.json()
    return result

}

export const AuthExportApi = async (endpoint) => {
    const webToken = Cookies.get(MainToken)

    const result = await axios.get(`${baseUrl}${endpoint}`, {
        headers: {
            authorization: `Bearer ${webToken}`,
            Accept: "Application/json",
        },
    })
    return result
}

export const DownloadExportApi = async (apiEndpoint, filename) => {
    const webToken = Cookies.get(MainToken)

    const res = await axios.get(`${baseUrl}${apiEndpoint}`, {
        responseType: "arraybuffer",
        headers: {
            Accept: "application/json",
            authorization: `Bearer ${webToken}`,
        }
    })
    const uri = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = uri
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
}
