

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const TrendExpensesService  = {
    getTrendExpensesHourly: async()=>{
        try{
            const response = await fetch(`${BASE_URL}/trend-expenses/hourly`);
            if(!response.ok){
                throw new Error("Failed to fetch trend expenses hourly");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching trend expenses hourly:", error);
            throw error;
        }
    },
    getTrendExpensesLast7Days: async()=>{
        try{
            const response = await fetch(`${BASE_URL}/trend-expenses/last-7-days`);
            if(!response.ok){
                throw new Error("Failed to fetch trend expenses last 7 days");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching trend expenses last 7 days:", error);
            throw error;
        }
    },
    getTrendExpensesLast30Days: async()=>{
        try{    
            const response = await fetch(`${BASE_URL}/trend-expenses/last-30-days`);
            if(!response.ok){
                throw new Error("Failed to fetch trend expenses last 30 days");
            }

            return await response.json();
        }catch(error){
            console.error("Error fetching trend expenses last 30 days:", error);
            throw error;
        }
    }
}
