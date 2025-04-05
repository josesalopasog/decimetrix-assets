//Packages ⬇️
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//Custom Hooks ⬇️
import useAuth from "../../hooks/useAuth";
//Slices ⬇️
import { closeSideMenu } from "../../redux/slices/uiSlice";
//Assets ⬇️
import { ClipBoardIcon, UsersGroupIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const Dashboard = () => {
    const { user } = useAuth(); //Get user data
    const dispatch = useDispatch(); // Hook
    const navigate = useNavigate(); //For navigate

    useEffect(() => {
        dispatch(closeSideMenu());
    }, [dispatch]); //Close the side Menu when the user is in dashboard

    return (
        <div className="dashboard-container">
            <div className="box-container">
                <div className="box assets-page-box">
                    <ClipBoardIcon className="dashboard-icons clip-board-icon" />
                    <span>Administración de Activos</span>
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/dashboard/assets")}
                    >
                        Ingresar
                    </button>
                </div>

                {user?.role === "admin" && (
                    <div className="box users-page-box">
                        <UsersGroupIcon className="dashboard-icons group-users-icon" />
                        <div>Administración de Usuarios</div>
                        <button
                            className="dashboard-button"
                            onClick={() => navigate("/dashboard/users")}
                        >
                            Ingresar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;