import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthService = {
  loginLine: async(data:any)=>{
    try{
        const response = await axios.post(`${BASE_URL}/auth/login-line`,data)
        return response.data
    }catch(err){    
        console.log(err)
    }
  }
};
