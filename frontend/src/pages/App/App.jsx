//Packages ⬇️
import { useRoutes, BrowserRouter } from "react-router-dom";
//Pages ⬇️
import Home from "../Home"
import Login from "../Login"
import Dashboard from "../Dashboard";
import Assets from "../Dashboard/Assets";
import Users from "../Dashboard/Users";
//Components ⬇️
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "../../components/Layout";
//Styles ⬇️
import './App.css'
import AdminRoute from "../../components/AdminRoute";

const AppRoutes = () => {
  let routes = [
    // Public routes
    {path: '/', element: <Home />},
    {path: '/login', element: <Login />},
    // Private routes
    {
      path: '/', 
      element: <ProtectedRoute />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'dashboard/assets', element: <Assets /> },  
      ]
    },
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
  return (
    <>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>  
        </BrowserRouter>
    </>
  )
}

export default App;
