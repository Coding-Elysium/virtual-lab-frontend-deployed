import React, { useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import InputField from "../components/TextField/InputField";
import SelectField from "../components/TextField/SelectField";
import crudAdminStore from "../store/crudAdmin";

const AddAdmin = () => {
  const { addAdmin, isLoading, isError } = crudAdminStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subject: "",
    employeeNumber: "",
    position: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addAdmin(formData);
    if (res) {
      console.log("Admin added successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        subject: "",
        employeeNumber: "",
        position: "",
        gender: "",
      });
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Add Admin" />
      </section>

      <section className="bg-white rounded shadow">
        <div className="py-4 px-6">
          <h1 className="text-lg font-semibold">Admin Info</h1>
        </div>
        <hr className="bg-gray-300 h-px border-0" />

        <form onSubmit={handleSubmit} className="py-4 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
            />

            <InputField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Subject"
            />

            <InputField
              label="Employee Number"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
              placeholder="Enter Employee Number"
            />

            <InputField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter Position"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              className="background-primary-color text-white px-4 py-2 rounded-sm cursor-pointer hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddAdmin;
