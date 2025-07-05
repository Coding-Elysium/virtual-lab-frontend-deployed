import React from "react";

const DashboardHeader = ({ title = "Title" }) => {
  return (
    <section className="bg-white p-4 rounded-lg">
      <h1 className="font-bold primary-color">{title}</h1>
    </section>
  );
};

export default DashboardHeader;
