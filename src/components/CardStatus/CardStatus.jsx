import React from "react";

const CardStatus = ({ title = "Total Students", value = "245" }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default CardStatus;
