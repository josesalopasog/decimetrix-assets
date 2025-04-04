//Packages ⬇️
import { Navigate, Outlet } from "react-router-dom";
//Custom hooks ⬇️
import useAuth  from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isLoading, isError } = useAuth();
  
  if(isError) return <Navigate to='/' replace />; //If there is an error redirects to the home page
  
  if (isLoading) return <p>Loading...</p>; // If still loading show loading stat
  
  if (!user) return <Navigate to="/login" replace />; //If the user is not authenticated redirects to login page 

  return <Outlet />;  //Renders the protected component if is authenticated
};

export default ProtectedRoute;