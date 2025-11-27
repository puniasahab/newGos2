import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useAppDispatch } from '../../hooks/redux';
// import Carousel from '../../components/carousel';
// Update the import path below if Carousel is located elsewhere, for example:
import Carousel from "../../components/carousel";
import jackpotEnglish from "../../assets/jackpotEnglish.jpg";
import fastestEnglish from "../../assets/fatestFingerEnglish.jpg";
import rapidEnglish from "../../assets/rapidFireEnglish.jpg";
import jackpotPng from "../../assets/jackpotPng.png";
import jackpotArabic from "../../assets/jackpotArabic.jpg";
import fastestArabic from "../../assets/fatestFingerArabic.jpg";
import rapidArabic from "../../assets/rapidFireArabic.jpg";
import jackpotPolish from "../../assets/jackpotPolish.jpg";
import fastestPolish from "../../assets/fatestFingerPolish.jpg";
import rapidPolish from "../../assets/rapidFirePolish.jpg";
import { contests } from '../../api';
import { Check, CheckCircle, Trophy } from 'lucide-react';
import { QuestionType } from '../../utils/questionsEnum';
import { setContestsData } from './homeSlice';
import { getAuthTokenFromLS, setNameAndContestIdInLS } from '../../commonFunctions';
import { setCurrentQuestionIndex, setIsQuizCompleted, setTotalStonesGained } from '../questions/questionsSlice';
import { useTranslation } from 'react-i18next';

// Or create the Carousel component at '../../components/carousel.tsx'

const Home = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    // Get current language code
    const currentLanguage = i18n.language;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        const fetchContestData = async () => {
            try {
                const response = await contests.fetchContests();
                const contestData = response.data.filter((contest: any) => contest.contest_type === 0);
                console.log("Contest Data:", contestData);
                dispatch(setContestsData(contestData));
                const nameAndID = contestData.map((contest: any) => ({ name: contest.name, contestId: contest.id }));
                // dispatch(setNameAndContestId(nameAndID));
                setNameAndContestIdInLS(nameAndID);

            } catch (error) {
                console.error("Error fetching contest data:", error);
            }
        }
        fetchContestData();
        dispatch(setCurrentQuestionIndex(0));
        dispatch(setTotalStonesGained(0));
        dispatch(setIsQuizCompleted(false));
    }, []);

    const getBannerBasedOnLanguage = (languageCode: string) => {
        switch (languageCode) {
            case 'en':
                return {
                    jackpot: jackpotEnglish,
                    fastest: fastestEnglish,
                    rapid: rapidEnglish
                };
            case 'ar':
                return {
                    jackpot: jackpotArabic,
                    fastest: fastestArabic,
                    rapid: rapidArabic
                };
            case 'pl':
                return {
                    jackpot: jackpotPolish,
                    fastest: fastestPolish,
                    rapid: rapidPolish
                };
            // Add more cases for other languages as needed
            default:
                return {
                    jackpot: jackpotEnglish,
                    fastest: fastestEnglish,
                    rapid: rapidEnglish
                };
        }
    };
    return (
        <div className="min-h-screen background-white bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex justify-center" style={{ maxHeight: '100vh', backgroundColor: 'var(--background-color)', }}>
            <div className="w-full max-w-md bg-white min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
                <Header />
                {/* {Crousel Content} */}
                <div className="pb-20"> {/* Add padding bottom to prevent footer overlap */}
                    <Carousel />
                </div>
                {/* {Contests Section } */}
                <div style={{  marginTop: '16px', background: 'var(--black-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <img src={getBannerBasedOnLanguage(currentLanguage).jackpot} alt="Jackpot Contest" style={{ width: '100%', marginBottom: '10px' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.JACKPOT}`) } else navigate("/login")
                    }} />
                    <img src={getBannerBasedOnLanguage(currentLanguage).fastest} alt="Fastest Contest" style={{ width: '100%', marginBottom: '10px' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.FASTEST_FINGER}`) } else navigate("/login")
                    }} />
                    <img src={getBannerBasedOnLanguage(currentLanguage).rapid} alt="Rapid Contest" style={{ width: '100%' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.RAPID_FIRE}`) } else navigate("/login")
                    }} />



                </div>
                {/* {Game Rules Section} */}
                <div className="px-4 py-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: 'var(--black-color)' }}>
                    <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '28px', color: 'white' }}>{t('game.gameRules')}</h1>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-16px' }}>
                        <Check size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px',  }}>{t('game.answerWithinTimeLimit')}</p>
                    </div>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-16px'  }}>
                        <CheckCircle size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px', }}>{t('game.eachCorrectAnswerEarnsPoint')}</p>
                    </div>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Trophy size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px' }}>{t('game.highestScorerWinsJackpot')}</p>
                    </div>
                </div>
                <div style={{ background: 'var(--black-color)' }}>
                    {/* {Live people section} */}
                    <img src={jackpotPng} alt="Live People" style={{ width: '100%' }} />
                    <div style={{ marginBottom: '100px', background: 'var(--background-color)', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '32px', color: 'white' }}>{t('game.aboutGameOfStones')}</h1>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '80%', marginBottom: '16px', paddingBottom: '16px' }}>
                                <p style={{ color: 'white', fontSize: '18px', lineHeight: '1.6', textAlign: 'center', margin: '0' }}>
                                    {t('game.gameOfStonesDescription')}
                                    {isExpanded && (
                                        <span>
                                            <br /><br />
                                            {t('game.gameOfStonesExtendedDescription')}
                                            <br /><br />
                                            {t('game.gameFeatures')}
                                            <br />• {t('game.multipleGameModes')}
                                            <br />• {t('game.realTimeLeaderboards')}
                                            <br />• {t('game.dailyChallenges')}
                                            {/* <br />• Exciting prizes and cash rewards */}
                                            {/* <br />• Social features to compete with friends */}
                                            <br /><br />
                                            {t('game.gameOfStonesConclusion')}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <button
                                onClick={toggleReadMore}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    padding: '8px 16px',
                                    textAlign: 'center',
                                    margin: '0 auto',
                                    textDecoration: 'underline'
                                }}
                            >
                                {isExpanded ? t('game.readLess') : t('game.readMore')}
                            </button>
                        </div>
                        {/* <p style={{background: 'var(--black-color)'}}>Something happened here</p> */}
                    </div>

                    <div style={{ marginBottom: '200px', background: 'var(--black-color)' }}>
                        <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '28px', color: 'white' }}>{t('game.aboutGameOfStones')}</h1>
                    </div>
                </div>
                {/* {} */}
                <Footer />
            </div>
        </div>
    )
}

export default Home;