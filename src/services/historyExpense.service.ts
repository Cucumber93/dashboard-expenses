import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HistoryService = {
  getHistory: async (userId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/history/get-all`, {
        userId,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching history; ", error);
      throw error;
    }
  },
};
