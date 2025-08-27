import React, { useState, useEffect } from "react";
import InputField from "../TextField/InputField";
import SelectField from "../TextField/SelectField";
import crudStudentStore from "../../store/crudStudent";

export default function ModalChangePass({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Password changed");
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="flex flex-col gap-4 mb-6">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
              onClose();
            }}
            className="py-2 px-4 text-white background-primary-color rounded-sm hover:opacity-80"
          >
            Set Password
          </button>
        </div>
      </div>
    </div>
  );
}
