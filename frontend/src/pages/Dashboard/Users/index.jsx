//Packages ⬇️
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
//Slices ⬇️
import { fetchUsers, createUser } from "../../../redux/slices/userSlice";
//Assets⬇️
import { PluseCircleIcon } from "../../../assets/icons";
import "./styles.css";

const Users = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        role: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(createUser(newUserData)).unwrap();
            dispatch(fetchUsers()); 
            setNewUserData({ username: "", email: "", password: "" });
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.replace("#", "");
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="users-container">
            <div className="users-content">
                <h1 className="users-title" id="see-users">Usuarios</h1>
                <TableContainer component={Paper} className="users-table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Contraseña</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.id || user._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>****</TableCell> {/* Contraseña oculta */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <h2 className="users-title" id="add-users">Agregar Usuario</h2>
                <form className="users-form" onSubmit={handleSubmit}>
                    <div className="form-group username">
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            value={newUserData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group email">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newUserData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group role">
                        <label>Rol:</label>
                        <select
                            name="role"
                            value={newUserData.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Selecciona tipo --</option>
                            <option value="operario">operario</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div className="form-group password">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={newUserData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group button">
                        <button type="submit">
                            <PluseCircleIcon className="add-icon" />
                            <span>Agregar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Users;