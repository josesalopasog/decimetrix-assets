import { Link } from 'react-router-dom';

import './styles.css'

const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className='welcome-box'>
                    <h1 className='welcome-title'>Bienvenido...</h1>
                    <p className='welcome-text'>Esta es la pagina de gestión de activos de Decimetrix!</p>
                    <div className='welcome-button-container'>
                        <div className="welcome-button-container">
                            <Link to="/login" className="welcome-button">Ingresar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;