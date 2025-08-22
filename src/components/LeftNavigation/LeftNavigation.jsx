import React, { useState } from "react";
import {
  FaHome,
  FaUserPlus,
  FaUserGraduate,
  FaUserShield,
  FaListUl,
  FaChalkboardTeacher, // Updated
  FaUserCog, // Updated
  FaChartLine, // Updated
} from "react-icons/fa";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import authStore from "../../store/authStore";

const MenuItem = ({ icon, title, to, children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = to && location.pathname === to;

  return (
    <div>
      <Link to={to || "#"}>
        <div
          className={`flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100 ${
            isActive ? "bg-gray-200 font-bold text-blue-600" : ""
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center space-x-3 text-gray-700">
            {icon}
            <span className="text-xs font-semibold">{title}</span>
          </div>
          {children && (open ? <BiChevronDown /> : <BiChevronRight />)}
        </div>
      </Link>

      {open && children && (
        <div className="ml-8 space-y-2 text-xs text-gray-600">{children}</div>
      )}
    </div>
  );
};

const LeftNavigation = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { admin, isLoggedIn } = authStore();

  console.log("Admin data:", admin.role);

  return (
    <aside className="w-64 h-screen bg-white shadow-md overflow-y-auto">
      {isMobile && (
        <div className="py-4 px-4">
          <h1 className="text-xl font-bold text-indigo-500 flex items-center">
            <span className="mr-1 text-2xl">🎓</span> VIRTUAL LAB
          </h1>
        </div>
      )}

      <div className="p-4 text-gray-400 text-xs uppercase tracking-wide">
        Main Menu
      </div>

      {admin.role === "admin" && (
        <>
          <MenuItem to="/dashboard" icon={<FaHome />} title="Dashboard" />
          <MenuItem
            to="/dashboard/addStudent"
            icon={<FaUserPlus />}
            title="Add Student"
          />
          <MenuItem
            to="/dashboard/pendingStudent"
            icon={<FaListUl />}
            title="Pending Student"
          />
          <MenuItem
            to="/dashboard/studentList"
            icon={<FaUserGraduate />}
            title="Student List"
          />
        </>
      )}

      {admin.role === "superadmin" && (
        <>
          <MenuItem to="/dashboard" icon={<FaHome />} title="Dashboard" />
          <MenuItem
            to="/dashboard/addStudent"
            icon={<FaUserPlus />}
            title="Add Student"
          />
          <MenuItem
            to="/dashboard/pendingStudent"
            icon={<FaListUl />}
            title="Pending Student"
          />
          <MenuItem
            to="/dashboard/studentList"
            icon={<FaUserGraduate />}
            title="Student List"
          />
          {/* <MenuItem
            to="/dashboard/studentRetake"
            icon={<FaChalkboardTeacher />}
            title="Retake Student"
          /> */}
          <MenuItem
            to="/dashboard/addAdmin"
            icon={<FaUserCog />}
            title="Add Admin"
          />
          <MenuItem
            to="/dashboard/adminList"
            icon={<FaUserShield />}
            title="Admin List"
          />
          <MenuItem
            to="/dashboard/forgotPassword"
            icon={<FaUserShield />}
            title="Forgot Password Request"
          />
        </>
      )}
    </aside>
  );
};

export default LeftNavigation;
