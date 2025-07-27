import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../helper/helper";

const cocStore = create((set) => ({
  coc: [],
  loading: false,
  error: null,

  fetchCoc: async (id, tab) => {
    set({ loading: true, error: null });
    console.log(tab);
    try {
      const res = await axios.get(`${BASEURL}/coc/read/${id}?type=${tab}`);
      set({ coc: res.data.data || [], loading: false });
    } catch (error) {
      set({ error: error.message, coc: [], loading: false });
    }
  },
}));

export default cocStore;
