import { createContext, useContext, useEffect, useState } from "react"
import type { IProfile } from "../interface/line"
import { AuthService } from "../services/auth.service"

interface IAuthContext{
    user: IProfile
}

const AuthContext = createContext<IAuthContext>({
    user:{
        userId:'',
        pictureUrl:'',
        displayName:''
    }
})
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) =>{
    const [user, setUser] = useState<IProfile>({
        userId:'',
        pictureUrl:'',
        displayName:''
    })

    const refreshUser = async()=>{
        try{
            const response = await AuthService.getTokenCookie()
            console.log('context response: ',response)
            if(response?.data?.user){
                console.log('context user: ',response.data.user)
                setUser(response.data.user)
                return
            }
        }catch(err){
            console.log('retresh user error: ',err)
        }
    }

    useEffect(()=>{
        refreshUser()
    },[])
    return(
        <AuthContext.Provider value = {{user}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};