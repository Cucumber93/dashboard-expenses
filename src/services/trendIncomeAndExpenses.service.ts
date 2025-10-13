

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CompareService  = {
    getCompareTrend: async(type:string)=>{
        try{
            const response = await fetch(`${BASE_URL}/compare/${type}`);
            if(!response.ok){
                throw new Error("Failed to fetch trend expenses hourly");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching trend expenses hourly:", error);
            throw error;
        }
    },
}
