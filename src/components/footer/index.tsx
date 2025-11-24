

import { getAuthTokenFromLS } from '../../commonFunctions';
import './footer.css';
import { Home, Gamepad2, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleGameClick = () => {
        if(!getAuthTokenFromLS()) {
            navigate('/login');
            return;
        }
        navigate('/questions');
    };

    const handleProfileClick = () => {
        if(getAuthTokenFromLS()) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <footer className="footer">
           
            <div className="footer-nav">
                {/* Home Icon */}
                <div className="nav-item" onClick={handleHomeClick}>
                    <Home size={24} color="white" />
                </div>

                {/* Progress Line */}
                <div className="progress-line-left"></div>
                
                {/* Game Controller Center Icon */}
                <div className="nav-item center-item" onClick={handleGameClick}>
                    <div className="center-circle">
                        <Gamepad2 
                            size={24} 
                            color="white" 
                            stroke="white" 
                            fill="none" 
                            style={{ color: 'white', stroke: 'white' }} 
                        />
                    </div>
                </div>

                {/* Progress Line */}
                <div className="progress-line-right"></div>
                
                {/* Profile Icon */}
                <div className="nav-item" onClick={handleProfileClick}>
                    <User size={24} color="white" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;