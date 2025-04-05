//Packages ⬇️
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
//Slices ⬇️
import { updateUser, fetchUsers } from "../../redux/slices/userSlice";
//Assets ⬇️
import { PencilSquareIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const UpdateUserModal = ({ open, onClose, user }) => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    const [showPassword, setShowPassword] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({ //State to manage the updated data
        username: "",
        email: "",
        role: "",
        password: "",
    });
    useEffect(() => { // Run this effect whenever the 'user' prop changes
        if (user) { // If the user exists 
            setUpdatedUserData({ // Set the form state with user's current data or with empty data
                username: user.username || "",
                email: user.email || "",
                role: user.role || "",
                password: "",
            });
        }
    }, [user]); // Re-run the effect every time 'user' changes
    //Functions ⬇️
    const handleChange = (e) => { // Function to handle input changes in the form
        const { name, value } = e.target; // Destructure name and value from the event target
        setUpdatedUserData((prevData) => ({ // Update the state with the updated value
            ...prevData,  //Copy data in a new object
            [name]: value, //Updates the field that change
        }));
    };

    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            if (!user?._id) return;
            await dispatch(updateUser({ id: user._id, userData: updatedUserData })).unwrap(); // Dispatch the action to update a new user ny ID
            dispatch(fetchUsers()); // Fetch the updated list of users
            onClose(); //Close the modal
            setUpdatedUserData({ // Reset the form fields after submission
                username: "",
                email: "",
                role: "",
                password: "",
            });

        } catch (error) { // Handle any errors that occur during user updating and show in console
            console.error("Error al actualizar el usuario:", error);
        }
    };

    if (!open) return null;

    return (
        <div className="update-modal-overlay" onClick={onClose}>
            <div
                className="update-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="update-modal-title">
                    <PencilSquareIcon className="update-modal-icon" />
                    <span>Editar Usuario</span>
                </h2>
                <form className="form-group" onSubmit={handleSubmit}>
                    <div className="form-group username">
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            value={updatedUserData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group email">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={updatedUserData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group role">
                        <label>Rol:</label>
                        <select
                            name="role"
                            value={updatedUserData.role}
                            onChange={handleChange}
                        >
                            <option value="">-- Selecciona tipo --</option>
                            <option value="operario">operario</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    <div className="form-group password">
                        <label>Contraseña:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nueva Contraseña"
                            value={updatedUserData.password}
                            onChange={handleChange}
                        />
                        <div className="show-password-checkbox">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword">Mostrar contraseña</label>
                        </div>
                    </div>
                    <div className="update-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;