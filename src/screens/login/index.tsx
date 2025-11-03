import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeBanner from '../../assets/homeBanner.png';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setOpenModal, setPhoneNumber } from './LoginSlice';
import { loginApis } from '../../api';
import OtpModal from '../../components/otpModal/OtpModal';
import { setPhoneNumberInLS } from '../../commonFunctions';

const Login = () => {
    const dispatch = useAppDispatch();
    const [mobileNumber, setMobileNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const {openModal} = useAppSelector((state) => state.login);

    

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 10) {
            setMobileNumber(value);
        }
    };

    const handleLogin = async () => {
        if (mobileNumber.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        dispatch(setOpenModal(true));
        setPhoneNumberInLS(mobileNumber);
        dispatch(setPhoneNumber(mobileNumber));
        try {
            const res = await loginApis.sendOtp(mobileNumber, '', '');
            console.log(res, "Send otp response");
            // setIsLoading(true);
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
        
        // Simulate API call
        // setTimeout(() => {
        //     setIsLoading(false);
        //     navigate('/');
        // }, 2000);
    };  

    return (
        <>
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'black',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
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
                textAlign: 'center'
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
                        Welcome to GameStones
                    </h1>
                    <p style={{
                        color: '#999',
                        fontSize: '16px',
                        margin: '0'
                    }}>
                        Enter your mobile number to continue
                    </p>
                </div>

                {/* Mobile Input */}
                <div style={{
                    marginBottom: '40px'
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
                        <div style={{
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
                        </div>
                        
                        {/* Mobile Number Input */}
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={handleMobileChange}
                            placeholder="Enter mobile number"
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
                    
                    {/* Helper Text */}
                    <p style={{
                        color: '#666',
                        fontSize: '12px',
                        marginTop: '8px',
                        textAlign: 'left'
                    }}>
                        We'll send you an OTP to verify your number
                    </p>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    disabled={isLoading || mobileNumber.length !== 10}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: mobileNumber.length === 10 ? 'var(--primary-color)' : '#666',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: mobileNumber.length === 10 ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease',
                        boxShadow: mobileNumber.length === 10 ? '0 4px 15px rgba(220, 36, 48, 0.3)' : 'none',
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
                            Logging in...
                        </div>
                    ) : (
                        'Continue'
                    )}
                </button>

                {/* Terms & Conditions */}
                <p style={{
                    color: '#999',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    margin: '0'
                }}>
                    By continuing, you agree to our{' '}
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
                        Terms & Conditions
                    </span>{' '}
                    and{' '}
                    <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>
                        Privacy Policy
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
                `
            }} />
        </div>
        {openModal && <OtpModal open={openModal} onClose={() => dispatch(setOpenModal(false))} />}
        </>
    );
};

export default Login;
