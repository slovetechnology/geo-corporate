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

const RouteLayout = ({ children }) => {
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = Cookies.get(USERID)

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
      if (response.status === 200) {
        dispatch(setUserData(response.data))
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
