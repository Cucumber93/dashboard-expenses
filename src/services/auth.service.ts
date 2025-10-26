import axios from "axios";
import type { IProfile } from "../interface/line";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const AuthService = {
  loginLine: async (profile:IProfile) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login-line`,
        {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ ต้องใช้ "withCredentials" (ไม่ใช่ credentials)
        }
      );

      return response.data;
    } catch (err) {
      console.error("❌ Login Error:", err);
    }
  },
};
