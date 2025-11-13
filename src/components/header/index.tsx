
import { AlignJustify, Bell, Share2, User, X, Shield, FileText } from 'lucide-react';
import './header.css';
import homeBanneer from '../../assets/homeBanner.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthTokenFromLS } from '../../commonFunctions';
import { profileApi } from '../../api';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileData, setProfileData] = useState<{name: string, phone: string}>({
        name: '',
        phone: '',
    })
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };




    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            const res = await profileApi.getProfileData();
            setProfileData({
                name: res.data.user.full_name || t('profile.newUser'),
                phone: res.data.user.mobile || t('profile.phoneNumberNA')
            });
            console.log("fetching profile data!!", res);
        }

        fetchProfileData();
    }, [isMenuOpen])

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-black h-[78px] z-50 w-full shadow-md" style = {{position: 'sticky', zIndex: 50, top: 0, backgroundColor: 'var(--black-color)'}}>
                <div className="flex justify-between items-center h-full px-6">
                    {/* Left side - Hamburger Menu and Logo */}
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="flex items-center space-x-4" style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <AlignJustify 
                            size={24} 
                            color="var(--primary-color)" 
                            className="cursor-pointer hover:opacity-80 transition-opacity" 
                            style={{marginLeft: '12px'}}
                            onClick={toggleMenu}
                        />
                        <div style={{marginTop: '12px', marginRight: '8px', marginLeft: '8px'}}>
                        <img className="w-[130px] h-[30px] object-contain" src={homeBanneer} alt="GameStones Logo" onClick = {() => navigate("/")}/>
                        </div>
                        <Share2 size={24} color="var(--primary-color)" className="cursor-pointer hover:opacity-80 transition-opacity" />
                    </div>
                    
                    {/* Right side - Icons */}
                    <div className="flex items-center space-x-6" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Bell size={24} color="var(--primary-color)" className="cursor-pointer hover:opacity-80 transition-opacity" />
                        <LanguageSelector />
                    </div>
                    </div>
                </div>
            </header>

            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        transition: 'opacity 0.3s ease'
                    }}
                    onClick={closeMenu}
                />
            )}

            {/* Slide-out Menu */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: isMenuOpen ? '0' : '-300px',
                    width: '300px',
                    height: '100vh',
                    backgroundColor: 'black',
                    zIndex: 1000,
                    transition: 'left 0.3s ease',
                    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Menu Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <img 
                        src={homeBanneer} 
                        alt="GameStones" 
                        style={{
                            width: '120px',
                            height: 'auto'
                        }}
                    />
                    <X 
                        size={24} 
                        color="var(--primary-color)" 
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={closeMenu}
                    />
                </div>

                {/* User Profile Section */}
                <div style={{
                    padding: '30px 20px',
                    textAlign: 'center',
                    borderBottom: '1px solid #333'
                }}>
                    {/* User Avatar */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-color), #ff4757)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 15px',
                        border: '3px solid var(--primary-color)'
                    }}>
                        <User size={40} color="white" />
                    </div>

                    {/* User Name */}
                    <h3 style={{
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: '0 0 8px 0'
                    }}>
                        {profileData.name}
                    </h3>

                    {/* User Phone */}
                    <p style={{
                        color: '#999',
                        fontSize: '14px',
                        margin: '0 0 20px 0'
                    }}>
                        {profileData.phone}
                    </p>

                    {/* Profile Button */}
                    <button style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(220, 36, 48, 0.3)'
                    }}
                    onClick = {() => {
                        if(getAuthTokenFromLS()) {
                            navigate("/profile");
                        }
                        else {
                            navigate("/login");
                        }
                    }}>
                        {t('navigation.viewProfile')}
                    </button>
                </div>

                {/* Menu Options */}
                <div style={{ flex: 1, padding: '20px 0' }}>
                    {[
                        { icon: Shield, label: t('navigation.privacyPolicy'), onClick: () => {navigate("/privacy-policy")} },
                        { icon: FileText, label: t('navigation.termsAndConditions'), onClick: () => {navigate("/terms-and-conditions")} },
                    ].map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                borderLeft: '3px solid transparent'
                            }}
                            onClick={item.onClick}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                e.currentTarget.style.borderLeftColor = 'var(--primary-color)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.borderLeftColor = 'transparent';
                            }}
                        >
                            <item.icon size={20} color="var(--primary-color)" style={{ marginRight: '15px' }} />
                            <span style={{ color: 'white', fontSize: '16px' }}>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                {/* <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px 20px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'background-color 0.3s ease'
                        }}
                        onClick={() => console.log('Logout')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2a1810';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <LogOut size={20} color="var(--primary-color)" style={{ marginRight: '15px' }} />
                        <span style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Logout</span>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Header;