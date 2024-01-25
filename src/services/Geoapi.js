import axios from "axios"
import Cookies from "js-cookie"
import { MainToken } from "../components/functions";

// const baseUrl = 
export let baseUrl;
if (window.location.origin.includes('gowithgeo.com')) {
    baseUrl = `https://api.gowithgeo.com`
} else {
    //   baseUrl = `https://api.dev.gowithgeo.com`
    baseUrl = `https://geo-travel-e8d032e3dc4f.herokuapp.com`
}


export const Enviroments = {
    staging: `https://geo-retail.netlify.app/`,
    live: `https://gowithgeo.com/`,
    local: `http://localhost:5173/`
}

const auth = `/authenticate/`


const auth_urls = {
    login: auth + `token`,
    role: auth + `role`,
    staff: auth + `staff`,
    onboard: auth + `onboard`,
    validate_email: auth + `validate-email/`,
}

export const MainApi = {
    auth: auth_urls,
}


export const ClientGetApi = async (endpoint) => {
    const res = await axios.get(`${baseUrl}${endpoint}`)
    return res.data
}

export const ClientPostApi = async (endpoint, data) => {
    const res = await axios.post(`${baseUrl}${endpoint}`, data)
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
            authorization: `Bearer ${webToken}`,
        },
        method: "DELETE",
        body: data
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
