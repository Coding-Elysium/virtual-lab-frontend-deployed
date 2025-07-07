import React, { useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import AddAdminForm from "../components/Form/AddAdminForm";
import crudAdminStore from "../store/crudAdmin";

const AddAdmin = () => {

  const { addAdmin } = crudAdminStore();

  const handleSubmit = async (formData) => {
    const res = await addAdmin(formData);
    if (res) {
      console.log("Admin added successfully");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Add Admin" />
      </section>
      <AddAdminForm handleSubmit={handleSubmit} textButton="Submit"/>
    </section>
  );
};

export default AddAdmin;
