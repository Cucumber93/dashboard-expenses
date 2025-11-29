import type { IProfile } from "../interface/line";
import api from "./api";

export const AuthService = {
  logout: async () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  },

  loginLine: async (profile:IProfile) => {
    const response = await api.post("/auth/login-line", {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
    });

    localStorage.setItem("auth_token", response.data.token);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  }
};
