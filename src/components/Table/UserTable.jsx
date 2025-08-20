// src/components/UserTable/UserTable.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import SearchField from "../TextField/SearchField";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import crudStudentStore from "../../store/crudStudent";
import EditUserModal from "../Modal/EditModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
// Import the new skeleton component
import UserTableSkeleton from "../UserTableSkeleton/UserTableSkeleton";

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const loadMoreRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleCount, setVisibleCount] = useState(10);

  const {
    deleteStudent,
    studentApproved,
    fetchStudentApproved,
    loading,
    error,
  } = crudStudentStore();

  useEffect(() => {
    fetchStudentApproved();
  }, [fetchStudentApproved]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setVisibleCount(10);
  }, []);

  const handleEditClick = useCallback((user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback(
    async (userId) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
        await deleteStudent(userId);
      }
    },
    [deleteStudent]
  );

  const filteredUsers = useMemo(() => {
    if (!studentApproved) return [];

    return studentApproved
      .filter((user) => user.status === "Approved")
      .filter((user) =>
        `${user.firstName} ${user.lastName} ${user.username} ${user.gradeLevel} ${user.lrn}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [studentApproved, search]);

  const displayedUsers = useMemo(() => {
    return filteredUsers.slice(0, visibleCount);
  }, [filteredUsers, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredUsers.length) {
          setVisibleCount((prevCount) => prevCount + 10);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, filteredUsers]);

  if (error)
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between flex-col md:flex-row flex-wrap gap-4 pb-4 bg-white">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <UserTableSkeleton isMobile={isMobile} />
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        // ... mobile view code
        <>
          <div className="flex flex-col gap-6">
            <section>
              <SearchField onchange={handleSearchChange} />
            </section>
            <section>
              <Link to="/dashboard/addStudent">
                <button className="py-2 p-4 w-full background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                  Add Student
                </button>
              </Link>
            </section>
          </div>

          <div className="flex flex-col gap-4">
            {displayedUsers.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white shadow-md rounded-md border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full w-12 h-12 bg-gray-600 flex items-center justify-center text-white text-lg font-bold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-base font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div>LRN: {user.lrn}</div>
                  <div>Grade Level: {user.gradeLevel}</div>
                  <div>Gender: {user.gender}</div>
                </div>
                <div className="mt-3 flex gap-4 text-sm justify-end">
                  <button
                    className="text-white background-primary-color py-2 px-4 rounded-sm hover:opacity-90"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit User
                  </button>
                  <Link to={`/dashboard/viewProfile/${user._id}`}>
                    <button className="text-primary-color border py-2 px-4 rounded-sm hover:opacity-90">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            <div ref={loadMoreRef} className="h-8"></div>
          </div>
        </>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <div className="flex items-center justify-between flex-col md:flex-row flex-wrap gap-4 pb-4 px-6 pt-4 bg-white">
            <section>
              <SearchField
                onchange={handleSearchChange}
                bgColor="bg-gray-100"
              />
            </section>
            <section>
              <Link to="/dashboard/addStudent">
                <button className="py-2 p-4 background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                  Add Student
                </button>
              </Link>
            </section>
          </div>

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
              {displayedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b border-gray-300 hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="rounded-full w-10 h-10 bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.username}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.lrn}</td>
                  <td className="px-6 py-4">{user.gradeLevel}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      className="font-medium primary-color hover:underline mr-4 cursor-pointer"
                      onClick={() => handleEditClick(user)}
                    >
                      <FaEdit className="inline-block mr-2" /> Edit
                    </button>
                    <button
                      className="font-medium primary-color hover:underline mr-4 cursor-pointer"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      <FaTrashAlt className="inline-block mr-2" /> Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/dashboard/viewProfile/${user._id}`}
                      className="font-medium primary-color hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div ref={loadMoreRef}></div>
        </div>
      )}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
    </>
  );
}
