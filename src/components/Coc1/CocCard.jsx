import React from "react";
import { FaTools, FaList, FaExclamationTriangle } from "react-icons/fa";
import { capitalizeEachWord, capitalizeWords } from "../../helper/helper";

// Helper to parse validation reasons for quick lookup
const parseInvalidReasons = (reasons = []) => {
  const result = {};
  reasons.forEach((reason) => {
    const isValid = reason.startsWith("✅"); // Matches ingredient, action, tool from valid messages
    const match = reason.match(
      /(?:(?:Action|✅ Ingredient) "(.+?)")[^"]*"(?:.+?" )?(?:on )?"?(.+?)"?[^"]*"?(?:with tool )?"?(.+?)"?[.]?/i
    );
    if (match) {
      const [, action, ingredient, tool] = match;
      const key = `${ingredient.toLowerCase()}__${action.toLowerCase()}__${tool.toLowerCase()}`;
      result[key] = { isValid, reason };
    }
  });
  return result;
};

// Function to handle duplicates and render them as "2x"
const getIngredientDisplay = (ingredient, actions) => {
  const display = actions.map((action, aIndex) => {
    return (
      <div key={`${ingredient.name}-${aIndex}`} className="p-3 border rounded text-sm">
        <p>
          <span className="font-medium">Action:</span> {capitalizeWords(action.action)}
        </p>
        <p>
          <span className="font-medium">Tool:</span> {capitalizeWords(action.tool)}
        </p>
        <p>
          <span className="font-medium">Status:</span> 
          <span className={action.status === "perfect" ? "text-green-600" : "text-yellow-600"}>
            {capitalizeWords(action.status)}
          </span>
        </p>
      </div>
    );
  });
  
  // If we have more than one of the same ingredient, show "2x"
  return (
    <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={ingredient.image || "/placeholder.png"}
          alt={ingredient.name}
          className="h-20 object-cover"
        />
        <p className="text-lg font-semibold text-gray-800 capitalize">
          {ingredient.name} {actions.length > 1 && `x${actions.length}`}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {display}
      </div>
    </div>
  );
};

const CocCard = ({ data }) => {
  const validationMap = parseInvalidReasons(data?.invalidReasons || []);
  const groupedIngredients = {};

  // Group ingredients by name and action
  data.ingredients.forEach((ingredient) => {
    const ingredientKey = ingredient.name.toLowerCase();
    if (!groupedIngredients[ingredientKey]) {
      groupedIngredients[ingredientKey] = [];
    }
    ingredient.actions.forEach((action) => {
      groupedIngredients[ingredientKey].push(action);
    });
  });

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-300 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Procedure Details: {capitalizeWords(data?.name)}
      </h2>
      {/* Basic Info */}
      <div className="space-y-2 text-sm sm:text-base mb-6">
        <p>
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {capitalizeEachWord(data?.category)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
              data?.procedureStatus === "inappropriate" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {capitalizeWords(data?.procedureStatus)}
          </span>
        </p>
      </div>

      {/* Ingredients */}
      {data.ingredients?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaList /> Ingredients & Actions
          </h3>
          <div className="space-y-6">
            {Object.keys(groupedIngredients).map((ingredientName) => {
              const ingredient = data.ingredients.find(
                (ing) => ing.name.toLowerCase() === ingredientName
              );
              const actions = groupedIngredients[ingredientName];
              return getIngredientDisplay(ingredient, actions);
            })}
          </div>
        </section>
      )}

      {/* Procedure Steps (done by student) */}
      {data.procedureSteps?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaTools /> Kitchen tools use in ingredients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.procedureSteps.map((step, idx) => (
              <div key={step.name + idx} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={step.image || "/placeholder.png"}
                    alt={step.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{step.name}</p>
                    <p className="text-sm text-gray-600 capitalize">Action: {capitalizeWords(step.action)}</p>
                    <p className="text-sm text-gray-600 capitalize">Tool: {capitalizeWords(step.tool)}</p>
                    <p className="text-sm font-semibold text-green-700">Status: {capitalizeWords(step.status)}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ingredients: </span>{" "}
                  {step.ingredients.length > 0 ? step.ingredients.join(", ") : "N/A"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Validation Summary */}
      {data.invalidReasons?.length > 0 && (
        <section className="mt-8 space-y-6">
          {/* Valid steps */}
          {data.invalidReasons.some((reason) => reason.startsWith("✅")) && (
            <div className="p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg text-sm">
              <h4 className="font-semibold text-base mb-2">Valid Steps</h4>
              <ul className="list-disc pl-6 space-y-1">
                {data.invalidReasons
                  .filter((r) => r.startsWith("✅"))
                  .map((reason, idx) => (
                    <li key={"valid-" + idx}>{reason.replace("✅ ", "").trim()}</li>
                  ))}
              </ul>
            </div>
          )}
          {/* Invalid reasons */}
          {data.invalidReasons.some((reason) => !reason.startsWith("✅")) && (
            <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg text-sm">
              <h4 className="flex items-center gap-2 mb-2 font-semibold text-red-700">
                <FaExclamationTriangle /> Invalid Reasons
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                {data.invalidReasons
                  .filter((r) => !r.startsWith("✅"))
                  .map((reason, idx) => (
                    <li key={"invalid-" + idx}>{reason.trim()}</li>
                  ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default CocCard;
