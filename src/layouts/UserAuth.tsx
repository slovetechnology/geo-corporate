import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { MainToken, OrgID } from '../components/services/functions'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { Apis, AuthGetApi } from '../components/services/Api'
import { useAtom } from 'jotai'
import { Company, OrgProfile } from './layoutStore'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


type Props = {
  children: React.ReactNode
}

function UserAuth({ children }: Props) {
  const token = Cookies.get(MainToken)
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  const [, setComp] = useAtom(Company)
  const [, setOrgProfile] = useAtom(OrgProfile)

  const { isLoading} = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      if (!token) return navigate('/')
      if (isExpired(token)) return navigate('/')
      const response = await AuthGetApi(`${Apis.view_org}/${Cookies.get(OrgID)}`)
      const res = await AuthGetApi(`${Apis.org}/${Cookies.get(OrgID)}`)
      if (response.status !== 200) return navigate('/')
      setComp(response.data)
      setOrgProfile(res.data)
      setAuth(true)
      return response.data
    }
  })

  if(isLoading) return (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="w-11/12 max-w-xs">
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </div>
      </div>
  )
  if (auth) return (children)
}

export default UserAuth