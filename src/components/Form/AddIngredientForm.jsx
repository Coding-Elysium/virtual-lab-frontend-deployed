import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../helper/helper";

const AddIngredientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    validactions: [],
    invalidactions: [],
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({ success: null, message: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASEURL}/categories/read`);
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "validactions" || name === "invalidactions") {
      const actionsArray = value
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a !== "");
      setFormData({ ...formData, [name]: actionsArray });
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
      payload.append("type", formData.type);
      payload.append("category", formData.category);

      formData.validactions.forEach((action) =>
        payload.append("validactions[]", action)
      );
      formData.invalidactions.forEach((action) =>
        payload.append("invalidactions[]", action)
      );

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await axios.post(`${BASEURL}/ingredients/create`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ success: true, message: res.data.message });
      setFormData({
        name: "",
        type: "",
        category: "",
        validactions: [],
        invalidactions: [],
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
        Add New Ingredient
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

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Type</option>
        <option value="coc1">Coc 1</option>
        <option value="coc2">Coc 2</option>
        <option value="coc3">Coc 3</option>
      </select>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Category</option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {" "}
              {cat.category}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>

      <input
        type="text"
        name="validactions"
        placeholder="Actions (comma-separated)"
        value={formData.validactions.join(", ")}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="invalidactions"
        placeholder="Actions (comma-separated)"
        value={formData.invalidactions.join(", ")}
        onChange={handleChange}
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

export default AddIngredientForm;
