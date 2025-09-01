import React, { useState } from "react";
import InputField from "../TextField/InputField";
import passwordStore from "../../store/passwordStore";
import Modal from "./Modal";

export default function ModalChangePass({
  isOpen,
  onClose,
  requestId,
  admin,
  student,
}) {
  const [formData, setFormData] = useState({ newPassword: "" });
  const { setPasswordAdmin, setPasswordStudent } = passwordStore();
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (admin) {
        const res = await setPasswordAdmin(requestId, formData.newPassword);
        setModalMessage(res.message);
        setModalType("success");
        setShowModal(true);
        onClose();
      } else {
        const res = await setPasswordStudent(requestId, formData.newPassword);
        setModalMessage(res.message);
        setModalType("success");
        setShowModal(true);
        onClose();
      }
    } catch (error) {
      setModalMessage(error.message);
      setModalType("error");
      setShowModal(true);
    }
  };

  if (!isOpen || (!admin && !student)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <p className="mb-4 text-gray-600">
          Reset password for{" "}
          <strong>
            {admin
              ? `${admin.firstName} ${admin.lastName}`
              : `${student.firstName} ${student.lastName}`}
          </strong>
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 text-white background-primary-color rounded-sm hover:opacity-80"
          >
            Set Password
          </button>
        </div>
      </div>

      <Modal
        show={showModal}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}
