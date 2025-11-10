

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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {/* Progress Line */}
                <div className="progress-line"></div>
                
                {/* Game Controller Center Icon */}
                <div className="nav-item center-item" onClick={handleGameClick}>
                    <div className="center-circle">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 6C6.34315 6 5 7.34315 5 9V11C5 12.6569 6.34315 14 8 14H16C17.6569 14 19 12.6569 19 11V9C19 7.34315 17.6569 6 16 6H8Z" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                            <path d="M5 11C3.89543 11 3 11.8954 3 13V14C3 15.1046 3.89543 16 5 16C6.10457 16 7 15.1046 7 14V13C7 11.8954 6.10457 11 5 11Z" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                            <path d="M19 11C20.1046 11 21 11.8954 21 13V14C21 15.1046 20.1046 16 19 16C17.8954 16 17 15.1046 17 14V13C17 11.8954 17.8954 11 19 11Z" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                            <circle cx="9" cy="9" r="0.5" fill="#1a1a1a"/>
                            <circle cx="15" cy="9" r="0.5" fill="#1a1a1a"/>
                            <circle cx="11" cy="11" r="0.5" fill="#1a1a1a"/>
                            <circle cx="13" cy="11" r="0.5" fill="#1a1a1a"/>
                        </svg>
                    </div>
                </div>

                {/* Progress Line */}
                <div className="progress-line"></div>
                
                {/* Profile Icon */}
                <div className="nav-item" onClick={handleProfileClick}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </footer>
    );
}

export default Footer;