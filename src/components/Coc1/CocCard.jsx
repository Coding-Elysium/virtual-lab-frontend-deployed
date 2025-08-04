import React from "react";
import { FaTools, FaList, FaExclamationTriangle } from "react-icons/fa";

const CocCard = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Procedure Details
      </h2>

      <div className="mb-4 space-y-2">
        <p>
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {data?.category}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Name:</span>{" "}
          {data?.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              data?.procedureStatus === "inappropriate"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {data?.procedureStatus}
          </span>
        </p>
      </div>

      {data.equipments?.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <FaTools className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Equipments</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.equipments.map((item, index) => (
              <div
                key={item._id || index}
                className="p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500 truncate">{item.image}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.ingredients?.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <FaList className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Ingredient Actions
            </h3>
          </div>
          <div className="space-y-3">
            {data.ingredients.map((ingredient, iIndex) =>
              ingredient.actions.map((action, aIndex) => (
                <div
                  key={`${ingredient._id || iIndex}-${action._id || aIndex}`}
                  className="p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  <p>
                    <span className="font-medium">Action:</span> {action.action}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {action.status}
                  </p>
                  <p>
                    <span className="font-medium">Tool:</span> {action.tool}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {data?.invalidReasons && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-red-600" />
            <span className="font-semibold">Invalid Reasons:</span>
          </div>
          <ul className="list-disc pl-6 space-y-1">
            {(Array.isArray(data.invalidReasons)
              ? data.invalidReasons
              : data.invalidReasons.split(".")
            )
              .filter((reason) => reason.trim() !== "")
              .map((reason, index) => (
                <li key={index}>{reason.trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CocCard;
