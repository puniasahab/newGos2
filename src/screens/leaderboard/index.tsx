import React, { useEffect, useState } from 'react';
// import { FaArrowLeft, FaCrown } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
import { leaderboardApi } from "../../api";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Crown, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import { getContestId } from '../../utils/commonFunctions';
import {
    setDailyData, setGameMode,
    setUserRanks, setAllTimeData, setMonthlyData, setWeeklyData,
    
} from './leaderboardSlice';
import { getContestId } from '../../commonFunctions';

// import firstImage from "../../assets/1.png";
// import { useTranslation } from "react-i18next";


interface LeaderboardPlayer {
    id: string;
    name: string;
    phone: string;
    score: number;
    avatar?: string;
}

interface ApiLeaderboardPlayer {
    user_mobile: string;
    gain_ston: number;
    user_email: string;
    email_verified_at: string;
    rank: number;
}

interface LeaderboardProps {
    currentUser?: LeaderboardPlayer;
}

const Leaderboard: React.FC<LeaderboardProps> = () => {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    //@ts-ignore
    const [leaderBoardData, setLeaderBoardData] = useState<any>({});
    // const [activeTab, setActiveTab] = useState('overall');
    const [isLoading, setIsLoading] = useState(false);
    const { userRanks } = useAppSelector((state) => state.leaderboard);
    const [activeTab, setActiveTab] = useState("Weekly");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        console.log("Selected Tab:", tab);
    };

    // Helper functions to get current user data
    const getCurrentUserRank = () => {
        if (!userRanks) return null;
        
        switch (activeTab) {
            case "Daily":
                return userRanks.daily_data?.rank || null;
            case "Weekly":
                return userRanks.weekly_data?.rank || null;
            case "Monthly":
                return userRanks.monthly_data?.rank || null;
            // case "All Time":
            //     return userRanks.all_time_data?.rank || null;
            default:
                return null;
        }
    };

    const getCurrentUserScore = () => {
        if (!userRanks) return null;
        
        switch (activeTab) {
            case "Daily":
                return userRanks.daily_data?.gain_ston || null;
            case "Weekly":
                return userRanks.weekly_data?.gain_ston || null;
            case "Monthly":
                return userRanks.monthly_data?.gain_ston || null;
            // case "All Time":
            //     return userRanks.all_time_data?.gain_ston || null;
            default:
                return null;
        }
    };

    // Get top 3 players for podium
    const getTop3Players = (): ApiLeaderboardPlayer[] => {
        if (!leaderBoardData?.users) return [];
        return leaderBoardData.users.slice(0, 3);
    };

    // Get remaining players (4th position onwards)
    const getRemainingPlayers = (): ApiLeaderboardPlayer[] => {
        if (!leaderBoardData?.users) return [];
        return leaderBoardData.users.slice(3);
    };

    // Format phone number for display
    const formatPhoneNumber = (phone: string) => {
        if (!phone || phone === "N/A") return "N/A";
        return phone.slice(0, 5) + "*****";
    };

    // Generate avatar initials from phone number or email
    const generateAvatar = (phone: string, email: string, index: number) => {
        if (phone && phone !== "N/A") {
            return phone.slice(-2).toUpperCase();
        }
        if (email && email !== "N/A") {
            return email.slice(0, 2).toUpperCase();
        }
        return `P${index + 1}`;
    };
    // const { contestId } = useAppSelector((state) => state.questions);

    // Mock data for demonstration
    // const leaderboardData: LeaderboardPlayer[] = [
    //     { id: '1', name: 'Player 1', phone: '98917*****', score: 1100, avatar: '/api/placeholder/60/60' },
    //     { id: '2', name: 'Player 2', phone: '88600*****', score: 2100, avatar: '/api/placeholder/60/60' },
    //     { id: '3', name: 'Player 3', phone: '85952*****', score: 900, avatar: '/api/placeholder/60/60' },
    //     { id: '4', name: 'Player 4', phone: '74285*****', score: 900, avatar: '/api/placeholder/60/60' },
    //     { id: '5', name: 'You', phone: '70562*****', score: 900, avatar: '/api/placeholder/60/60' },
    //     { id: '6', name: 'Player 6', phone: '73929*****', score: 800, avatar: '/api/placeholder/60/60' },
    //     { id: '7', name: 'Player 7', phone: '98110*****', score: 800, avatar: '/api/placeholder/60/60' },
    // ];

    // const tabs = ['overall', 'monthly', 'weekly', 'today'];

    // const topThree = leaderboardData.slice(0, 3);
    // const restOfPlayers = leaderboardData.slice(3);

    // const getPercentage = (data: any) => {
    //     const noOfUsers = data ? data?.users?.length : 1;
    //     let currentUserRank = 1;
    //     if (getDailyData) {
    //         currentUserRank = userRanks ? userRanks?.daily_data?.rank : 1;
    //     }
    //     else if (getWeeklyData) {
    //         currentUserRank = userRanks ? userRanks?.weekly_data?.rank : 1;
    //     }
    //     else if (getMonthlyData) {
    //         currentUserRank = userRanks ? userRanks?.monthly_data?.rank : 1;
    //     }
    //     else if (getAllTimeData) {
    //         currentUserRank = userRanks ? userRanks?.all_time_data?.rank : 1;
    //     }
    //     const percentage = Math.floor((((noOfUsers - currentUserRank) * 100) / noOfUsers));
    //     console.log(noOfUsers, currentUserRank, percentage, "percentage");
    //     return percentage

    // }

    // const getRank = () => {
    //     let rank = 1;
    //     if (getDailyData) {
    //         rank = userRanks ? userRanks?.daily_data?.rank : 1;
    //     }
    //     else if (getWeeklyData) {
    //         rank = userRanks ? userRanks?.weekly_data?.rank : 1;
    //     }
    //     else if (getMonthlyData) {
    //         rank = userRanks ? userRanks?.monthly_data?.rank : 1;
    //     }
    //     else if (getAllTimeData) {
    //         rank = userRanks ? userRanks?.all_time_data?.rank : 1;
    //     }

    //     console.log("Rank", rank);
    //     return rank;
    // }

    const tabStyle = (tab: string) => ({
        padding: "6px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        margin: "0 8px",
        backgroundColor: activeTab === tab ? "#d32f2f" : "transparent",
        color: activeTab === tab ? "white" : "white",
        border: activeTab === tab ? "none" : "1px solid transparent",
        transition: "0.3s",
    });

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const daily = activeTab === "Daily";
                const weekly = activeTab === "Weekly";
                const monthly = activeTab === "Monthly";
                const allTime = activeTab === "All Time";
                const contestId = getContestId();
                const data = await leaderboardApi.fetchLeaderboard(contestId, daily, weekly, monthly, allTime);
                console.log("Leaderboard API Response:", data);

                // Set leaderboard data based on active tab
                if (daily && data.data.daily_data) {
                    setLeaderBoardData(data.data.daily_data);
                } else if (weekly && data.data.weekly_data) {
                    setLeaderBoardData(data.data.weekly_data);
                } else if (monthly && data.data.monthly_data) {
                    setLeaderBoardData(data.data.monthly_data);
                } else if (allTime && data.data.all_time_data) {
                    setLeaderBoardData(data.data.all_time_data);
                } else {
                    // Fallback to weekly data if active tab data is null
                    setLeaderBoardData(data.data.weekly_data || {});
                }

                // Store all data in Redux
                dispatch(setDailyData(data.data.daily_data));
                dispatch(setWeeklyData(data.data.weekly_data));
                dispatch(setMonthlyData(data.data.monthly_data));
                dispatch(setAllTimeData(data.data.all_time_data));
                dispatch(setUserRanks(data.data.user_ranks));
                dispatch(setGameMode(data.data.game_mode));
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchLeaderboard();
    }, [activeTab, dispatch]);
    // const { t } = useTranslation();
    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', backgroundColor: 'black', position: 'relative' }}>
                {/* Loading Overlay */}
                {isLoading && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            border: '4px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '4px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '20px'
                        }}></div>
                        <p style={{
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '500',
                            textAlign: 'center',
                            margin: 0
                        }}>
                            {t('common.loading')}
                        </p>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        `
                        }} />
                    </div>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        padding: "10px",
                        gap: '10px',
                    }}
                >
                    <span style={tabStyle("Daily")} onClick={() => handleTabClick("Daily")}>
                        {t('leaderboard.daily')}
                    </span>
                    <span style={tabStyle("Weekly")} onClick={() => handleTabClick("Weekly")}>
                        {t('leaderboard.weekly')}
                    </span>
                    <span
                        style={tabStyle("Monthly")}
                        onClick={() => handleTabClick("Monthly")}
                    >
                        {t('leaderboard.monthly')}
                    </span>
                    {/* <span
                        style={tabStyle("All Time")}
                        onClick={() => handleTabClick("All Time")}
                    >
                        All Time
                    </span> */}
                </div>

                {/* Winner Crown Section */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: '20px 0',
                    background: 'black'
                }}>
                    <Crown size={80} color="#FFD700" />
                </div>

                {/* Top 3 Podium */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    padding: '20px',
                    background: 'black',
                    gap: '10px'
                }}>
                    {getTop3Players().length > 0 ? (
                        <>
                            {/* 2nd Place */}
                            {getTop3Players()[1] && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    minWidth: '80px'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                                        marginBottom: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>
                                        {generateAvatar(getTop3Players()[1].user_mobile, getTop3Players()[1].user_email, 1)}
                                    </div>
                                    <div style={{ color: 'white', fontSize: '12px', marginBottom: '4px' }}>{t('leaderboard.player')} 2</div>
                                    <div style={{ color: '#ccc', fontSize: '10px', marginBottom: '8px' }}>
                                        {formatPhoneNumber(getTop3Players()[1].user_mobile)}
                                    </div>
                                    <div style={{
                                        backgroundColor: '#C0C0C0',
                                        color: 'black',
                                        borderRadius: '12px',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        2
                                    </div>
                                    <div style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {getTop3Players()[1].gain_ston}
                                    </div>
                                </div>
                            )}

                            {/* 1st Place */}
                            {getTop3Players()[0] && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    minWidth: '80px',
                                    position: 'relative',
                                    marginBottom: '20px'
                                }}>
                                    <Crown size={24} color="#FFD700" style={{ position: 'absolute', top: '-12px' }} />
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                        marginBottom: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>
                                        {generateAvatar(getTop3Players()[0].user_mobile, getTop3Players()[0].user_email, 0)}
                                    </div>
                                    <div style={{ color: 'white', fontSize: '12px', marginBottom: '4px' }}>{t('leaderboard.player')} 1</div>
                                    <div style={{ color: '#ccc', fontSize: '10px', marginBottom: '8px' }}>
                                        {formatPhoneNumber(getTop3Players()[0].user_mobile)}
                                    </div>
                                    <div style={{
                                        backgroundColor: '#FFD700',
                                        color: 'black',
                                        borderRadius: '12px',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        1
                                    </div>
                                    <div style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {getTop3Players()[0].gain_ston}
                                    </div>
                                </div>
                            )}

                            {/* 3rd Place */}
                            {getTop3Players()[2] && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    minWidth: '80px'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                                        marginBottom: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>
                                        {generateAvatar(getTop3Players()[2].user_mobile, getTop3Players()[2].user_email, 2)}
                                    </div>
                                    <div style={{ color: 'white', fontSize: '12px', marginBottom: '4px' }}>{t('leaderboard.player')} 3</div>
                                    <div style={{ color: '#ccc', fontSize: '10px', marginBottom: '8px' }}>
                                        {formatPhoneNumber(getTop3Players()[2].user_mobile)}
                                    </div>
                                    <div style={{
                                        backgroundColor: '#CD7F32',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        3
                                    </div>
                                    <div style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {getTop3Players()[2].gain_ston}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                            {t('leaderboard.noLeaderboardData')} {activeTab}
                        </div>
                    )}
                </div>

                {/* Leaderboard List */}
                <div style={{ padding: '0 20px 100px', background: 'black' }}>
                    {getRemainingPlayers().map((player: ApiLeaderboardPlayer, index: number) => (
                        <div key={`${player.user_mobile}-${index}`} style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '8px',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: '#333',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {player.rank || (index + 4)}
                                </div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, hsl(${(index + 4) * 60}, 70%, 60%), hsl(${(index + 4) * 60 + 60}, 70%, 60%))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>
                                    {generateAvatar(player.user_mobile, player.user_email, index + 3)}
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                                        {t('leaderboard.player')} {index + 4}
                                    </div>
                                    <div style={{ color: '#999', fontSize: '12px' }}>
                                        {formatPhoneNumber(player.user_mobile)}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Heart size={16} color="#dc2626" fill="#dc2626" />
                                <span style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold' }}>
                                    {player.gain_ston}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Current User Row */}
                    {getCurrentUserRank() && getCurrentUserScore() && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#2a1810',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginTop: '16px',
                            justifyContent: 'space-between',
                            border: '1px solid #dc2626'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: '#dc2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {getCurrentUserRank()}
                                </div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>
                                    YOU
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                                        {t('leaderboard.you')}
                                    </div>
                                    <div style={{ color: '#999', fontSize: '12px' }}>
                                        {t('leaderboard.yourPosition')}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Heart size={16} color="#dc2626" fill="#dc2626" />
                                <span style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold' }}>
                                    {getCurrentUserScore()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* No Data Message */}
                    {(!leaderBoardData?.users || leaderBoardData.users.length === 0) && (
                        <div style={{
                            textAlign: 'center',
                            color: '#999',
                            padding: '40px 20px',
                            fontSize: '16px'
                        }}>
                            {t('leaderboard.noLeaderboardData')} {activeTab}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Leaderboard;