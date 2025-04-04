import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
    const { user } = useAuth(); // Get user data from custom hook

    if (!user) return <Navigate to="/dashboard" />; // Redirect to login if not authenticated
    if (user.role !== "admin") return <Navigate to="/dashboard" replace/>; // Redirect to dashboard if not admin

    return <Outlet />;
};

export default AdminRoute;