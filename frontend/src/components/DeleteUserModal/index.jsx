//Packages ⬇️
import React from "react";
import { useDispatch } from "react-redux";
//Slices ⬇️
import { deleteUser, fetchUsers } from "../../redux/slices/userSlice";
//Assets ⬇️
import { GarbageIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const DeleteUserModal = ({ open, onClose, user }) => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    if (!open) return null; //Prevents to render the modal if is not open

    const handleDelete = async (e) => { //Function to handle delete user
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            if (!user._id) return; //If there is not an id return 
            await dispatch(deleteUser(user._id)).unwrap();  // Dispatch the action to delete the user by ID
            dispatch(fetchUsers()); // Fetch the updated list of user
            onClose(); //Close the modal
        } catch (error) {
            console.error("Error al eliminar el usuario", error); // Handle any errors that occur during user delete and show in console
        }
    };
    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="delete-modal-title">
                   <GarbageIcon className="delete-modal-icon" />
                    <span>Eliminar Activo</span>
                </h2>
                <p>
                    ¿Deseas eliminar al usuario <strong>{user?.username ?? "Desconocido"}</strong>?
                </p>
                <div className="delete-buttons">
                    <button onClick={handleDelete}>Sí, eliminar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;