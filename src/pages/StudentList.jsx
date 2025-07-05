import React from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import UserTable from "../components/Table/UserTable";

const StudentList = () => {
  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title="Student List" />
      <UserTable />
    </section>
  );
};

export default StudentList;
