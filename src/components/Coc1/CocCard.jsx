import React from "react";

const CocCard = ({ data }) => {
  const isInappropriate = data.procedureStatus === "inappropriate";

  return (
    <div>
      <div className="w-full p-4 bg-white border border-gray-300 rounded-lg flex flex-col space-y-4 shadow-sm">
        <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Category:</strong>{" "}
            <span className="text-gray-500">{data.category}</span>
          </p>
          <p>
            <strong>Name:</strong>{" "}
            <span className="text-gray-500">{data.name}</span>
          </p>
        </div>

        <div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              isInappropriate
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {isInappropriate ? "Inappropriate Procedure" : "Valid Procedure"}
          </span>
        </div>

        {isInappropriate && data.invalidReasons?.length > 0 && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded space-y-1">
            <p className="font-semibold">Issues Detected:</p>
            <ul className="list-disc pl-5">
              {data.invalidReasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-indigo-600 mb-1">Ingredients</h4>
          <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
            {data.ingredients.map((ingredient, idx) => (
              <li key={idx}>
                <span className="font-medium">{ingredient.name}</span>
                {ingredient.action?.length > 0 && (
                  <ul className="ml-4 list-square">
                    {ingredient.action.map((act, i) => (
                      <li key={i}>
                        <span className="capitalize">{act.action}</span> -{" "}
                        <span
                          className={
                            act.status === "good"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }
                        >
                          {act.status}
                        </span>
                        {act.tools && (
                          <span className="ml-2 text-gray-400">
                            (Tool: <span className="italic">{act.tools}</span>)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-indigo-600 mb-1">Tools</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {data.equipments?.length > 0 ? (
              data.equipments.map((tool, idx) => (
                <li key={idx}>
                  <strong>{tool.name}</strong> -{" "}
                  <span className="italic">{tool.image}</span>
                </li>
              ))
            ) : (
              <li>No tools listed.</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-indigo-600 mb-1">Procedure</h4>
          <ol className="list-decimal pl-4 text-xs text-gray-600">
            <li>Step 1: (Procedure not available)</li>
          </ol>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded mt-auto cursor-pointer">
          Grade Performance
        </button>
      </div>
    </div>
  );
};

export default CocCard;
