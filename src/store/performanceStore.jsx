import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../helper/helper";

export const usePerformanceStore = create((set) => ({
  performance: null,
  loading: false,
  error: null,

  addPerformance: async (data) => {
    console.log("Adding performance data:", data);
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASEURL}/performance/create`, data);
      set((state) => ({
        performance: [...state.performance, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPerformance: async (id, activeTab) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${BASEURL}/performance/read/${id}?type=${activeTab}`
      );

      set({
        performance: res.data,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, performance: null, loading: false });
    }
  },

  updatePerformance: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(
        `${BASEURL}/performance/update/${data._id}`,
        data
      );
      set((state) => ({
        performance: state.performance.map((item) =>
          item._id === data._id ? res.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
