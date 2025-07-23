import React from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import authStore from "../store/authStore";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AddAdminForm from "../components/Form/AddAdminForm";

const Profile = () => {
  const { admin, loading } = authStore();

  if (loading) {
    return (
      <div className="text-center py-8">Loading...</div>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title={`Hi, ${admin.firstName} welcome back!`} />
      <ProfileCard admin={admin} />
      <AddAdminForm textButton="Save" admin={admin} />
    </section>
  );
};

export default Profile;
