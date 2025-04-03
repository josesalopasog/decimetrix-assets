//Packages ⬇️
import { useRoutes, BrowserRouter } from "react-router-dom";
//Pages ⬇️
import Home from "../Home"
import Login from "../Login"
import Dashboard from "../Dashboard";
//Components ⬇️
import ProtectedRoute from "../../components/ProtectedRoute";
//Styles ⬇️
import './App.css'

const AppRoutes = () => {
  let routes = [
    {path: '/', element: <Home />},
    {path: '/login', element: <Login />},
    {
      path: '/dashboard', 
      element: <ProtectedRoute/>,
      children: [{path:"",element:<Dashboard/>}]
    }
  ];
  return useRoutes(routes);
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
