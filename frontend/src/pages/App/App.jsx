//Packages ⬇️
import { useRoutes, BrowserRouter } from "react-router-dom";
//Pages ⬇️
import Home from "../Home"
import Login from "../Login"
import Dashboard from "../Dashboard";
//Components ⬇️
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "../../components/Layout";
import DecimetrixProvider from "../../context/DecimetrixProvider";
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
        { path: 'dashboard', element: <Dashboard /> }
      ]
    }
  ];
  return useRoutes(routes);
}

function App() {
  return (
    <>
      <DecimetrixProvider> 
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>  
        </BrowserRouter>
      </DecimetrixProvider>
    </>
  )
}

export default App;
