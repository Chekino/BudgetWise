import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      set({ user: response.data.user, token: response.data.token });
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur",
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      set({ user: response.data.user, token: response.data.token });
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
