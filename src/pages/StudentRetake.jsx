import React from 'react'
import DashboardHeader from "../components/Header/DashboardHeader";
import { useMediaQuery } from 'react-responsive';
import SearchField from '../components/TextField/SearchField';
import { Link } from 'react-router-dom';

const StudentRetake = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title="Retake Student" />
      <>
        {isMobile ? (
          <>
            <div className="flex flex-col gap-6">
              <section>
                <SearchField
                  onchange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(10);
                  }}
                />
              </section>
            </div>

            <div className="flex flex-col gap-4">
                <div
                  className="p-4 bg-white shadow-md rounded-md border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full w-12 h-12 bg-gray-600 flex items-center justify-center text-white text-lg font-bold">
                      JC
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        John Carlo Abanes
                      </div>
                      <div className="text-sm text-gray-500">abierajc0707@gmail.com</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <div>LRN: 123123123123</div>
                    <div>Grade Level: Junior High School</div>
                    <div>Gender: Male</div>
                  </div>
                  {/* <div className="mt-3 flex gap-4 text-sm justify-end">
                    <button
                      className="text-white background-primary-color py-2 px-4 rounded-sm hover:opacity-90"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit User
                    </button>
                    <Link to={`/dashboard/viewProfile/${user._id}`}>
                      <button className="text-primary-color border py-2 px-4 rounded-sm hover:opacity-90">
                        View Profile
                      </button>
                    </Link>
                  </div> */}
                </div>
              {/* <div ref={loadMoreRef} className="h-8"></div> */}
             
            </div>
          </>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between flex-col md:flex-row flex-wrap gap-4 pb-4 px-6 pt-4 bg-white">
              <section>
                <SearchField
                  onchange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(10);
                  }}
                  bgColor="bg-gray-100"
                />
              </section>
            </div>

            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">LRN</th>
                  <th className="px-6 py-3">Number of Takes</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                  <tr
                    className="bg-white border-b border-gray-300 hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      <div className="rounded-full w-10 h-10 bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                        JC
                      </div>
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          John Carlo Abanes
                        </div>
                        <div className="font-normal text-gray-500">
                          jcabiera07@gmail.com
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">456456466</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-6">
                        <button
                          className="text-green-600 hover:underline font-medium"
                          onClick={() => handleApprove(user._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="text-red-600 hover:underline font-medium"
                          onClick={() => handleDeny(user._id)}
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="font-medium primary-color hover:underline"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
              </tbody>
            </table>

            {/* <div ref={loadMoreRef} className="h-8"></div> */}
          </div>
        )}
      </>
    </section>
  )
}

export default StudentRetake