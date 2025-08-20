import React, { useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import InputField from "../components/TextField/InputField";
import SelectField from "../components/TextField/SelectField";
import crudStudentStore from "../store/crudStudent";
import ErrorModal from "../components/Modal/ErrorModal";
import SuccessModal from "../components/Modal/SuccessModal";

const AddStudent = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createStudent } = crudStudentStore();

  const [formData, setFormData] = useState({
    lrn: "",
    firstName: "",
    lastName: "",
    username: "",
    gender: "",
    password: "",
    gradeLevel: "",
    status: "Approved",
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
    setLoading(true);
    const result = await createStudent(formData);
    setLoading(false);

    if (!result.success) {
      setError(true);
      console.error("Error creating student:", result.message);
      return;
    } else {
      setSuccess(true);
      setFormData({
        lrn: "",
        firstName: "",
        lastName: "",
        username: "",
        gender: "",
        password: "",
        gradeLevel: "",
        status: "Approved",
      });
      console.log("Student created successfully");
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Add Students" />
      </section>

      <section className="bg-white rounded shadow">
        <div className="py-4 px-6">
          <h1 className="text-lg font-semibold">Basic Info</h1>
        </div>
        <hr className="bg-gray-300 h-px border-0" />

        <form onSubmit={handleSubmit} className="py-4 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="LRN"
              name="lrn"
              value={formData.lrn}
              onChange={handleChange}
              placeholder="Enter LRN"
              required
            />

            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"  
              required
            />

            <InputField
              label="Username"
              name="username"
              value={formData.username}
              type="username"
              onChange={handleChange}
              placeholder="Username"
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female"]}
              required
            />

            <InputField
              label="Password"
              name="password"
              value={formData.password}
              type="password"
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="mt-4">
            <SelectField
              label="Grade level"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              options={["Senior High School", "Junior High School"]}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              className="background-primary-color text-white px-4 py-2 rounded-sm cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
      {success && (
        <SuccessModal
          message="Student added successfully!"
          onClose={() => setSuccess(false)}
        />
      )}
      {error && (
        <ErrorModal
          message="LRN or username already exists."
          onClose={() => setError(false)}
        />
      )}
    </section>
  );
};

export default AddStudent;
