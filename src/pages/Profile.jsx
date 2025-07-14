import React from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import authStore from "../store/authStore";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AddAdminForm from "../components/Form/AddAdminForm";

const Profile = () => {
  const { admin } = authStore();
  // const { updateAdmin } = crudAdminStore();

  // const handleSave = async (formData) => {
  //   console.log("Updating with: ", formData);
  // };

  const handleSave = () => {
    console.log("Saving...");
  };

  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title={`Hi, ${admin.firstName} welcome back!`} />
      <ProfileCard admin={admin} />
      <AddAdminForm textButton="Save" admin={admin} handleSubmit={handleSave} />
    </section>
  );
};

export default Profile;
