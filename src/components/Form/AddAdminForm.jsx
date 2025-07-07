import { useEffect, useState } from 'react';
import InputField from '../TextField/InputField';
import SelectField from '../TextField/SelectField';

const AddAdminForm = ({
  admin = null,
  textButton = "Submit",
  handleSubmit,
}) => {
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

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        password: "", 
        subject: admin.subject || "",
        employeeNumber: admin.employeeNumber || "",
        position: admin.position || "",
        gender: admin.gender || "",
      });
    }
  }, [admin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); 
  };

  return (
    <section className="bg-white rounded shadow">
      <div className="py-4 px-6">
        <h1 className="text-lg font-semibold">Admin Info</h1>
      </div>
      <hr className="bg-gray-300 h-px border-0" />

      <form onSubmit={onSubmit} className="py-4 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={onChange} placeholder="Enter First Name" />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} placeholder="Enter Last Name" />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={onChange} placeholder="Enter Email" />
          <SelectField label="Gender" name="gender" value={formData.gender} onChange={onChange} options={["Male", "Female"]} />
          <InputField label="Subject" name="subject" value={formData.subject} onChange={onChange} placeholder="Enter Subject" />
          <InputField label="Employee Number" name="employeeNumber" value={formData.employeeNumber} onChange={onChange} placeholder="Enter Employee Number" />
          <InputField label="Position" name="position" value={formData.position} onChange={onChange} placeholder="Enter Position" />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={onChange} placeholder="Enter Password" />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button type="submit" className="background-primary-color text-white px-4 py-2 rounded-sm cursor-pointer hover:opacity-90">
            {textButton}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddAdminForm;
