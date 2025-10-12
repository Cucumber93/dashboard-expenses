const BASE_URL = import.meta.env.VITE_BASE_URL;

export const BalanceService = {
    getBalance: async()=>{
        try{
            const response = await fetch(`${BASE_URL}/balance`);
            if(!response.ok){
                throw new Error("Failed to fetch balance");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching balance:", error);
            throw error;
        }
    } 
}