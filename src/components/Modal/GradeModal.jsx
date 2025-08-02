import React, { useState } from "react";
import InputField from "../TextField/InputField";

export default function GradeModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    useEquipment: "",
    applicationProcedures: "",
    safetyHabits: "",
    product: "",
    position: "",
    timeManagement: "",
    properBalance: "",
    useColor: "",
    shape: "",
    useGarnish: "",
    overAllPresentation: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (onSave) onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-md w-full max-w-2xl shadow-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Grade Performance</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-4 flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">
              Dimension
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Use of Equipment"
                name="useEquipment"
                value={formData.useEquipment}
                onChange={handleChange}
              />
              <InputField
                label="Application of Procedures"
                name="applicationProcedures"
                value={formData.applicationProcedures}
                onChange={handleChange}
              />
              <InputField
                label="Safety Habits"
                name="safetyHabits"
                value={formData.safetyHabits}
                onChange={handleChange}
              />
              <InputField
                label="Product"
                name="product"
                value={formData.product}
                onChange={handleChange}
              />
              <InputField
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
              <InputField
                label="Time Management"
                name="timeManagement"
                value={formData.timeManagement}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CRITERIA Section */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">
              Criteria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Proper Balance"
                name="properBalance"
                value={formData.properBalance}
                onChange={handleChange}
              />
              <InputField
                label="Use of Color"
                name="useColor"
                value={formData.useColor}
                onChange={handleChange}
              />
              <InputField
                label="Shape"
                name="shape"
                value={formData.shape}
                onChange={handleChange}
              />
              <InputField
                label="Use of Garnish"
                name="useGarnish"
                value={formData.useGarnish}
                onChange={handleChange}
              />
              <InputField
                label="Overall Presentation"
                name="overAllPresentation"
                value={formData.overAllPresentation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium mb-1">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write comments here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
