import React, { useState, useEffect } from "react";
import InputField from "../TextField/InputField";
import SelectField from "../TextField/SelectField";
import crudStudentStore from "../../store/crudStudent";
import SuccessModal from "../Modal/SuccessModal";
import ErrorModal from "../Modal/ErrorModal";

export default function EditUserModal({ isOpen, onClose, user }) {
  const { updateStudent } = crudStudentStore();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    _id: "",
    lrn: "",
    firstName: "",
    lastName: "",
    gender: "",
    gradeLevel: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await updateStudent(formData);
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <div className="flex flex-col gap-4 mb-6">
          <InputField
            label="LRN"
            name="lrn"
            value={formData.lrn}
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
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            options={["Male", "Female"]}
            onChange={handleChange}
          />
          <SelectField
            label="Grade Level"
            name="gradeLevel"
            value={formData.gradeLevel}
            options={["Junior High School", "Senior High School"]}
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
              handleSubmit();
              onClose();
            }}
            className="py-2 px-4 text-white background-primary-color rounded-sm hover:opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
