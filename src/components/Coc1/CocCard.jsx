import React from "react";
import {
  FaTools,
  FaList,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  capitalizeEachWord,
  capitalizeWords,
} from "../../helper/helper";

const CocCard = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Procedure Details
      </h2>

      {/* Basic Info */}
      <div className="space-y-2 text-sm sm:text-base">
        <p>
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {capitalizeEachWord(data?.category)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Name:</span>{" "}
          {capitalizeWords(data?.name)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
              data?.procedureStatus === "inappropriate"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {capitalizeWords(data?.procedureStatus)}
          </span>
        </p>
      </div>

      {/* Equipments */}
      {data.equipments?.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <FaTools className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Equipments</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.equipments.map((item, index) => (
              <div
                key={item._id || index}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-4"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <p className="font-medium text-gray-800">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      {data.ingredients?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <FaList className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Ingredient Actions
            </h3>
          </div>
          <div className="space-y-6">
            {data.ingredients.map((ingredient, iIndex) => (
              <div
                key={ingredient._id || iIndex}
                className="p-5 border border-gray-200 rounded-lg bg-gray-50"
              >
                {/* Ingredient Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={ingredient.image || ingredient.path || "/placeholder.png"}
                    alt={ingredient.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {ingredient.name}
                  </p>
                </div>

                {/* Used Section */}
                {ingredient.used && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={ingredient.used.image}
                        alt={ingredient.used.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <p className="font-medium text-blue-800">
                        Kitchen Tools: {capitalizeWords(ingredient.used.name)}
                      </p>
                    </div>

                    {ingredient.used.actions?.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ingredient.used.actions.map((ua, index) => (
                          <div
                            key={index}
                            className="bg-white border border-blue-100 rounded p-2 text-sm"
                          >
                            <p>
                              <span className="font-medium">Action:</span>{" "}
                              {capitalizeWords(ua.action)}
                            </p>
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              <span
                                className={`${
                                  ua.status === "perfect"
                                    ? "text-green-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {capitalizeWords(ua.status)}
                              </span>
                            </p>
                            {ua.tool && ua.tool.trim() && (
                              <p>
                                <span className="font-medium">Tool:</span>{" "}
                                {capitalizeWords(ua.tool)}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Ingredient Actions */}
                {ingredient.actions?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ingredient.actions.map((action, aIndex) => (
                      <div
                        key={`${iIndex}-${aIndex}`}
                        className="p-3 border border-gray-200 rounded bg-white text-sm"
                      >
                        <p>
                          <span className="font-medium">Action:</span>{" "}
                          {capitalizeWords(action.action)}
                        </p>
                        <p>
                          <span className="font-medium">Tool:</span>{" "}
                          {capitalizeWords(action.tool)}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span
                            className={`font-semibold ${
                              action.status === "perfect"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {capitalizeWords(action.status)}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invalid Reasons */}
      {data?.invalidReasons?.length > 0 && (
        <div className="mt-8 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg text-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaExclamationTriangle className="text-red-600" />
            <span className="font-semibold text-base">Invalid Reasons</span>
          </div>
          <ul className="list-disc pl-6 space-y-1">
            {data.invalidReasons.map((reason, index) => (
              <li key={index}>{reason.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CocCard;
