import React, { useEffect, useState, useRef } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import CardAdmin from "../components/CardStatus/CardAdmin";
import SearchField from "../components/TextField/SearchField";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import crudAdminStore from "../store/crudAdmin";
import EditAdminModal from "../components/Modal/EditAdminModal";

const AdminList = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState("");
  const [editOpenModal, setOpenEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const loadMoreRef = useRef(null);

  const { updateAdmin, fetchAllAdmin, admin, loading, error, deleteAdmin } =
    crudAdminStore();

  useEffect(() => {
    fetchAllAdmin();
  }, []);

  const filteredUsers = admin.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.employeeNumber} ${user.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteAdminData = async (id) => {
    await deleteAdmin(id);
  };

  // const visibleUsers = filteredUsers.slice(0, visibleCount);

  // useEffect(() => {
  //   if (filteredUsers.length <= visibleCount) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setVisibleCount((prev) => prev + 10);
  //       }
  //     },
  //     {
  //       threshold: 1.0,
  //     }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     if (loadMoreRef.current) {
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   };
  // }, [filteredUsers.length, visibleCount]);

  const handleSave = async (adminData) => {
    await updateAdmin(adminData);
    await fetchAllAdmin();
    setOpenEditModal(false);
    setSelectedAdmin(null);
  };

  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title="Admin List" />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      ) : (
        <>
          {isMobile ? (
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
                <Link to="/dashboard/addAdmin">
                  <button className="py-2 p-4 w-full background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                    Add Admin
                  </button>
                </Link>
              </section>
            </div>
          ) : (
            <div className="flex items-center justify-between flex-col md:flex-row flex-wrap gap-4">
              <section>
                <SearchField
                  onchange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(10);
                  }}
                />
              </section>
              <section>
                <Link to="/dashboard/addAdmin">
                  <button className="py-2 p-4 background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                    Add Admin
                  </button>
                </Link>
              </section>
            </div>
          )}

          <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
            {filteredUsers.map((admin, index) => (
              <CardAdmin
                key={admin._id || index}
                admin={admin}
                onEdit={() => {
                  setSelectedAdmin(admin);
                  setOpenEditModal(true);
                }}
                onDelete={() => deleteAdminData(admin._id)}
              />
            ))}
          </div>

          <div ref={loadMoreRef} className="h-8" />
        </>
      )}

      {editOpenModal && selectedAdmin && (
        <EditAdminModal
          key={selectedAdmin._id}
          isOpen={editOpenModal}
          onClose={() => setOpenEditModal(false)}
          admin={selectedAdmin}
          savedAdmin={handleSave}
        />
      )}
    </section>
  );
};

export default AdminList;
