import liff from '@line/liff'
import { useEffect } from 'react'

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
            const profile = await liff.getProfile()
            const token = await liff.getAccessToken()
            console.log('profile: ',profile)
            console.log('token: ', token)
        }catch(err){
            console.log(err)
        }
      }
  return (
    <div>Line</div>
  )
}

export default Line