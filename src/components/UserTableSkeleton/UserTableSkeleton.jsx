import React from "react";

const UserTableSkeleton = ({ isMobile }) => {
  const tableRows = Array(10).fill(0);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {tableRows.map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full w-12 h-12 bg-gray-300"></div>
              <div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
                <div className="h-3 w-48 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-3 flex gap-4 text-sm justify-end">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">LRN</th>
              <th className="px-6 py-3">Grade Level</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((_, index) => (
              <tr key={index} className="bg-white border-b border-gray-300">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <div className="rounded-full w-10 h-10 bg-gray-300"></div>
                  <div className="ps-3">
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded mt-2"></div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
