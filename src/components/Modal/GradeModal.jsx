import React, { useState } from "react";
import InputField from "../TextField/InputField";
import { usePerformanceStore } from "../../store/performanceStore";

export default function GradeModal({ onClose, id, data, type }) {
  const { addPerformance, updatePerformance } = usePerformanceStore();

  const baseFormData = {
    studentId: id,
    type: type || "",
    useTools: data?.useTools || "",
    procedure: data?.procedure || "",
    safety: data?.safety || "",
    product: data?.product || "",
    timeManagement: data?.timeManagement || "",
    properBalance: data?.properBalance || "",
    useOfColor: data?.useOfColor || "",
    shape: data?.shape || "",
    useOfGarnish: data?.useOfGarnish || "",
    overallPresentation: data?.overallPresentation || "",
    comments: data?.comments || "",
  };

  const [formData, setFormData] = useState(
    data ? { _id: data._id, ...baseFormData } : baseFormData
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (data) {
      await updatePerformance(formData);
      window.location.reload();
      onClose();
    } else {
      await addPerformance(formData);
      window.location.reload();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-md w-full max-w-2xl shadow-md max-h-[90vh] flex flex-col">
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
          {/* DIMENSION Section */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">
              Dimension
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Use of Tools"
                name="useTools"
                value={formData.useTools}
                onChange={handleChange}
              />
              <InputField
                label="Procedure"
                name="procedure"
                value={formData.procedure}
                onChange={handleChange}
              />
              <InputField
                label="Safety"
                name="safety"
                value={formData.safety}
                onChange={handleChange}
              />
              <InputField
                label="Product"
                name="product"
                value={formData.product}
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
                name="useOfColor"
                value={formData.useOfColor}
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
                name="useOfGarnish"
                value={formData.useOfGarnish}
                onChange={handleChange}
              />
              <InputField
                label="Overall Presentation"
                name="overallPresentation"
                value={formData.overallPresentation}
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
