import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";
import SearchField from "../TextField/SearchField";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../../store/authStore";

const Header = ({ onMenuClick }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const { admin, logoutAdmin } = authStore();

  console.log(admin);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white relative">
      <div className="flex items-center gap-4">
        {isMobile && (
          <FiMenu onClick={onMenuClick} className="text-2xl cursor-pointer" />
        )}
        {!isMobile && (
          <h1 className="text-xl font-bold text-indigo-500 flex items-center">
            <span className="mr-1 text-2xl">🎓</span> VIRTUAL LAB SIMULATOR
          </h1>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <section className="flex items-center gap-4">

          {!isMobile && (
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {admin.firstName} {admin.lastName}
              </h1>
              <p className="text-sm text-gray-600 font-medium">Head Teacher</p>
            </div>
          )}
          
          <div
            className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold uppercase cursor-pointer hover:bg-gray-700 transition duration-200"
            onClick={handleToggleDropdown}
            title="Account Options"
          >
            <span>
              {admin.firstName?.[0] ?? ''}{admin.lastName?.[0] ?? ''}
            </span>
          </div>
        </section>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
            <ul className="flex flex-col">
              <Link to="/dashboard/profile" onClick={() => setIsDropdownOpen(false)}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
              </Link>
              <Link to="/dashboard/profile" onClick={() => setIsDropdownOpen(false)}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
