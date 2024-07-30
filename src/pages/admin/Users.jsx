import React from "react";

import AllUsersTable from '../../components/AllUsersTable';

const Users = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <AllUsersTable/>
    </div>
  );
}

export default Users;