import axios from "axios";
import type { IProfile } from "../interface/line";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthService = {
  logout: async () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  },

  loginLine: async (profile: IProfile) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login-line`,
        {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      // ⭐ เก็บ token ใน localStorage
      localStorage.setItem("auth_token", response.data.token);

      return response.data;
    } catch (err) {
      console.error("❌ Login Error:", err);
    }
  },

  getProfile: async () => {
    try {
      const token = localStorage.getItem("auth_token");

      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (err) {
      console.log("❌ Get Profile Error:", err);
    }
  }
};
