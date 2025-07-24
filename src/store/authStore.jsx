import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../helper/helper";

const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      isLoggedIn: true,
      token: token,
      admin: JSON.parse(localStorage.getItem("admin")), 
    };
  }
  return {
    isLoggedIn: false,
    token: null,
    admin: null,
  };
};

const authStore = create((set) => ({
  ...getInitialAuthState(),
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
      localStorage.setItem("admin", JSON.stringify(res.data.admin)); 
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  logoutAdmin: () => {
    set({ isLoggedIn: false, admin: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("admin"); 
  },
}));

export default authStore;
