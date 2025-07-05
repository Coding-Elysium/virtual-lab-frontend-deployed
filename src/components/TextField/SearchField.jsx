import React from "react";
import { FaSearch } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const SearchField = ({ onchange, bgColor = "bg-white" }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const inputClasses = `w-full pl-10 pr-4 py-2 rounded-lg ${bgColor} focus:outline-none`;

  return (
    <>
      {isMobile ? (
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={inputClasses}
              onChange={onchange}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      ) : (
        <div className="flex-grow w-[500px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={inputClasses}
              onChange={onchange}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchField;
