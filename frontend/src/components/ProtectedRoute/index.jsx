//Packages ⬇️
import { Navigate, Outlet } from "react-router-dom";
//Custom hooks ⬇️
import useAuth  from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>; // If still loading show loading state

  if (!user) return <Navigate to="/login" replace />; //If the user is not authenticated redirects to login page 

  return <Outlet />;  //Renders the protected component if is authenticated
};

export default ProtectedRoute;