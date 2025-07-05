import React, { useState } from "react";

const CocOne = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const exams = [
    {
      id: "exam1",
      imageFood:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/soup_mbvceo.png",
      typeOfExam: "coc1",
      category: "main dish",
      ingredients: ["Chicken Breast", "Salt", "Pepper", "Olive Oil"],
      tools: [
        { name: "Frying Pan", usage: "Used to cook the chicken" },
        { name: "Spatula", usage: "Used to flip the meat" },
      ],
      procedure: [
        "Season the chicken breast with salt and pepper.",
        "Heat the olive oil in a frying pan.",
        "Cook the chicken on both sides until golden brown.",
        "Let it rest before serving.",
      ],
      isWellCooked: true,
      time: {
        start: new Date("2025-06-25T10:00:00"),
        end: new Date("2025-06-25T10:30:00"),
      },
    },
    {
      id: "exam1",
      imageFood:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/soup_mbvceo.png",
      typeOfExam: "coc1",
      category: "main dish",
      ingredients: ["Chicken Breast", "Salt", "Pepper", "Olive Oil"],
      tools: [
        { name: "Frying Pan", usage: "Used to cook the chicken" },
        { name: "Spatula", usage: "Used to flip the meat" },
      ],
      procedure: [
        "Season the chicken breast with salt and pepper.",
        "Heat the olive oil in a frying pan.",
        "Cook the chicken on both sides until golden brown.",
        "Let it rest before serving.",
        "Let it rest before serving.",
        "Let it rest before serving.",
      ],
      isWellCooked: true,
      time: {
        start: new Date("2025-06-25T10:00:00"),
        end: new Date("2025-06-25T10:30:00"),
      },
    },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (examId) => {
    console.log("Submitting for:", examId);
    console.log("Scores:", formData);

    // Reset
    setOpenModalIndex(null);
    setFormData({});
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-6">
        {[...exams, ...Array(5 - exams.length).fill(null)].map((exam, index) =>
          exam ? (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow space-y-4 flex flex-col"
            >
              <img
                src={exam.imageFood}
                alt="Food"
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="text-sm">
                <p>
                  <strong>Category:</strong> {exam.category}
                </p>
                <p>
                  <strong>Is Well Cooked:</strong>{" "}
                  {exam.isWellCooked ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(exam.time.start).toLocaleTimeString()} -{" "}
                  {new Date(exam.time.end).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-600">Ingredients</h4>
                <ul className="list-disc pl-4 text-xs text-gray-700">
                  {exam.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-600">Tools</h4>
                <ul className="text-xs text-gray-700">
                  {exam.tools.map((tool, i) => (
                    <li key={i}>
                      <strong>{tool.name}:</strong> {tool.usage}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-600">Procedure</h4>
                <ol className="list-decimal pl-4 text-xs text-gray-700">
                  {exam.procedure.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <button
                className="bg-indigo-600 text-white text-sm py-2 rounded hover:bg-indigo-700 mt-auto cursor-pointer"
                onClick={() => {
                  setOpenModalIndex(index);
                  setFormData({});
                }}
              >
                Grade Performance
              </button>
            </div>
          ) : (
            <div
              key={`empty-${index}`}
              className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center text-gray-400"
            >
              Not taking yet
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {openModalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModalIndex(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Grade Performance Evaluation
            </h2>

            {/* Form Content */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(exams[openModalIndex].id);
              }}
              className="space-y-6"
            >
              {/* Dimensions Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Technical Dimensions (0–4)
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Evaluate the student's performance based on the following
                  technical criteria.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: "useTools", label: "Use of Tools" },
                    { field: "procedure", label: "Procedure" },
                    { field: "safety", label: "Safety Compliance" },
                    { field: "product", label: "Product Quality" },
                    { field: "timeManagement", label: "Time Management" },
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <input
                        type="number"
                        name={field}
                        min={0}
                        max={4}
                        value={formData[field] || ""}
                        onChange={handleInput}
                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Criteria Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Presentation Criteria (0–5)
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Score the student's output based on presentation and
                  aesthetics.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: "properBalance", label: "Proper Balance" },
                    { field: "useOfColor", label: "Use of Color" },
                    { field: "shape", label: "Shape & Form" },
                    { field: "useOfGarnish", label: "Use of Garnish" },
                    {
                      field: "overallPresentation",
                      label: "Overall Presentation",
                    },
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <input
                        type="number"
                        name={field}
                        min={0}
                        max={5}
                        value={formData[field] || ""}
                        onChange={handleInput}
                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment / Feedback
                </label>
                <textarea
                  name="comment"
                  value={formData.comment || ""}
                  onChange={handleInput}
                  rows={4}
                  placeholder="Add any remarks about the student's performance..."
                  className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
                >
                  Submit Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CocOne;
