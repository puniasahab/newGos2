import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateUserProfile, setEmailVerified } from './ProfileSlice';
import Footer from '../../components/footer';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userProfile } = useAppSelector((state) => state.profile);
    
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
        country: userProfile.country,
        mobile: userProfile.phone
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleVerifyEmail = () => {
        // Simulate email verification
        dispatch(setEmailVerified(true));
        console.log('Email verified');
    };

    const handleConfirm = () => {
        // Update profile in Redux store
        dispatch(updateUserProfile({
            name: formData.name,
            email: formData.email,
            country: formData.country,
            phone: formData.mobile
        }));
        console.log('Profile updated:', formData);
        navigate('/profile');
    };

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'black',
                padding: '16px 20px',
                paddingTop: '50px',
                borderBottom: '1px solid #333'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ArrowLeft 
                        size={24} 
                        color="var(--primary-color)" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(-1)}
                    />
                    <h1 style={{
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: 0
                    }}>
                        Edit Profile
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '30px 20px 120px 20px' }}>
                {/* Avatar Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    marginBottom: '40px'
                }}>
                    {/* Add Avatar */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00D4FF, #4ECDC4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '12px',
                            cursor: 'pointer',
                            border: '3px solid #333'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: '#FF6B7D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '24px' }}>👩‍💼</span>
                            </div>
                        </div>
                        <p style={{
                            color: 'white',
                            fontSize: '14px',
                            margin: 0
                        }}>
                            Add Avatar
                        </p>
                    </div>

                    {/* Add Image */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            border: '3px solid #666',
                            overflow: 'hidden',
                            marginBottom: '12px',
                            cursor: 'pointer',
                            position: 'relative'
                        }}>
                            <img 
                                src={userProfile.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face"}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'var(--primary-color)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Camera size={12} color="white" />
                            </div>
                        </div>
                        <p style={{
                            color: 'white',
                            fontSize: '14px',
                            margin: 0
                        }}>
                            Add Image
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div style={{ marginBottom: '30px' }}>
                    {/* Name Field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Name*
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: 'transparent',
                                border: '2px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                            onBlur={(e) => e.target.style.borderColor = '#333'}
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Email*
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    paddingRight: '80px',
                                    backgroundColor: 'transparent',
                                    border: '2px solid #333',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => e.target.style.borderColor = '#333'}
                            />
                            <button
                                onClick={handleVerifyEmail}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Verify
                            </button>
                        </div>
                    </div>

                    {/* Country Field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Country*
                        </label>
                        <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: 'transparent',
                                border: '2px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                            onBlur={(e) => e.target.style.borderColor = '#333'}
                        />
                    </div>

                    {/* Mobile Field */}
                    <div style={{ marginBottom: '40px' }}>
                        <label style={{
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Mobile
                        </label>
                        <div style={{
                            display: 'flex',
                            backgroundColor: 'transparent',
                            border: '2px solid #333',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                backgroundColor: '#1a1a1a',
                                padding: '12px 16px',
                                borderRight: '1px solid #333',
                                color: 'white',
                                fontSize: '16px'
                            }}>
                                +91
                            </div>
                            <input
                                type="text"
                                value={formData.mobile}
                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: 'white',
                            color: 'var(--primary-color)',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '18px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        CONFIRM
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditProfile;
