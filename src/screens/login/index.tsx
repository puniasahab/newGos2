import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeBanner from '../../assets/homeBanner.png';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setOpenModal, setPhoneNumber, setEmailAdd, setTabSelected } from './LoginSlice';
import { loginApis } from '../../api';
import OtpModal from '../../components/otpModal/OtpModal';
import { setEmailInLS, setPhoneNumberInLS } from '../../commonFunctions';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    //@ts-ignore
    const [activeTab, setActiveTab] = useState('phone'); // 'email' or 'phone'
    //@ts-ignore
    const [emailError, setEmailError] = useState('');
    //@ts-ignore
    const [isLoading, setIsLoading] = useState(false);
    //@ts-ignore
    const navigate = useNavigate();


    const {openModal} = useAppSelector((state) => state.login);

    

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 10) {
            setMobileNumber(value);
        }
    };
    // @ts-ignore
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            setEmailError(t('auth.invalidEmail'));
        } else {
            setEmailError('');
        }
    };

    const isValidInput = () => {
        if (activeTab === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return email && emailRegex.test(email);
        } else {
            return mobileNumber.length === 10;
        }
    };

    const handleLogin = async () => {
        if (activeTab === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                setEmailError(t('auth.invalidEmail'));
                return;
            }
            // Handle email login
            dispatch(setOpenModal(true));
            dispatch(setEmailAdd(email));
            setEmailInLS(email);
            dispatch(setTabSelected("email"));
            try {
                const res = await loginApis.sendOtp('', email, '');
                console.log(res, "Send otp response");
            } catch (error) {
                console.error("Error sending OTP:", error);
            }
            // You can add email OTP API call here
            console.log('Email login:', email);
        } else {
            if (mobileNumber.length !== 10) {
                alert(t('auth.validMobileNumber'));
                return;
            }
            
            dispatch(setOpenModal(true));
            setPhoneNumberInLS(mobileNumber);
            dispatch(setTabSelected("phone"));
            dispatch(setPhoneNumber(mobileNumber));
            try {
                const res = await loginApis.sendOtp(mobileNumber, '', '');
                console.log(res, "Send otp response");
            } catch (error) {
                console.error("Error sending OTP:", error);
            }
        }
    };  

    return (
        <>
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'black',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 20px'
        }}>
            {/* Tabs at the top */}
            {/* <div style={{
                display: 'flex',
                backgroundColor: '#1a1a1a',
                borderRadius: '16px',
                padding: '6px',
                marginBottom: '40px',
                border: '1px solid #333',
                maxWidth: '450px',
                width: '90%',
                alignSelf: 'center',
                marginTop: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}> */}
                {/* Animated background indicator */}
                {/* <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: activeTab === 'email' ? '6px' : 'calc(50% - 3px)',
                    width: 'calc(50% - 6px)',
                    height: 'calc(100% - 12px)',
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '12px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 12px rgba(220, 36, 48, 0.4)',
                    transform: 'scale(1)',
                    zIndex: 1
                }} /> */}
{/*                 
                <button
                    onClick={() => setActiveTab('email')}
                    style={{
                        flex: 1,
                        padding: '16px 24px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'email' ? 'white' : '#999',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: activeTab === 'email' ? 'scale(1.02)' : 'scale(1)',
                        position: 'relative',
                        zIndex: 2,
                        textShadow: activeTab === 'email' ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    onFocus={(e) => e.target.style.outline = 'none'}
                    onBlur={(e) => e.target.style.outline = 'none'}
                >
                    Email
                </button> */}
                {/* <button
                    onClick={() => setActiveTab('phone')}
                    style={{
                        flex: 1,
                        padding: '16px 24px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'phone' ? 'white' : '#999',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: activeTab === 'phone' ? 'scale(1.02)' : 'scale(1)',
                        position: 'relative',
                        zIndex: 2,
                        textShadow: activeTab === 'phone' ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    onFocus={(e) => e.target.style.outline = 'none'}
                    onBlur={(e) => e.target.style.outline = 'none'}
                >
                    Phone
                </button> */}
            {/* </div> */}
             {/* <p style={{
                        color: '#999',
                        fontSize: '16px',
                        margin: '0',
                        marginBottom: '30px',
                        marginTop: '-20px',
                        textAlign: 'center'
                    }}>
                        Choose your preferred login method
                    </p> */}

            {/* Background Logo */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.1,
                zIndex: 1
            }}>
                <img 
                    src={homeBanner} 
                    alt="GameStones" 
                    style={{
                        width: '300px',
                        height: 'auto',
                        filter: 'brightness(0.5)'
                    }}
                />
            </div>

            {/* Login Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                alignSelf: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '60px' }}>
                    <img 
                        src={homeBanner} 
                        alt="GameStones" 
                        style={{
                            width: '200px',
                            height: 'auto',
                            marginBottom: '20px'
                        }}
                    />
                    <h1 style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: '600',
                        margin: '0',
                        marginBottom: '8px'
                    }}>
                        {t('auth.welcomeToGameStones')}
                    </h1>
                   
                </div>

                {/* Input Fields with smooth transitions */}
                <div style={{
                    marginBottom: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* <div style={{
                        transform: activeTab === 'email' ? 'translateX(0%)' : 'translateX(-100%)',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: activeTab === 'email' ? 1 : 0,
                        visibility: activeTab === 'email' ? 'visible' : 'hidden',
                        position: activeTab === 'email' ? 'relative' : 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            border: emailError ? '2px solid #f44336' : '2px solid transparent',
                            transition: 'border-color 0.3s ease'
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email address"
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    color: '#333',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        {emailError && (
                            <p style={{
                                color: '#f44336',
                                fontSize: '12px',
                                marginTop: '8px',
                                textAlign: 'left'
                            }}>
                                {emailError}
                            </p>
                        )}
                        <p style={{
                            color: '#666',
                            fontSize: '12px',
                            marginTop: emailError ? '4px' : '8px',
                            textAlign: 'left'
                        }}>
                            We'll send you an OTP to verify your email
                        </p>
                    </div> */}

                    <div style={{
                        transform: activeTab === 'phone' ? 'translateX(0%)' : 'translateX(100%)',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: activeTab === 'phone' ? 1 : 0,
                        visibility: activeTab === 'phone' ? 'visible' : 'hidden',
                        position: activeTab === 'phone' ? 'relative' : 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0
                    }}>
                        <div style={{
                            display: 'flex',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            border: '2px solid transparent',
                            transition: 'border-color 0.3s ease'
                        }}>
                            {/* Country Code */}
                            {/* <div style={{
                                backgroundColor: '#f5f5f5',
                                padding: '16px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                borderRight: '1px solid #e0e0e0',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                +91
                            </div> */}
                            
                            {/* Mobile Number Input */}
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                placeholder={t('auth.enterMobileNumber')}
                                style={{
                                    flex: 1,
                                    padding: '16px 20px',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    color: '#333'
                                }}
                            />
                        </div>
                        <p style={{
                            color: '#666',
                            fontSize: '12px',
                            marginTop: '8px',
                            textAlign: 'left'
                        }}>
                            {t('auth.otpVerificationPhone')}
                        </p>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    disabled={isLoading || !isValidInput()}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: isValidInput() ? 'var(--primary-color)' : '#666',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isValidInput() ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease',
                        boxShadow: isValidInput() ? '0 4px 15px rgba(220, 36, 48, 0.3)' : 'none',
                        transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                        marginBottom: '20px'
                    }}
                >
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '2px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            {activeTab === 'email' ? t('auth.sendingOtp') : t('auth.loggingIn')}
                        </div>
                    ) : (
                        `${t('auth.continueWithPhone')}`
                    )}
                </button>

                {/* Terms & Conditions */}
                <p style={{
                    color: '#999',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    margin: '0'
                }}>
                    {t('auth.termsAgreement')}{' '}
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
                        {t('navigation.termsAndConditions')}
                    </span>{' '}
                    {t('auth.and')}{' '}
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
                        {t('navigation.privacyPolicy')}
                    </span>
                </p>
            </div>

            {/* Loading Spinner Keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    button:focus {
                        outline: none !important;
                        box-shadow: none !important;
                    }
                    
                    button:active {
                        outline: none !important;
                        box-shadow: none !important;
                    }
                    
                    button::-moz-focus-inner {
                        border: 0 !important;
                        outline: none !important;
                    }
                    
                    *:focus {
                        outline: none !important;
                    }
                `
            }} />
        </div>
        {openModal && <OtpModal open={openModal} onClose={() => dispatch(setOpenModal(false))} />}
        </>
    );
};

export default Login;
