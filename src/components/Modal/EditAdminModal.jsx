import React, { useState, useEffect } from "react";
import InputField from "../TextField/InputField";
import crudAdminStore from "../../store/crudAdmin";
import SelectField from "../TextField/SelectField";

export default function EditAdminModal({ isOpen, onClose, admin, savedAdmin }) {
  const { updateAdmin } = crudAdminStore();
  const [formData, setFormData] = useState({
    _id: "",
    employeeNumber: "",
    firstName: "",
    lastName: "",
    subject: "",
    position: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData(admin);
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="bg-white rounded-md w-full max-w-xl shadow-md max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Admin</h2>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-6">
            <InputField
              label="Employee Number"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
            />
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              options={["Male", "Female"]}
              onChange={handleChange}
            />
            <InputField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <InputField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
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
                savedAdmin(formData);
                onClose();
              }}
              className="py-2 px-4 text-white background-primary-color rounded-sm hover:opacity-80"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
