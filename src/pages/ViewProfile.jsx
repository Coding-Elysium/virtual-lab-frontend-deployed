import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../components/Header/DashboardHeader";
import crudStudentStore from "../store/crudStudent";
import cocStore from "../store/cocStore";
import CocCard from "../components/Coc1/CocCard";

const ViewProfile = () => {
  const { _id } = useParams();
  const { fetchProfile, profile, loading, error } = crudStudentStore();
  const { fetchCoc, coc, loading: cocLoading } = cocStore();
  const [activeTab, setActiveTab] = useState("coc1");

  useEffect(() => {
    if (_id) {
      fetchProfile(_id);
    }
  }, [_id]);

  useEffect(() => {
    if (_id && activeTab) {
      fetchCoc(_id, activeTab);
    }
  }, [_id, activeTab]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500 mt-10">User not found.</div>
    );
  }

  coc.map((item) => (
    console.log(item.name)
  ))

  return (
    <div className="bg-gray-100">
      <DashboardHeader title="Student Profile" />
      <div className="mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="w-28 h-28 mx-auto bg-indigo-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-inner">
              {profile.firstName?.charAt(0).toUpperCase()}
              {profile.lastName?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold mt-4">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-500">Senior High School</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
              About the Student
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between">
                <span className="font-medium">Full Name:</span>
                <span>{profile.firstName} {profile.lastName}</span>
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

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow">
            <div className="flex border-b border-gray-200 px-6">
              {["coc1", "coc2", "coc3"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="p-6">
              {cocLoading ? (
                <div className="text-center text-gray-500 py-10">Loading COC data...</div>
              ) : coc.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No COC data available.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {
                    coc.map((item) => (
                      <CocCard data={item}/>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
