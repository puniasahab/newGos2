import {  Check, X, Hand } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Header from '../../components/header';
import { useParams } from 'react-router-dom'
import { setIsRapidFirePlayed, setIsJackpotPlayed, setIsQuickFingerPlayed } from '../../commonFunctions';
import { QuestionType } from '../../utils/questionsEnum';
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import trophyImage from '../../assets/trophy.png';
// @ts-ignore
import { setCurrentQuestionIndex, setTotalStonesGained } from '../questions/questionsSlice';

interface GameData {
    nextRoundTime: string;
    currentScore: number;
    correctPercentage: string | number;
    wrongPercentage: string | number;
    skippedPercentage: string | number;
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
    totalQuestions: number;
}

interface ResultScreenProps {
    gameData?: GameData;
    isPlayed?: boolean;
}

const ResultScreen = ({ gameData: propGameData, isPlayed }: ResultScreenProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const { type } = useParams();
    console.log("type from result screen:", type, isPlayed);




    // Get data from Redux state
    const {
        skippedAnswerCount,
        correctAnswerCount,
        wrongAnswerCount,
        totalQuestions,
        score
    } = useAppSelector((state) => state.questions);

    // Use prop data if provided, otherwise use Redux state data
    const gameData = propGameData || {
        nextRoundTime: "14h 25 min",
        currentScore: score || 1000,
        correctPercentage: totalQuestions > 0 ? Math.round((correctAnswerCount / totalQuestions) * 100) : 100,
        wrongPercentage: totalQuestions > 0 ? Math.round((wrongAnswerCount / totalQuestions) * 100) : 0,
        skippedPercentage: totalQuestions > 0 ? Math.round((skippedAnswerCount / totalQuestions) * 100) : 0,
        correctCount: correctAnswerCount || 10,
        wrongCount: wrongAnswerCount || 0,
        skippedCount: skippedAnswerCount || 0,
        totalQuestions: totalQuestions || 10
    };

    const handlePlayNow = () => {
        if (type === QuestionType.JACKPOT) {
            setIsJackpotPlayed(type, isPlayed);
        } else if (type === QuestionType.FASTEST_FINGER) {
            setIsQuickFingerPlayed(type, isPlayed);
        } else if (type === QuestionType.RAPID_FIRE) {
            setIsRapidFirePlayed(type, isPlayed);
        }
        // dispatch(setCurrentQuestionIndex(0));
        dispatch(setTotalStonesGained(0));
        navigate('/');
    };

    const handleViewLeaderboard = () => {
        if (type === QuestionType.JACKPOT) {
            setIsJackpotPlayed(type, isPlayed);
        } else if (type === QuestionType.FASTEST_FINGER) {
            setIsQuickFingerPlayed(type, isPlayed);
        } else if (type === QuestionType.RAPID_FIRE) {
            setIsRapidFirePlayed(type, isPlayed);
        }
        // dispatch(setCurrentQuestionIndex(1));
        dispatch(setTotalStonesGained(0));
        navigate('/leaderboard');
    };

    useEffect(() => {
        if (type === QuestionType.JACKPOT) {
            setIsJackpotPlayed(type, isPlayed);
        } else if (type === QuestionType.FASTEST_FINGER) {
            setIsQuickFingerPlayed(type, isPlayed);
        } else if (type === QuestionType.RAPID_FIRE) {
            setIsRapidFirePlayed(type, isPlayed);
        }
    }, [])







    return (
        <div style={{
            backgroundColor: 'black',
            minHeight: '100vh',
            color: 'white',
            position: 'relative'
        }}>
            {/* Header */}
            {/* <div style={{
                padding: '16px 20px',
                paddingTop: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Menu size={24} color="white" style={{ cursor: 'pointer' }} />
                    <div>
                        <div style={{ 
                            color: 'white', 
                            fontSize: '18px', 
                            fontWeight: '700',
                            letterSpacing: '1px'
                        }}>
                            GAME
                        </div>
                        <div style={{ 
                            color: 'var(--primary-color)', 
                            fontSize: '18px', 
                            fontWeight: '700',
                            letterSpacing: '1px',
                            marginTop: '-2px'
                        }}>
                            STONES
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Share2 size={24} color="white" style={{ cursor: 'pointer' }} />
                    <Bell size={24} color="white" style={{ cursor: 'pointer' }} />
                    <Globe size={24} color="white" style={{ cursor: 'pointer' }} />
                </div>
            </div> */}
            <Header />
            {/* Next Round Timer */}
            {/* <div style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '30px'
            }}>
                <p style={{
                    color: 'white',
                    fontSize: '16px',
                    margin: 0,
                    fontWeight: '500'
                }}>
                    New Rounds Unlock In: {gameData.nextRoundTime}
                </p>
            </div> */}

            {/* Trophy Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px',
                marginTop: '30px',
            }}>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Confetti/Sparkles around trophy */}
                    {/* <div style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%'

                    }}></div> */}

                    {/* Trophy Icon */}
                    <div style={{
                        // backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        // borderRadius: '50%',
                        width: '120px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1px',

                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <img src={trophyImage} alt="Trophy" style={{ width: '100%', height: '100%' }} />
                        {/* <Trophy size={60} color="#FFD700" fill="#FFD700" /> */}
                    </div>

                    {/* Animated sparkles */}
                    {/* <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#FFD700', fontSize: '20px' }}>✨</div>
                    <div style={{ position: 'absolute', top: '30px', right: '30px', color: '#FFD700', fontSize: '16px' }}>⭐</div>
                    <div style={{ position: 'absolute', bottom: '20px', left: '30px', color: '#FFD700', fontSize: '18px' }}>✨</div>
                    <div style={{ position: 'absolute', bottom: '30px', right: '20px', color: '#FFD700', fontSize: '14px' }}>⭐</div> */}
                </div>
            </div>

            {/* Congratulations Text */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h2 style={{
                    color: 'var(--primary-color)',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 8px 0'
                }}>
                    {t('results.congratulations')}
                </h2>
                <p style={{
                    color: '#ccc',
                    fontSize: '16px',
                    margin: 0,
                    lineHeight: '1.4'
                }}>
                    {t('results.completedRoundForToday')}
                </p>
            </div>

            {/* Game Summary Title */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h3 style={{
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: 0
                }}>
                    {t('results.gameSummary')}
                </h3>
            </div>

            {/* Stats Grid */}
            <div style={{
                padding: '0 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '40px'
            }}>
                {/* Current Score */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '12px',
                    padding: '4px 20px 4px 20px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '18px',
                        margin: '0 0 8px 0',
                        // fontWeight: '600',
                        textAlign: 'start'
                    }}>
                        {t('results.currentScore')}
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: '400',
                        textAlign: 'start',
                        margin: 0
                    }}>
                        {gameData.currentScore}
                    </p>
                </div>

                {/* Correct */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '12px',
                    padding: '4px 20px 4px 20px',
                    textAlign: 'start',

                    position: 'relative'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '18px',
                        margin: '0 0 8px 0',
                        // fontWeight: '600'
                    }}>
                        {t('results.correct')}
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '32px',
                        textAlign: 'start',
                        fontWeight: '400',
                        margin: 0
                    }}>
                        {gameData.correctPercentage}%
                    </p>
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Check size={20} color="#00ff00" strokeWidth={3} />
                    </div>
                </div>

                {/* Wrong */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '12px',
                    padding: '4px 20px 4px 20px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '18px',
                        textAlign: 'start',
                        margin: '0 0 8px 0',
                        // fontWeight: '600'
                    }}>
                        {t('results.wrong')}
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '32px',
                        textAlign: 'start',
                        fontWeight: '400',
                        margin: 0
                    }}>
                        {gameData.wrongPercentage}%
                    </p>
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <X size={20} color="#ff4444" strokeWidth={3} />
                    </div>
                </div>

                {/* Skipped */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '12px',
                    padding: '4px 20px 4px 20px',
                    textAlign: 'start',
                    position: 'relative'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '18px',
                        // textAlign: 'start',
                        margin: '0 0 8px 0',
                        // fontWeight: '600'
                    }}>
                        {t('results.skipped')}
                    </p>
                    <p style={{
                        color: 'white',
                        fontSize: '32px',
                        textAlign: 'start',
                        fontWeight: '400',
                        margin: 0
                    }}>
                        {gameData.skippedPercentage}%
                    </p>
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(255, 165, 0, 0.2)',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Hand size={20} color="#FFA500" strokeWidth={2} />
                    </div>
                </div>
            </div>

            {/* View Leaderboard Button */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <button
                    onClick={handleViewLeaderboard}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: '10px'
                    }}
                >
                    {t('results.viewLeaderboard')}
                </button>
            </div>

            {/* Play Now Button */}
            <div style={{
                padding: '0 20px 40px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <button
                    onClick={handlePlayNow}
                    style={{
                        width: '70%',
                        padding: '18px',
                        marginTop: '-16px',
                        backgroundColor: 'white',
                        borderRadius: '0 20px 0 20px',
                        color: 'var(--primary-color)',
                        border: 'none',
                        // borderRadius: '12px',
                        fontSize: '18px',

                        fontWeight: '700',
                        // fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
                    }}
                >
                    {t('results.homePage')}
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
