import { useState } from "react";
import ModalChangePass from "../Modal/ModalChangePass";

const CardStudentPass = () => {
  const [isOpenChange, setIsOpenChange] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition">
      <div className="rounded-full w-20 h-20 bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold shadow-md">
        J
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">John Carlo Abanes</p>
        <p className="text-sm text-gray-500">123123123123</p>
      </div>

      <button
        className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        onClick={() => setIsOpenChange(true)}
      >
        Change Password
      </button>
      {isOpenChange && (
        <ModalChangePass
          isOpen={isOpenChange}
          onClose={() => setIsOpenChange(false)}
          user={{ id: 1, name: "John Carlo Abanes", password: "123123123123" }}
        />
      )}
    </div>
  );
};

export default CardStudentPass;
