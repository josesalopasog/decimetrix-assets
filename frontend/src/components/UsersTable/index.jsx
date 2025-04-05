//Packages ⬇️
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { useState } from "react";
//Assets ⬇️
import { GarbageIcon, PencilSquareIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";
import DeleteUserModal from "../DeleteUserModal";
import UpdateUserModal from "../UpdateUserModal";

const UsersTable = ({ users }) => {
    const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false); //State to open and close edit modal
    const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false); //Stat to open and coles delete modal
    const [selectedUser, setSelectedUser] = useState(null); //State to select the user to edit or delete
    //Functions ⬇️
    const openUpdateModal = (asset) => { //To open de Update Modal when the user clicks the icon 
        setSelectedUser(asset); //Select the user where the user clicks
        setUpdateUserModalOpen(true);
    };
    const openDeleteModal = (asset) => { //To open de Delete Modal when the user clicks the icon 
        setSelectedUser(asset); //Select the user where the user clicks
        setDeleteUserModalOpen(true);
    };

    return (
        <>
            <TableContainer component={Paper} className="users-table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id || user._id}>
                                <TableCell>
                                    <PencilSquareIcon
                                        className="update-icon"
                                        onClick={() => openUpdateModal(user)}
                                    />
                                    <GarbageIcon
                                        className="delete-icon"
                                        onClick={() => openDeleteModal(user)}
                                    />
                                </TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateUserModal 
                open={updateUserModalOpen} //Flag to control update modal control
                onClose={()=> setUpdateUserModalOpen(false)} //Set update modal state to close the modal
                user={selectedUser} //Set the selected user to update
            />

            <DeleteUserModal 
                open={deleteUserModalOpen} //Flag to control delete modal control
                onClose={() => setDeleteUserModalOpen(false)} //Set delete modal state to close the modal
                user={selectedUser} //Set the selected user to delete
            />
        </>
    );
};

export default UsersTable;