import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import CardAdmin from "../components/CardStatus/CardAdmin";
import SearchField from "../components/TextField/SearchField";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { admins } from "../constant/constant";
import crudAdminStore from "../store/crudAdmin";

const AdminList = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { fetchAllAdmin, admin, loading, error } = crudAdminStore();

  useEffect(() => {
    fetchAllAdmin();
  }, [])

  const [search, setSearch] = useState("");

  const filteredUsers = admin
    .filter((user) =>
      `${user.firstName} ${user.lastName} ${user.employeeNumber} ${user.subject}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  

  return (
    <section className="flex flex-col gap-6">
      <DashboardHeader title="Admin List" />
      {
        isMobile && (
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
                  Add admin
                </button>
              </Link>
            </section>
          </div>
        )
      }
      {
        !isMobile && (
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
              <Link to="/dashboard/addStudent">
                <button className="py-2 p-4 background-primary-color rounded-sm text-white hover:opacity-80 cursor-pointer">
                  Add Admin
                </button>
              </Link>
            </section>
          </div>
        )
      }
      
      <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
        {filteredUsers.map((admin, index) => (
          <CardAdmin key={index} admin={admin} />
        ))}
      </div>
    </section>
  );
};

export default AdminList;
