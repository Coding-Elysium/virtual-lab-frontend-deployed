import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../helper/helper";

const AddCommonIngredient = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "Submitting..." });

    try {
      const payload = new FormData();
      payload.append("name", formData.name);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await axios.post(`${BASEURL}/common-ingredients/create`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ success: true, message: res.data.message });
      setFormData({
        name: "",
        image: null,
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Try again.";
      setStatus({ success: false, message: msg });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Add New Common Ingredient
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Ingredient
      </button>

      {status.message && (
        <p
          className={`text-sm mt-2 ${
            status.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
};

export default AddCommonIngredient;
