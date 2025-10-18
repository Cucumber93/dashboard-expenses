import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const BalanceService = {
  getBalance: async (userId:string) => {
    try {
      const response = await axios.get(`${BASE_URL}/balance`, {
        params: { userId }, // ✅ axios จะ auto แปลงเป็น ?userId=...
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  },
};
