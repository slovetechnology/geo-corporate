import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { MainToken, OrgID } from '../components/services/functions'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { Apis, AuthGetApi } from '../components/services/Api'
import { useAtom } from 'jotai'
import { Company } from './layoutStore'


type Props = {
  children: React.ReactNode
}

function UserAuth({ children }: Props) {
  const token = Cookies.get(MainToken)
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  const [, setComp] = useAtom(Company)

  useEffect(() => {
    const HandleAuth = async () => {
      if (!token) return navigate('/')
      if (isExpired(token)) return navigate('/')
      const response = await AuthGetApi(`${Apis.view_org}/${Cookies.get(OrgID)}`)
      if (response.status !== 200) return navigate('/')
      setComp(response.data)
      setAuth(true)
    }
    HandleAuth()
  }, [])
  if (auth) return (children)
}

export default UserAuth