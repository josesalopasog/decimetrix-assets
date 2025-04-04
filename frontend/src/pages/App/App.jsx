//Packages ⬇️
import { useRoutes, BrowserRouter } from "react-router-dom";
//Pages ⬇️
import Home from "../Home"
import Login from "../Login"
import Dashboard from "../Dashboard";
import Assets from "../Dashboard/Assets";
//Components ⬇️
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "../../components/Layout";
//Styles ⬇️
import './App.css'

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
