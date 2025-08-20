import { useEffect, useState } from 'react';
import InputField from '../TextField/InputField';
import SelectField from '../TextField/SelectField';
import crudAdminStore from '../../store/crudAdmin';

const AddAdminForm = ({
  admin = null,
  textButton = "Submit",
}) => {
  const [formData, setFormData] = useState({
    firstName: admin?.firstName || "",
    lastName: admin?.lastName || "",
    username: admin?.username || "",
    password: admin?.password || "",
    subject: admin?.subject || "",
    employeeNumber: admin?.employeeNumber || "",
    position: admin?.position || "",
    gender: admin?.gender || "",
    _id: admin?._id || "",
  });

  const { addAdmin, updateAdmin, loading } = crudAdminStore();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data) => {
    const res = await addAdmin(data);
    if (res) {
      console.log("Admin added successfully");
    }
  };

  const handleEdit = async (data) => {
    const res = await updateAdmin(data);
    if (res) {
      console.log("Update Admin");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (admin) {
      handleEdit(formData);
    } else {
      handleSubmit(formData);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">Loading...</div>
    );
  }

  return (
    <section className="bg-white rounded shadow">
      <div className="py-4 px-6">
        <h1 className="text-lg font-semibold">Admin Info</h1>
      </div>
      <hr className="bg-gray-300 h-px border-0" />

      <form onSubmit={onSubmit} className="py-4 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={onChange} placeholder="Enter First Name" required/>
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} placeholder="Enter Last Name" required/>
          <InputField label="Username" name="username" type="username" value={formData.username} onChange={onChange} placeholder="Enter Username" required/>
          <SelectField label="Gender" name="gender" value={formData.gender} onChange={onChange} options={["Male", "Female"]} required/>
          <InputField label="Subject" name="subject" value={formData.subject} onChange={onChange} placeholder="Enter Subject" required/>
          <InputField label="Employee Number" name="employeeNumber" value={formData.employeeNumber} onChange={onChange} placeholder="Enter Employee Number" required/>
          <InputField label="Position" name="position" value={formData.position} onChange={onChange} placeholder="Enter Position" required/>
          {
            !admin && (
              <InputField label="Password" name="password" type="password" value={formData.password} onChange={onChange} placeholder="Enter Password" required={admin}/>
            )
          }
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
