import { ArrowLeft, Share2, Edit, Heart, Gamepad2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Footer from '../../components/footer';

const Profile = () => {
    const navigate = useNavigate();
    const { userProfile } = useAppSelector((state) => state.profile);

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'var(--primary-color)',
                padding: '16px 20px',
                paddingTop: '50px',
                position: 'relative'
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
                            onClick={() => navigate(-1)}
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
                            src={userProfile.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face"}
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
                            {userProfile.name}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ color: 'white', fontSize: '16px' }}>📞</span>
                            <span style={{ color: 'white', fontSize: '16px' }}>{userProfile.phone}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'white', fontSize: '16px' }}>✉️</span>
                            <span style={{ color: 'white', fontSize: '16px' }}>{userProfile.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                padding: '20px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    flex: 1,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Heart size={20} color="var(--primary-color)" fill="var(--primary-color)" />
                        <span style={{ fontSize: '24px', fontWeight: '700', color: 'black' }}>{userProfile.gainedStones}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Gained Stones</p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    flex: 1,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Gamepad2 size={20} color="var(--primary-color)" />
                        <span style={{ fontSize: '24px', fontWeight: '700', color: 'black' }}>{userProfile.totalPlayed}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Total Played</p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    flex: 1,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Users size={20} color="var(--primary-color)" />
                        <span style={{ fontSize: '24px', fontWeight: '700', color: 'black' }}>{userProfile.referralCount}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Referral Count</p>
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
                                {userProfile.dailyGameStones}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
