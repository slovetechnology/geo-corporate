import { atom } from "jotai";

export const Company = atom<any>({})
export const OrgProfile = atom<any>({})
export const FlightNumber = atom<number>(0)
export const FlightDelay = atom<Boolean>(false)
export const AIRLINES = atom<any>([])