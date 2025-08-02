import { create } from "zustand";
import { BASEURL } from "../helper/helper";
import axios from "axios";

const platingStore = create((set) => ({
  platingDetails: null,
  lading: false,
  error: null,

  fetchAllPlating: async (id, activeTab) => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${BASEURL}/plating/read/${id}?type=${activeTab}`
      );

      set({ platingDetails: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default platingStore;
