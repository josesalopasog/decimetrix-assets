//Packages ⬇️
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Redux actions ⬇️
import { logoutUser } from "../../redux/slices/authSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser()); // Dispatch logout action
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default LogoutButton;