import { useState, useEffect } from 'react';
import { ArrowLeft, MoreVertical, LogOut, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateUserProfile, setOpenModal, setUserEmail, setUserPhone, setTabSelected } from './ProfileSlice';
import Footer from '../../components/footer';
import { setUserProfile } from './ProfileSlice';
import { otpApis, profileApi } from '../../api';
import EditOtpModal from '../../components/editOtpModal';
// import { setTabSelected } from '../login/LoginSlice';

const avatars = [
  // 6 male
  "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
  "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
//   "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
  "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
  "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  "https://cdn-icons-png.flaticon.com/512/219/219969.png",

  // 4 female
  "https://cdn-icons-png.flaticon.com/512/4140/4140040.png",
  "https://cdn-icons-png.flaticon.com/512/4140/4140060.png",
  "https://cdn-icons-png.flaticon.com/512/4140/4140050.png",
  "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
];

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userProfile, openModal, tabSelected } = useAppSelector((state) => state.profile);
    
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
        country: userProfile.country,
        mobile: userProfile.phone
    });

    const [emailError, setEmailError] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasApiData, setHasApiData] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Validate email field
        if (field === 'email') {
            if (value === '') {
                setEmailError('');
            } else if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError('');
            }
        }
    };

    const handleMobileChange = (value: string) => {
        // Only allow numbers and limit to 10 digits
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 10) {
            setFormData(prev => ({
                ...prev,
                mobile: numericValue
            }));
        }
    };

    const handleVerifyEmail = () => {
        // Send OTP and open modal
        dispatch(setTabSelected("email"));
        dispatch(setOpenModal(true));
        dispatch(setUserEmail(formData.email));
        otpApis.sendEmailOtp(formData.email)
            .then(() => {
                // Set Redux state for OTP modal
               
                console.log('Email OTP sent');
            })
            .catch((error) => {
                console.error('Error sending email OTP:', error);
            });
    };

    // const verifyEmailWithOtp = (otp: string) => {
    //     otpApis.verifyEmailOtp(formData.email, otp)
    //         .then(() => {
    //             dispatch(setEmailVerified(true));
    //             console.log('Email verified with OTP');
    //         })
    //         .catch((error) => {
    //             console.error('Error verifying email with OTP:', error);
    //         });
    // };

    // const verifyMobileWithOtp = (otp: string) => {
    //     otpApis.verifyMobileOtp(formData.mobile, otp)
    //         .then(() => {
    //             dispatch(setMobileVerified(true));
    //             console.log('Mobile verified with OTP');
    //         })
    //         .catch((error) => {
    //             console.error('Error verifying mobile with OTP:', error);
    //         });
    // }

    const handleVerifyMobile = () => {
        dispatch(setTabSelected("phone"));
        dispatch(setUserPhone(formData.mobile));
        dispatch(setOpenModal(true));
        otpApis.sendMobileOtp(formData.mobile)
            .then(() => {
                // Set Redux state for OTP modal
                console.log('Mobile OTP sent');
            })
            .catch((error) => {
                console.error('Error sending mobile OTP:', error);
            });
        // Simulate mobile verification
        console.log('Mobile verified');
        // You can add mobile verification logic here
    };

    const handleLogout = () => {
        // Clear user session/data
        localStorage.clear();
        sessionStorage.clear();
        console.log('User logged out');
        navigate('/');
        setShowDropdown(false);
    };


    const editProfile = async () => {
        try {
            const updatedData = {
                first_name: formData.name.split(' ')[0],
                last_name: formData.name.split(' ')[1],
                // gender: formData.gender,
                // date_of_birth: formData.dob,
                mobile: formData.mobile,
                email: formData.email,
                profile_photo_url: selectedAvatar,
                // profile_photo_url: profileImage,
            }
            const res = await profileApi.updateProfileData(updatedData);
            console.log('Profile updated successfully:', res.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }

    const handleConfirm = () => {
        // Update profile in Redux store
        dispatch(updateUserProfile({
            name: formData.name,
            email: formData.email,
            country: formData.country,
            phone: formData.mobile
        }));
        editProfile();
        console.log('Profile updated:', formData);
        navigate('/profile');
    };


     useEffect(() => {
            console.log("Profile component mounted successfully");
            console.log("Current userProfile in useEffect:", userProfile);
            
            const fetchUserProfileData = async () => {
                try {
                    const res = await profileApi.getProfileData();
                    console.log("Profile Data", res.data);
                    /**
                     *  id: string;
        name: string;
        email: string;
        phone: string;
        country: string;
        avatar?: string;
        isEmailVerified: boolean;
        gainedStones: number;
        totalPlayed: number;
        referralCount: number;
        dailyGameStones: number;
                     */
                    const userProfileData = {
                        id: res.data.user.id,
                        name: res.data.user.full_name || "New User",
                        email: res.data.user.email,
                        phone: res.data.user.mobile,
                        country: 'India',
                        avatar: res.data.user.profile_photo_url || "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face",
                        isEmailVerified: res.data.user.email_verified_at ? true : false,
                        gainedStones: res.data.overall_stats?.total_gained_stones || 0,
                        totalPlayed: res.data.overall_stats?.total_contests_played || 0,
                        referralCount: res.data.overall?.referrerCount || 0,
                        dailyGameStones: res.data.overall_stats?.today_gained_stones || 0,
                        
                    }
                    dispatch(setUserProfile(userProfileData));
                    
                    // Update form data with API data
                    setFormData({
                        name: userProfileData.name,
                        email: userProfileData.email,
                        country: userProfileData.country,
                        mobile: userProfileData.phone
                    });
                    
                    // Set flag indicating we have API data
                    setHasApiData(true);
                    
                    console.log("USER PROFILE", userProfileData);
    
                    console.log("Dispatching setUserProfile with data:", userProfileData);
                }
                catch(err) {
                    console.log("Error fetching user profile data:", err);
                }
            }
            // Temporarily comment out the API call to test if this is causing the issue
            // const fetchUserProfileData = async () => {
            //     try {
            //         const res = await profileApi.getProfileData();
            //         console.log("Profile Data:", res);
            //     } catch (error) {
            //         console.error("Error fetching profile data:", error);
            //     }
            // }
            fetchUserProfileData();
    
        }, [])

    return (
        <>
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'black',
                padding: '16px 20px',
                paddingTop: '50px',
                borderBottom: '1px solid #333',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    
                    {/* Three dots menu */}
                    <div style={{ position: 'relative' }}>
                        <MoreVertical 
                            size={24} 
                            color="white" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        
                        {/* Dropdown */}
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: '0',
                                marginTop: '8px',
                                backgroundColor: '#1a1a1a',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                                zIndex: 1000,
                                minWidth: '140px'
                            }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        borderRadius: '8px',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#333'}
                                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Click outside to close dropdown */}
                {showDropdown && (
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 999
                        }}
                        onClick={() => setShowDropdown(false)}
                    />
                )}
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
                        <div 
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: selectedAvatar ? 'transparent' : 'linear-gradient(135deg, #00D4FF, #4ECDC4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px',
                                cursor: 'pointer',
                                border: '3px solid #333',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                            onClick={() => setShowAvatarPicker(true)}
                        >
                            {selectedAvatar ? (
                                <img
                                    src={selectedAvatar}
                                    alt="Selected Avatar"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
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
                            )}
                            {/* <div style={{
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
                            }}> */}
                                {/* <Edit2 size={12} style={{ color: 'white' }} /> */}
                            {/* </div> */}
                        </div>
                        <p style={{
                            color: 'white',
                            fontSize: '14px',
                            margin: 0
                        }}>
                            {selectedAvatar ? 'Change Avatar' : 'Add Avatar'}
                        </p>
                    </div>

                    {/* Add Image */}
                    {/* <div style={{ textAlign: 'center' }}>
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
                    </div> */}
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
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            placeholder='Enter your name'
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
                                    paddingRight: (!hasApiData && (formData.email === "" || formData.email === undefined || !formData.email || formData.email === "Not Verified")) ? '80px' : '16px',
                                    backgroundColor: 'transparent',
                                    border: `2px solid ${emailError ? '#ff4444' : '#333'}`,
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your email"
                                onFocus={(e) => e.target.style.borderColor = emailError ? '#ff4444' : 'var(--primary-color)'}
                                onBlur={(e) => e.target.style.borderColor = emailError ? '#ff4444' : '#333'}
                            />
                            {hasApiData && (userProfile.email === "" || userProfile.email === undefined || !userProfile.email || userProfile.email === "Not Verified") && <button
                                onClick={handleVerifyEmail}
                                // disabled={userProfile.email !== '' && userProfile.email?.length > 0}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: (formData.email === '') ? '#666' : 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: (emailError || formData.email === '' || formData.email === "Not Verified") ? 'not-allowed' : 'pointer',
                                    opacity: (emailError || formData.email === '' || formData.email === "Not Verified") ? 0.6 : 1
                                }}
                            >
                                Verify
                            </button>}
                        </div>
                        {emailError && (
                            <p style={{
                                color: '#ff4444',
                                fontSize: '12px',
                                margin: '4px 0 0 0',
                                fontWeight: '500'
                            }}>
                                {emailError}
                            </p>
                        )}
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
                                transition: 'border-color 0.3s ease',
                                boxSizing: 'border-box'
                            }}
                            placeholder='Enter your country'
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
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                            position: 'relative'
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
                                onChange={(e) => hasApiData ? handleMobileChange(e.target.value) : undefined}
                                readOnly={!hasApiData}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    paddingRight: hasApiData && formData.mobile ? '80px' : '16px',
                                    backgroundColor: hasApiData ? 'transparent' : '#1a1a1a',
                                    border: 'none',
                                    color: hasApiData ? 'white' : '#999',
                                    fontSize: '16px',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    cursor: hasApiData ? 'text' : 'not-allowed'
                                }}
                                placeholder='Enter your mobile number'
                                onFocus={hasApiData ? (e) => e.target.style.borderColor = 'var(--primary-color)' : undefined}
                                onBlur={hasApiData ? (e) => e.target.style.borderColor = '#333' : undefined}
                            />
                            {hasApiData && (userProfile.phone === "" || userProfile.phone === undefined || !userProfile.phone || userProfile.phone === "Not Verified") && (
                                <button
                                    onClick={handleVerifyMobile}
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
                                        cursor: 'pointer',
                                        zIndex: 2
                                    }}
                                >
                                    Verify
                                </button>
                            )}
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

            {/* Avatar Picker Modal */}
            {showAvatarPicker && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                    onClick={() => setShowAvatarPicker(false)}
                >
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '20px',
                            padding: '30px',
                            maxWidth: '400px',
                            width: '100%',
                            maxHeight: '80vh',
                            overflowY: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{
                            color: 'white',
                            textAlign: 'center',
                            marginBottom: '25px',
                            fontSize: '20px',
                            fontWeight: '600'
                        }}>
                            Choose Your Avatar
                        </h3>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '15px',
                            marginBottom: '25px'
                        }}>
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedAvatar === avatar ? '3px solid #00D4FF' : '3px solid transparent',
                                        transition: 'all 0.3s ease',
                                        transform: selectedAvatar === avatar ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: selectedAvatar === avatar ? '0 8px 20px rgba(0, 212, 255, 0.4)' : 'none'
                                    }}
                                    onClick={() => setSelectedAvatar(avatar)}
                                >
                                    <img
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setShowAvatarPicker(false)}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: '2px solid white',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowAvatarPicker(false)}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#00D4FF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)'
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {openModal && <EditOtpModal open={openModal} tabSelected={tabSelected} onClose = {() => dispatch(setOpenModal(false))}/>}
        </>
    );
};

export default EditProfile;
