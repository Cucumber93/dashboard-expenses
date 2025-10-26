import liff from '@line/liff'
import { useEffect } from 'react'
import {AuthService} from '../../services/auth.service'
const Line = () => {
      useEffect(()=>{
        liff.init({liffId:'2008277464-bBvaglGD'})
        .then(()=>{
            //code
            handleLogin()
        })
      },[])

      const handleLogin = async()=>{
        try{
            // const profile = await liff.getProfile()
            const token = await liff.getIDToken()
            console.log('token', token)
            await AuthService.loginLine(token)
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