import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import SearchField from "../components/TextField/SearchField";
import CardStudentPass from "../components/CardStatus/CardStudentPass";
import CardAdminPass from "../components/CardStatus/CardAdminPass";
import passwordStore from "../store/passwordStore";

const ForgotPassword = () => {
  const {
    fetchRequestPasswordAdmin,
    fetchRequestPasswordStudent,
    adminRequestPassword,
    studentRequestPassword,
    loading,
  } = passwordStore();

  const [view, setView] = useState("student");

  useEffect(() => {
    fetchRequestPasswordAdmin();
    fetchRequestPasswordStudent();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Forgot Password Request" />
      </section>

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-auto">
          <SearchField onChange={(e) => {}} />
        </div>

        <div className="flex gap-2 justify-center sm:justify-end">
          <button
            className={`px-4 py-2 rounded-lg transition w-full ${
              view === "student" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("student")}
          >
            Students
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition w-full ${
              view === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("admin")}
          >
            Admin
          </button>
        </div>
      </section>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : view === "admin" ? (
        <section className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
          {adminRequestPassword.length > 0 ? (
            adminRequestPassword.map((req) => (
              <CardAdminPass key={req._id} data={req} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No admin requests found
            </p>
          )}
        </section>
      ) : (
        <section className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
          {studentRequestPassword.length > 0 ? (
            studentRequestPassword.map((req) => (
              <CardStudentPass key={req._id} data={req} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No student requests found
            </p>
          )}
        </section>
      )}
    </section>
  );
};

export default ForgotPassword;
