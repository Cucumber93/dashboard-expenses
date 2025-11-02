
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CompareService  = {
    getCompareTrend: async(type:string,userId:string)=>{
        try{
            const response = await axios.post(`${BASE_URL}/compare/${type}?userId=${userId}`);
            return response.data;
        }catch(error){
            console.error("Error fetching trend expenses hourly:", error);
            throw error;
        }
    },
}
