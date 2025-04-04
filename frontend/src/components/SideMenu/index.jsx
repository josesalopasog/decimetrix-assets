//Packages ⬇️
import { useSelector, useDispatch } from "react-redux";
//Slices ⬇️
import { closeSideMenu } from '../../redux/slices/uiSlice';
//Hooks ⬇️
import useAuth from '../../hooks/useAuth';
//Assets ⬇️
import { UserCircleIcon, XMarkIcon } from '../../assets/icons';
//Styles ⬇️
import './styles.css';
import { Link } from "react-router-dom";

const SideMenu = () => {
  const { user } = useAuth(); // Get user data from custom hook
  const dispatch = useDispatch(); // Hook to send actions to redux
  const isOpen = useSelector((state) => state.ui.isSideMenuOpen);
  return (
    <>
      {user && ( // Show side menu only if user is logged in}
        <div className={`side-menu ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`} >
          <div className='side-menu-header'>
            <XMarkIcon className='close-icon' onClick={() => dispatch(closeSideMenu())} />
            <div className='username-container'>
              <UserCircleIcon className='user-icon' />
              <span className='username-text'>{user.username}</span>
            </div>
            <div>
              <span className='user-role-icon'>Rol: </span>
              <span className='user-role-text'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </div>
            <div>
              <span className='user-email-icon'>Email: </span>
              <span className='user-email-text'>{user.email}</span>
            </div>
          </div>
          <div className='side-menu-body'>
            <Link to="/dashboard"><h2>Inicio</h2></Link>
            <hr className='text-gray-300' />
            <Link to="/dashboard/assets"><h2>Activos</h2></Link>
            <ul>
              <Link to="/dashboard/assets#see-assets">
                <li>Ver activos</li>
              </Link>
              <Link to="/dashboard/assets#add-assets">
                <li>Agregar activo</li>
              </Link>  
              <Link to="/dashboard/assets#assets-map">
                <li>Mapas</li>
              </Link>
            </ul>
            <hr className='text-gray-300' />
            <h2>Reportes</h2>
            <ul>
              <li>Estadisticas</li>
              <li>Generar reportes</li>
              <li>Historial</li>
            </ul>
            {user.role === 'admin' && ( // Show admin options only if user is admin
              <>
                <hr className='text-gray-300' />
                <h2>Administración</h2>
                <ul>
                  <li>Usuarios</li>
                  <li>Configuración</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SideMenu;