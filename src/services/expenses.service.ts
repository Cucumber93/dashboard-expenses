
const BASE_URL = import.meta.env.VITE_API_URL;

export const ExpensesService = {
    getALLExpenses: async()=>{
        try{
            const response = await fetch(`${BASE_URL}/expenses`);
            if(!response.ok){
                throw new Error("Failed to fetch expenses");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching expenses:", error);
            throw error;
        }   
    },
    getExpenseById: async(id:number)=>{
        try{
            const response = await fetch(`${BASE_URL}/expenses/${id}`);
            if(!response.ok){
                throw new Error("Failed to fetch expense");
            }
            return await response.json();
        }catch(error){
            console.error("Error fetching expense:", error);
            throw error;
        }   
    }   
}