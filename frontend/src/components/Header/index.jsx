//Packages ⬇️
import { Link } from 'react-router-dom';
import { useContext } from 'react';
//Components ⬇️
import DecimetrixContext from '../../context/DecimetrixContext';
import LogoutButton from '../LogoutButton';
//Hooks ⬇️
import useAuth from '../../hooks/useAuth';
//Assets ⬇️
import decimetrixLogo from '../../assets/icons/decimetrix-logo.webp'
import { ThreeBarsIcon, UserCircleIcon } from '../../assets/icons';
//Styles ⬇️
import './styles.css';

const Header = () => {
    const { toggleSideMenu } = useContext(DecimetrixContext); // Get toggle function from context
    const { user } = useAuth(); // Get user data from custom hook
    return (
        <>
            <header>
                <div className='header-first-column'>
                    {user && ( // Show menu button only if user is logged in
                        <button className='menu-button' onClick={toggleSideMenu}>
                            <ThreeBarsIcon className='bars-icon' />
                        </button>
                    )}
                </div>
                <div className='header-second-column'>
                    <Link to='/'>
                        <img
                            className='decimetrix-logo'
                            src={decimetrixLogo}
                            alt='decimetrix-logo' />
                    </Link>
                </div>
                <div className='header-third-column'>
                    {user ? ( // If user is logged in, show username and logout button
                        <>
                            <span>{user.username}</span>
                            <LogoutButton />
                        </>
                    ) : ( // If user is not logged in, show login button
                        <Link to='/login' className='access-button'>
                            <UserCircleIcon className='user-icon' />
                            <span className='access-text'>Ingreso</span>
                        </Link>
                    )}
                </div>
            </header>
        </>
    )
};

export default Header;