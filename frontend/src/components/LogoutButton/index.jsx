//Packages ⬇️
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Redux actions ⬇️
import { logoutUser } from "../../redux/slices/authSlice";
//Hooks ⬇️
import mutateAuth from "../../hooks/useAuthMutate";
//Assets ⬇️
import { LogoutButtonIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const LogoutButton = () => {
    const dispatch = useDispatch(); // Redux dispatch to handle logout
    const navigate = useNavigate(); // React Router navigate to redirect after logout

    const handleLogout = async () => {
        dispatch(logoutUser()); // Dispatch logout action
        mutateAuth(null); // Update local cache to null
        navigate("/"); // Redirect to login after logout
    };

    return (
        <>
            <button 
                onClick={handleLogout} // Handle logout on button click
                className="logout-button"
            >
                <LogoutButtonIcon className="logout-icon" />
                <span className="logout-text">Salir</span>
            </button>
        </>
    );
};

export default LogoutButton;