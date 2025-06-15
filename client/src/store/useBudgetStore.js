import { useAuthStore } from "./useAuthStore";
import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const token = useAuthStore.getState().token;
export const useBudgetStore = create((set) => ({
  budget: null,
  loading: false,
  error: null,

  fetchBudget: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/budget`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ budget: res.data.amount });
    } catch (err) {
      console.error("Erreur récupération budget:", err);
      set({ error: err.message });
    }
  },

  updateBudget: async (amount) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/budget`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ⚠️ Mets bien à jour le store avec la valeur retournée
      set({ budget: res.data.budget.amount });
    } catch (err) {
      console.error(
        "Erreur mise à jour budget:",
        err.response?.data || err.message
      );
    }
  },
}));
