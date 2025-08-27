import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const ForgotPasswordAdmin = ({ onBack }) => {
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <Link to="/">
          <button
            onClick={onBack || (() => console.log("Go Back"))}
            className="absolute top-3 right-3 text-gray-500 hover:text-indigo-600"
          >
            <FiArrowLeft size={22} />
          </button>
        </Link>

        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl text-indigo-500 mb-1">🎓</div>
          <h1 className="text-xl font-bold">VIRTUAL LAB SIMULATOR</h1>
          <p className="text-sm text-gray-600 mt-1">Forgot Password Account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={() => console.log("Hello")}
            className="w-full background-primary-color bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white py-2 rounded-md font-semibold"
          >
            Request to Super Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordAdmin;
