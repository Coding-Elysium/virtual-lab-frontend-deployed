import React from "react";

const CocCard = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Procedure Details</h2>
      <ul className="space-y-1 text-sm text-gray-700 capitalize">
        <li><span className="font-medium">Category:</span> {data?.category}</li>
        <li><span className="font-medium">Name:</span> {data?.name}</li>
        <li><span className="font-medium">Status:</span> {data?.procedureStatus}</li>
      </ul>

      {data.equipments?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-800 mb-1">Equipments</h3>
          <ul className="space-y-1 text-sm text-gray-700 capitalize">
            {data.equipments.map((item, index) => (
              <>
                <li key={index} className="ml-4 list-disc">
                  <span className="font-medium">Name:</span> {item.name}<br />
                </li>
                <li key={index} className="ml-4 list-disc">
                  <span className="font-medium">Image:</span> {item.image}<br />
                </li>
              </>
            ))}
          </ul>
        </div>
      )}

      {data.ingredients?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-800 mb-1">Ingredient Actions</h3>
          <ul className="space-y-2 text-sm text-gray-700 capitalize">
            {data.ingredients.map((ingredient, iIndex) =>
              ingredient.actions.map((action, aIndex) => (
                <>
                  <li key={`${iIndex}-${aIndex}`} className="ml-4 list-disc">
                    <span className="font-medium">Action:</span> {action.action}<br />
                  </li>
                  <li key={`${iIndex}-${aIndex}`} className="ml-4 list-disc">
                    <span className="font-medium">Status:</span> {action.status}<br />
                  </li>
                  <li key={`${iIndex}-${aIndex}`} className="ml-4 list-disc">
                    <span className="font-medium">Tool:</span> {action.tool}
                  </li>
                </>
              ))
            )}
          </ul>
        </div>
      )}

      <div className="mt-4 capitalize">
        <span className="font-medium text-sm text-gray-800">Invalid Reason: </span>
        <span className="text-sm text-gray-700">
          {data?.invalidReason || "No invalid reason"}
        </span>
      </div>
    </div>
  );
};

export default CocCard;
