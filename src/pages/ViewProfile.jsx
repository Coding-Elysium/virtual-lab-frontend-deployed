import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../components/Header/DashboardHeader";
import CocOne from "../components/Coc1/CocOne";
import CocTwo from "../components/Coc2/CocTwo";
import CocThree from "../components/Coc3/CocThree";
import crudStudentStore from "../store/crudStudent";

const ViewProfile = () => {
  const { _id } = useParams();
  const { fetchProfile, profile, loading, error } = crudStudentStore();

  useEffect(() => {
    if (_id) {
      fetchProfile(_id);
    }
  }, [_id]);

  const [activeTab, setActiveTab] = useState("COC 1");

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500 mt-10">User not found.</div>
    );
  }

  return (
    <div className="bg-gray-100">
      <DashboardHeader title="Student Profile" />

      <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* LEFT PANEL */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-28 h-28 mx-auto bg-indigo-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-inner">
              {profile.firstName.charAt(0).toUpperCase()}
              {profile.lastName.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold mt-4">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-500">Senior High School</p>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
              About the Student
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between">
                <span className="font-medium">Full Name:</span>
                <span>
                  {profile.firstName} {profile.lastName}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{profile.email}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Gender:</span>
                <span>{profile.gender}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Grade Level:</span>
                <span>{profile.gradeLevel}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`capitalize font-semibold ${
                    profile.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {profile.status}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              {["COC 1", "COC 2", "COC 3"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "COC 1" && (
                <>
                  <CocOne />
                </>
              )}
              {activeTab === "COC 2" && (
                <>
                  <CocTwo />
                </>
              )}
              {activeTab === "COC 3" && <CocThree />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
