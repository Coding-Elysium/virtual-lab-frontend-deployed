import React, { useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import AddAdminForm from "../components/Form/AddAdminForm";

const AddAdmin = () => {

  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Add Admin" />
      </section>
      <AddAdminForm textButton="Submit"/>
    </section>
  );
};

export default AddAdmin;
