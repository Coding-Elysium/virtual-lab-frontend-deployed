import { useState } from "react";
import crudAdminStore from "../../store/crudAdmin";
import crudStudentStore from "../../store/crudStudent";
import CardChangePassword from "../CardStatus/CardChangePassword";

const ChangePasswordTabe = () => {
  const [search, setSearch] = useState("");

  const { admin } = crudAdminStore();
  const { student } = crudStudentStore();

  const users = [...admin, ...student];

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.employeeNumber || ""} ${user.subject || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full sm:w-1/2"
      />

      <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
        {filteredUsers.map((user, index) => (
          <CardChangePassword
            key={user._id || index}
            data={user}
            onEdit={() => console.log("Edit user:", user)}
            onDelete={() => console.log("Delete user:", user)}
          />
        ))}
      </div>
    </section>
  );
};

export default ChangePasswordTabe;
