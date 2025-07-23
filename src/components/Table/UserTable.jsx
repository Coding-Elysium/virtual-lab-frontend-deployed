import { useState, useEffect, useRef } from "react";
import SearchField from "../TextField/SearchField";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import crudStudentStore from "../../store/crudStudent";
import EditUserModal from "../Modal/EditModal";

export default function UserTable() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const loadMoreRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { studentApproved, fetchStudentApproved, loading, error } =
    crudStudentStore();

  useEffect(() => {
    fetchStudentApproved();
  }, []);

  const filteredUsers = studentApproved
    .filter((user) => user.status === "Approved")
    .filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.gradeLevel} ${user.lrn}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  useEffect(() => {
    if (filteredUsers.length <= visibleCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [filteredUsers.length, visibleCount]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
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
            <section>
              <Link to="/dashboard/addStudent">
                <button className="py-2 p-4 w-full background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                  Add Student
                </button>
              </Link>
            </section>
          </div>

          <div className="flex flex-col gap-4">
            {visibleUsers.map((user) => (
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
                    <div className="text-sm text-gray-500">{user.email}</div>
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
                </div>
              </div>
            ))}
            <div ref={loadMoreRef} className="h-8"></div>
            <EditUserModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              user={selectedUser}
            />
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
              {visibleUsers.map((user) => (
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
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.lrn}</td>
                  <td className="px-6 py-4">{user.gradeLevel}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditModalOpen(true);
                      }}
                      href="#"
                      className="font-medium primary-color hover:underline"
                    >
                      Edit user
                    </a>
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

          <div ref={loadMoreRef} className="h-8"></div>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser}
          />
        </div>
      )}
    </>
  );
}
