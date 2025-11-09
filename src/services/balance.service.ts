import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const BalanceService = {
  getBalance: async (userId: string,startDate:string) => {
    try {
      const response = await axios.post(`${BASE_URL}/balance`, {
        userId,
        startDate
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  },
};
