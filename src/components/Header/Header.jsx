import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";
import SearchField from "../TextField/SearchField";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

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
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile"
          className={`rounded-full object-cover cursor-pointer border ${
            isMobile ? "w-6 h-6" : "w-8 h-8"
          }`}
          onClick={handleToggleDropdown}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
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
