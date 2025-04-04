import { HeartIcon } from '../../assets/icons';
import './styles.css';

const Footer = () => {
    return (
        <>
            <div className="footer-content">
                <p className="footer-text-container">
                    <span data-lang="madeWith">Made with</span>
                    <HeartIcon className="heart-icon" />
                    <span data-lang="by">by  José Salopaso!</span>
                </p>
            </div>    
        </>
    );
}

export default Footer; 