import React, { useEffect } from "react";
import CardStatus from "../components/CardStatus/CardStatus";
import UserTable from "../components/Table/UserTable";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import crudStudentStore from "../store/crudStudent.jsx";
import authStore from "../store/authStore.jsx";

const Dashboard = () => {
  const { student, fetchAllStudents, loading } = crudStudentStore();
  const { admin, isLoggedIn } = authStore();

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const totalStudents = student.length;
  const totalSenior = student.filter(
    (user) => user.gradeLevel === "Senior High School"
  ).length;
  const totalJunior = student.filter(
    (user) => user.gradeLevel === "Junior High School"
  ).length;
  const totalPending = student.filter(
    (user) => user.status === "Pending"
  ).length;
  console.log("Total pending:", totalPending);

  const groupedByGrade = ["Senior High School", "Junior High School"].map(
    (grade) => {
      const group = student.filter((user) => user.gradeLevel === grade);
      return {
        grade,
        approved: group.filter(
          (user) => user.status?.toLowerCase() === "approved"
        ).length,
        pending: group.filter(
          (user) => user.status?.toLowerCase() === "pending"
        ).length,
      };
    }
  );

  return (
    <main className="flex-1 bg-gray-100 overflow-y-auto">
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <CardStatus title="Total Students" value={totalStudents} />
          <CardStatus title="Pending Requests" value={totalPending} />
          <CardStatus title="Senior High School" value={totalSenior} />
          <CardStatus title="Junior High School" value={totalJunior} />
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Student Approval Status by Grade Level
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={groupedByGrade}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#22C55E" name="Approved" />
                <Bar dataKey="pending" fill="#F97316" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Students
        </h2>
        <h2>
          <span className="text-sm text-gray-600">
            {isLoggedIn
              ? `Welcome, ${admin?.firstName}`
              : "Please log in to view data."}
          </span>
        </h2>
        <UserTable />
      </>
    </main>
  );
};

export default Dashboard;
