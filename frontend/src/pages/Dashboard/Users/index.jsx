//Packages ⬇️
import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Slices ⬇️
import { fetchUsers } from "../../../redux/slices/userSlice";
//Custom Hooks ⬇️
import useWSNotifications from "../../../hooks/useWSNotifications";
//Components⬇️
import UsersForm from "../../../components/UsersForm";
import UsersTable from "../../../components/UsersTable";
//Styles ⬇️
import "./styles.css";
import { openSideMenu} from "../../../redux/slices/uiSlice";

const Users = () => {
    useWSNotifications(); //Custom Hook for WS notifications
   
    const location = useLocation(); // Hook to get the current location
    const dispatch = useDispatch(); // Hook to send actions to redux
    const { users, loading, error } = useSelector((state) => state.users); // Selectors to get users, loading and error states from redux
    
    useEffect(() => {
        if (location.hash) {  // Checks if the URL contains a hash
            const targetId = location.hash.replace("#", ""); // Removes the '#' to get the actual ID
            const targetElement = document.getElementById(targetId); // Tries to find the element with that ID
            if (targetElement) { //If there is and element with that ID
                targetElement.scrollIntoView({ behavior: "smooth" }); //Smoothly scrolls to the element
            }
        }
    }, [location]);
    
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(openSideMenu());
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