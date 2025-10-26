import liff from '@line/liff'
import { useEffect } from 'react'
import {AuthService} from '../../services/auth.service'
import type { IProfile } from '../../interface/line'
const Line = () => {

      useEffect(()=>{
        liff.init({liffId:'2008277464-bBvaglGD'})
        .then(()=>{
            //code
            handleLogin()
            handleGetProfile()
        })
      },[])

      const handleGetProfile = async()=>{
        try{
          const token = await AuthService.getTokenCookie()
          console.log('token from getProfileToken jaa: ', token)
          return token
        }catch(error){
          console.log('Can not get Profile token: ',error)
        }
      }

      const handleLogin = async()=>{
        try{
            const profile = await liff.getProfile()
            const token = await liff.getIDToken()
            const accessToken= await liff.getAccessToken()
            console.log('profile: ',profile)
            console.log('token', token)
            console.log('access token: ', accessToken)
            await AuthService.loginLine(profile as IProfile)
            .then(res=>{
                console.log(res)
            }).catch(err=>console.log(err))
        }catch(err){
            console.log(err)
        }
      }
  return (
    <div>Line</div>
  )
}

export default Line