import React, { useState } from "react";
import axios from "axios";
import { BASEURL } from "../../helper/helper";

const AddTools = () => {
  const [formData, setFormData] = useState({
    name: "",
    actions: [],
    image: null,
  });

  const [actionInput, setActionInput] = useState("");
  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add action when pressing Enter
  const handleActionKeyDown = (e) => {
    if (e.key === "Enter" && actionInput.trim() !== "") {
      e.preventDefault();
      if (!formData.actions.includes(actionInput.trim())) {
        setFormData({
          ...formData,
          actions: [...formData.actions, actionInput.trim()],
        });
      }
      setActionInput("");
    }
  };

  // Remove an action chip
  const removeAction = (actionToRemove) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter((a) => a !== actionToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "Submitting..." });

    try {
      const payload = new FormData();
      payload.append("name", formData.name);

      formData.actions.forEach((action) =>
        payload.append("actions[]", action)
      );

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await axios.post(`${BASEURL}/kitchen-tools/create`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ success: true, message: res.data.message });
      setFormData({ name: "", actions: [], image: null });
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
        Add New Kitchen Tool
      </h2>

      {/* Tool Name */}
      <input
        type="text"
        name="name"
        placeholder="Tool Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Actions as tags */}
      <div>
        <input
          type="text"
          placeholder="Type action and press Enter"
          value={actionInput}
          onChange={(e) => setActionInput(e.target.value)}
          onKeyDown={handleActionKeyDown}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-wrap mt-2 gap-2">
          {formData.actions.map((action, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {action}
              <button
                type="button"
                onClick={() => removeAction(action)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Upload Image */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md 
                   file:border-0 file:text-sm file:font-semibold file:bg-blue-50 
                   file:text-blue-700 hover:file:bg-blue-100"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Kitchen Tool
      </button>

      {/* Status Message */}
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

export default AddTools;
