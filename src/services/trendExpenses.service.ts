

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const TrendExpensesService  = {
    getTrendExpenses: async(type:string,userId:string)=>{
        try{
            const response = await fetch(`${BASE_URL}/trend-expenses/${type}?userId=${userId}`);
            if(!response.ok){
                throw new Error("Failed to fetch trend expenses");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching trend expenses hourly:", error);
            throw error;
        }
    },
}
