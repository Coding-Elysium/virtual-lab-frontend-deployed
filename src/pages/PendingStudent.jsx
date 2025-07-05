import React from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import PendingTable from "../components/Table/PendingTable";

const PendingStudent = () => {
  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title="Pending Students" />
      <PendingTable />
    </section>
  );
};

export default PendingStudent;
