import React, { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CardAdmin = ({ admin, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!admin) return null;

  const firstInitial = admin.firstName?.[0] || "";
  const lastInitial = admin.lastName?.[0] || "";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="focus:outline-none hover:bg-gray-200 cursor-pointer hover:rounded-2xl"
        >
          <BiDotsVerticalRounded className="text-gray-600 text-2xl" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              onClick={() => {
                setShowMenu(false);
                onEdit?.(admin);
              }}
            >
              Edit
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
              onClick={() => {
                setShowMenu(false);
                onDelete?.(admin);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-full w-20 h-20 bg-gray-600 flex items-center justify-center text-white text-3xl font-medium">
          {firstInitial}
          {lastInitial}
        </div>
        <h2 className="text-xl font-semibold">
          {admin.firstName} {admin.lastName}
        </h2>
        <p className="text-sm text-gray-600">{admin.position || "N/A"}</p>
      </div>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold">Subject:</span>{" "}
          {admin.subject || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Employee No.:</span>{" "}
          {admin.employeeNumber || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {admin.gender || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          <span className="font-medium text-black">{admin.email || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default CardAdmin;
