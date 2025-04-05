//Packages ⬇️
import { useRoutes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//Pages ⬇️
import Home from "../Home"
import Login from "../Login"
import Dashboard from "../Dashboard";
import Assets from "../Dashboard/Assets";
import Users from "../Dashboard/Users";
//Components ⬇️
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "../../components/Layout";
//Hooks ⬇️
import useWSNotifications from "../../hooks/useWSNotifications";
//Styles ⬇️
import './App.css'
import AdminRoute from "../../components/AdminRoute";

const AppRoutes = () => {
  let routes = [
    // Public routes
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    // Private routes
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'dashboard/assets', element: <Assets /> },
      ]
    },
    // Admin Routes
    {
      path: '/',
      element: <AdminRoute />,
      children: [
        { path: 'dashboard/users', element: <Users /> }, //http://localhost:5173/dashboard/users
      ]
    }
  ];
  return useRoutes(routes);
}

function App() {
  useWSNotifications(); //Hook for WS Events 
  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
          <ToastContainer
            position="bottom-right" //Position of the WS 
            autoClose={5000} //Delay to close the WS
            hideProgressBar={false} //Progress bar of WS 
            newestOnTop={true} //For more than one socket at time
            closeOnClick 
            pauseOnFocusLoss 
            draggable
            pauseOnHover
            theme="dark"
          />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
