import React, {useState, useEffect} from "react";
import { format } from "date-fns";

import UserService from "../services/user.service";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, } from "@fortawesome/free-solid-svg-icons";

const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "name" },
    { name: "Username", uid: "username" },
    { name: "Correo", uid: "email" },
    { name: "Tipo de Usuario", uid: "role" },
    { name: "Fecha de Registro", uid: "createdAt" },
];


const AllUsersTable = () =>  {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
              const userData = await UserService.allUsers();
              setUsers(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
          }
          console.log(users);
          fetchUsers();
    }, []);

    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey];
    
        switch (columnKey) {
            case "name":
                return <span>{data.firstName} {data.lastName}</span>;
            case "username":
                return <span>@{data.username}</span>;
            case "role":
                const roleId = data.roles[0]?.id;
                const roleName = data.roles[0]?.name;
                const chipColor = roleId === 1 ? "secondary" : "success";
                return <Chip size="sm" variant="shadow" color={chipColor}>{roleName || 'N/A'}</Chip>;
            case "createdAt":
                return new Date(cellValue).toLocaleDateString();
            default:
                return cellValue;
        }
    }, []);


    return (
        <Table aria-label="User Profiles Table">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(user) => (
                    <TableRow key={user.id}>
                        {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


export default AllUsersTable;