import { USERID } from '/src/components/functions'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MainToken } from '/src/components/functions'
import Cookies from 'js-cookie'
import { isExpired } from 'react-jwt'
import { AlertError } from '/src/components/functions'
import { setUserData } from '/src/app/dataSlice'
import { AuthGetApi, MainApi } from './Geoapi'
import { USERNAME } from '/src/components/functions'
import { dispatchProfile } from '/src/app/dataSlice'

const RouteLayout = ({ children }) => {
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = Cookies.get(USERID)
  const username = Cookies.get(USERNAME)

  const FetchUser = useCallback(async () => {
    const mainToken = Cookies.get(MainToken)
    const mainExp = isExpired(mainToken)
    if (!mainToken) {
      setLogin(false)
      return navigate('/')
    }
    if (mainExp) {
      setLogin(false)
      return navigate('/')
    }
    try {
      const response = await AuthGetApi(`${MainApi.auth.profile}/${user}`)
      const res = await AuthGetApi(`${MainApi.auth.user}/${username}/`)
      if (response.status === 200) {
        dispatch(setUserData(response.data))
        dispatch(dispatchProfile(res.data))
        return setLogin(true)
      } else {
        setLogin(false)
        return navigate('/')
      }
    } catch (error) {
      setLogin(false)
      AlertError(`Something went wrong, please try again after one hour`)
      return navigate('/')
    }
  }, [])

  useLayoutEffect(() => { FetchUser() }, [FetchUser])
  
  return login && children
}

export default RouteLayout
