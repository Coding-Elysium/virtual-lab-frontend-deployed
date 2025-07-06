import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../helper/helper";

const authStore = create((set) => ({
  isLoggedIn: false,
  admin: null,
  token: null,
  loading: false,
  error: null,

  loginAdmin: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASEURL}/auth/loginAdmin`, credentials);
      console.log("Login response:", res.data.admin);
      set({
        admin: res.data.admin,
        token: res.data.token,
        isLoggedIn: true,
        loading: false,
      });
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  logoutAdmin: () => {
    set({ isLoggedIn: false, admin: null, token: null });
  },
}));

export default authStore;
