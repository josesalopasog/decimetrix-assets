//Packages ⬇️
import { Navigate, Outlet } from "react-router-dom";
//Custom hooks ⬇️
import useAuth  from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = () => {
  const { user, isLoading, isError } = useAuth();
  
  if(isError){
    console.error("Error en la autenticación.");
    return <Navigate to='/' replace />; //If there is an error redirects to the home page
  } 
  
  if (isLoading) return(
    <div className="flex h-[100vh] justify-center items-center">
      <CircularProgress />
    </div>
  ) 
  
  if (!user) return <Navigate to="/login" replace />; //If the user is not authenticated redirects to login page 

  return <Outlet />;  //Renders the protected component if is authenticated
};

export default ProtectedRoute;