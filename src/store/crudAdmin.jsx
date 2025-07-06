import axios from "axios";
import { create } from "zustand";
import { BASEURL } from "../helper/helper";

const crudAdminStore = create((set) => ({
  admin: [],
  loading: false,
  error: null,

  fetchAllAdmin: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BASEURL}/admin/read`);
      set({ admin: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addAdmin: async (newAdmin) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${BASEURL}/admin/create`, newAdmin);
      set((state) => ({
        admin: [...state.admin, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteAdmin: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASEURL}/admin/delete/${id}`);
      set((state) => ({
        admin: state.admin.filter((admin) => admin._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateAdmin: async (updatedAdmin) => {
    set({ loading: true });
    try {
      const res = await axios.put(
        `${BASEURL}/admin/update/${updatedAdmin._id}`,
        updatedAdmin
      );
      set((state) => ({
        admin: state.admin.map((admin) =>
          admin._id === updatedAdmin._id ? res.data : admin
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default crudAdminStore;
