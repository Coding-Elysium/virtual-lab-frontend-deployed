import React, { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CardChangePassword = ({ data, onEdit, onDelete }) => {
  if (!data) return null;

  const firstInitial = data.firstName?.[0] || "";
  const lastInitial = data.lastName?.[0] || "";

  return (
    <div className="bg-white shadow-md flex flex-col gap-4 p-6">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-20 h-20 bg-gray-600 flex items-center justify-center text-white text-3xl font-medium">
          {firstInitial}
          {lastInitial}
        </div>
        <h2 className="text-xl font-semibold">
          {data.firstName} {data.lastName}
        </h2>
        <p className="text-sm text-gray-600">{data.position || "N/A"}</p>
        <p className="text-sm text-gray-600">{data.role || "N/A"}</p>
      </div>

      <div className="flex flex-col gap-4">
        <button className="w-full background-primary-color text-white py-2 rounded-sm">
            Change Password
        </button>
        <button className="w-full border border-red-400 text-red-400 py-2 rounded-sm">
            Deny
        </button>
      </div>
    </div>
  );
};

export default CardChangePassword;
