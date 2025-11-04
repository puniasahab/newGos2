import { ArrowLeft, Share2, Edit, Heart, Gamepad2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import Footer from '../../components/footer';
import { profileApi } from '../../api';
import { useEffect } from 'react';
import { setUserProfile } from './ProfileSlice';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userProfile } = useAppSelector((state) => state.profile);

    console.log("Profile component rendering, userProfile:", userProfile);

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
                    email: res.data.user.email || "Not Verified",
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

    // Add error boundary-like behavior

    const handleBackClick = () => {
        console.log("Back button clicked");
        navigate("/");
    }
    try {
        return (
            <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
                {/* Header */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    padding: '16px 20px',
                    paddingTop: '50px',
                    paddingBottom: '60px',
                    position: 'relative',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ArrowLeft 
                                size={24} 
                                color="white" 
                                style={{ cursor: 'pointer' }}
                                onClick={handleBackClick}
                            />
                            <h1 style={{
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: '600',
                                margin: 0
                            }}>
                                My Profile
                            </h1>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Share2 size={24} color="white" style={{ cursor: 'pointer' }} />
                            <Edit 
                                size={24} 
                                color="white" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/edit-profile')}
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            position: 'relative',
                            width: '70px',
                            height: '70px'
                        }}>
                            <img 
                                src={userProfile?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face"}
                                alt="Profile"
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    border: '3px solid white',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                width: '16px',
                                height: '16px',
                                backgroundColor: '#00C851',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }}></div>
                        </div>
                        <div>
                            <h2 style={{
                                color: 'white',
                                fontSize: '24px',
                                fontWeight: '700',
                                margin: '0 0 8px 0'
                            }}>
                                {userProfile?.name || 'Loading...'}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ color: 'white', fontSize: '16px' }}>📞</span>
                                <span style={{ color: 'white', fontSize: '16px' }}>{userProfile?.phone || 'Loading...'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'white', fontSize: '16px' }}>✉️</span>
                                <span style={{ color: 'white', fontSize: '16px' }}>{userProfile?.email || 'Loading...'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{
                    padding: '0 20px',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    height: '140px',
                    marginTop: '-40px'
                }}>
                    {/* First Card - Gained Stones */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        // padding: '20px 16px',
                        marginTop: '-24px',
                        paddingTop: '20px',
                        paddingBottom: '12px',
                        width: '120px',
                        textAlign: 'center',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        position: 'absolute',
                        left: '10px',
                        zIndex: 1,
                        // transform: 'rotate(-8deg)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ 
                                backgroundColor: '#FF4444', 
                                borderRadius: '50%', 
                                width: '32px', 
                                height: '32px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto 8px auto'
                            }}>
                                <Heart size={18} color="white" fill="white" />
                            </div>
                            <span style={{ fontSize: '28px', fontWeight: '800', color: '#333', display: 'block' }}>1000</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#666', margin: 0, fontWeight: '600', lineHeight: '1.2' }}>Gained Stones</p>
                    </div>

                    {/* Second Card - Total Played */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        // padding: '20px 16px',
                        marginTop: '-24px',
                        paddingTop: '20px',
                        paddingBottom: '12px',
                        width: '120px',
                        textAlign: 'center',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                        position: 'absolute',
                        left: '35%',
                        // transform: 'translateX(-50%)',
                        zIndex: 3,
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ 
                                backgroundColor: '#4A90E2', 
                                borderRadius: '50%', 
                                width: '32px', 
                                height: '32px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto 8px auto'
                            }}>
                                <Gamepad2 size={18} color="white" />
                            </div>
                            <span style={{ fontSize: '24px', fontWeight: '800', color: '#333', display: 'block' }}>20</span>
                        </div>
                        <p style={{ fontSize: '16px', color: '#666', margin: 0, fontWeight: '600', lineHeight: '1.2' }}>Total Played</p>
                    </div>

                    {/* Third Card - Referral Count */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        // padding: '20px 16px',
                        marginTop: '-24px',
                        paddingTop: '20px',
                        paddingBottom: '12px',
                        width: '120px',
                        textAlign: 'center',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        position: 'absolute',
                        right: '10px',
                        zIndex: 2,
                        // transform: 'rotate(8deg)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ 
                                backgroundColor: '#FF6B6B', 
                                borderRadius: '50%', 
                                width: '32px', 
                                height: '32px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto 8px auto'
                            }}>
                                <Users size={18} color="white" />
                            </div>
                            <span style={{ fontSize: '24px', fontWeight: '800', color: '#333', display: 'block' }}>10</span>
                        </div>
                        <p style={{ fontSize: '16px', color: '#666', margin: 0, fontWeight: '600', lineHeight: '1.2' }}>Referral Count</p>
                    </div>
                </div>

                {/* Daily Game Stones Card */}
                <div style={{ padding: '0 20px 100px 20px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                        borderRadius: '16px',
                        padding: '24px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}>
                        {/* Background decorative elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            left: '-30px',
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '50%'
                        }}></div>

                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h3 style={{
                                color: 'white',
                                fontSize: '22px',
                                fontWeight: '600',
                                margin: '0 0 16px 0',
                                textAlign: 'center'
                            }}>
                                Daily Game Stones
                            </h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <Heart size={28} color="var(--primary-color)" fill="var(--primary-color)" />
                                <span style={{
                                    color: 'white',
                                    fontSize: '36px',
                                    fontWeight: '700'
                                }}>
                                    {userProfile?.dailyGameStones || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    } catch (error) {
        console.error("Error rendering Profile component:", error);
        return (
            <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <h2>Something went wrong</h2>
                    <p>Please try again later</p>
                    <button onClick={() => navigate('/')} style={{ padding: '10px 20px', marginTop: '20px' }}>
                        Go Home
                    </button>
                </div>
            </div>
        );
    }
};

export default Profile;
