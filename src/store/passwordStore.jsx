import { create } from "zustand";
import { BASEURL } from "../helper/helper";
import axios from "axios";

const passwordStore = create((set) => ({
  password: "",
  adminRequestPassword: [],
  studentRequestPassword: [],
  loading: false,

  setPasswordAdmin: async (requestId, newPassword) => {
    try {
      const res = await axios.post(
        `${BASEURL}/password/admin/setNewPassword/${requestId}`,
        { newPassword }
      );

      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Server error");
      } else {
        throw new Error("Network error, please try again.");
      }
    }
  },

  setPasswordStudent: async (requestId, newPassword) => {
    try {
      const res = await axios.post(
        `${BASEURL}/password/student/setNewPassword/${requestId}`,
        { newPassword }
      );

      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Server error");
      } else {
        throw new Error("Network error, please try again.");
      }
    }
  },

  requestPasswordAdmin: async (data) => {
    try {
      const res = await axios.post(
        `${BASEURL}/password/admin/forgotpassword`,
        data
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Server error");
      } else {
        throw new Error("Network error, please try again.");
      }
    }
  },

  requestPasswordStudent: async (data) => {
    try {
      const result = await axios.post(
        `${BASEURL}/password/student/forgotpassword`,
        data
      );
      console.log("Password reset requested successfully:", result);
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  },

  fetchRequestPasswordAdmin: async () => {
    set({ loading: true });
    try {
      const result = await axios.get(
        `${BASEURL}/password/admin/requestPassword`
      );

      set({ adminRequestPassword: result.data.data, loading: false });
      console.log(
        "Fetched admin password reset requests successfully:",
        result
      );
    } catch (error) {
      console.error("Error fetching admin password reset requests:", error);
      set({ loading: false });
    }
  },

  fetchRequestPasswordStudent: async () => {
    set({ loading: true });
    try {
      const result = await axios.get(
        `${BASEURL}/password/student/requestPassword`
      );

      set({ studentRequestPassword: result.data.data, loading: false });
      console.log(
        "Fetched student password reset requests successfully:",
        result
      );
    } catch (error) {
      console.error("Error fetching student password reset requests:", error);
      set({ loading: false });
    }
  },
}));

export default passwordStore;
