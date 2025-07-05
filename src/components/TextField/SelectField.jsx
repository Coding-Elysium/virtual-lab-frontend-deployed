import React from "react";
import { FiChevronDown } from "react-icons/fi"; // You can use any icon here

const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="relative w-full">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none border rounded px-3 border-gray-300 py-2 pr-10"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom dropdown icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <FiChevronDown className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
