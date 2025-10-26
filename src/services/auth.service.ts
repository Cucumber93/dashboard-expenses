import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthService = {
  loginLine: async(profile:any)=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/login-line`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ ให้ browser ส่ง cookie
        body: JSON.stringify({
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
        }),
      })
        return response.data
    }catch(err){    
        console.log(err)
    }
  }
};
