//Packages ⬇️
import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
//Slices ⬇️
import { fetchUsers } from "../../../redux/slices/userSlice";
//Assets⬇️
import { PluseCircleIcon } from "../../../assets/icons";
import "./styles.css";
import UsersForm from "../../../components/UsersForm";
import UsersTable from "../../../components/UsersTable";

const Users = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

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
                <UsersTable users={users} /> 
                <h2 className="users-title" id="add-users">Agregar Usuario</h2>
                <UsersForm />
            </div>
        </div>
    );
};

export default Users;