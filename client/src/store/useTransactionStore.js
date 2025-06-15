import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useTransactionStore = create((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${API_URL}/api/transaction`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      set({ transactions: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchBalance: async () => {
    try {
      const token = useAuthStore.getState().token;
      const res = await axios.get(`${API_URL}/api/transaction/balance`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("Erreur chargement solde:", err);
    }
  },

  addTransaction: async (data) => {
    try {
      const token = useAuthStore.getState().token;

      const res = await axios.post(`${API_URL}/api/transaction`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ transactions: [res.data, ...state.transactions] }));
    } catch (err) {
      console.error("Erreur ajout transaction:", err);
    }
  },

  deleteTransaction: async (id) => {
    try {
      const token = useAuthStore.getState().token;

      await axios.delete(`${API_URL}/api/transaction/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
    } catch (err) {
      console.error("Erreur suppression transaction:", err);
    }
  },
}));
