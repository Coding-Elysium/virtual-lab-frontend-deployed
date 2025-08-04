import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  defaultValue,
  required,
}) => {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color invalid:border-red-500"
        required={required}
      />
    </div>
  );
};

export default InputField;
