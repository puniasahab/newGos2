import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useAppDispatch } from '../../hooks/redux';
// import Carousel from '../../components/carousel';
// Update the import path below if Carousel is located elsewhere, for example:
import Carousel from "../../components/carousel";
import jackpot from "../../assets/jackpot.png";
import fastest from "../../assets/fastest.png";
import rapid from "../../assets/rapid.png";
import jackpotPng from "../../assets/jackpotPng.png";
import { contests } from '../../api';
import { Check, CheckCircle, Trophy } from 'lucide-react';
import { QuestionType } from '../../utils/questionsEnum';
import { setContestsData } from './homeSlice';
import { getAuthTokenFromLS, setNameAndContestIdInLS } from '../../commonFunctions';
import { setCurrentQuestionIndex, setTotalStonesGained } from '../questions/questionsSlice';

// Or create the Carousel component at '../../components/carousel.tsx'

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

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
    }, [])
    return (
        <div className="min-h-screen background-white bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex justify-center" style={{ maxHeight: '100vh', backgroundColor: 'var(--background-color)', }}>
            <div className="w-full max-w-md bg-white min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
                <Header />
                {/* {Crousel Content} */}
                <div className="pb-20"> {/* Add padding bottom to prevent footer overlap */}
                    <Carousel />
                </div>
                {/* {Contests Section } */}
                <div style={{ paddingLeft: '16px', paddingRight: '16px', marginTop: '16px', background: 'var(--black-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <img src={jackpot} alt="Jackpot Contest" style={{ width: '100%', marginBottom: '10px' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.JACKPOT}`) } else navigate("/login")
                    }} />
                    <img src={fastest} alt="Fastest Contest" style={{ width: '100%', marginBottom: '10px' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.FASTEST_FINGER}`) } else navigate("/login")
                    }} />
                    <img src={rapid} alt="Rapid Contest" style={{ width: '100%' }} onClick={() => {
                        if (getAuthTokenFromLS()) { navigate(`/questions/${QuestionType.RAPID_FIRE}`) } else navigate("/login")
                    }} />



                </div>
                {/* {Game Rules Section} */}
                <div className="px-4 py-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: 'var(--black-color)' }}>
                    <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '28px', color: 'white' }}>Game Rules</h1>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-16px' }}>
                        <Check size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px',  }}>Answer within the time limit</p>
                    </div>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-16px'  }}>
                        <CheckCircle size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px', }}>Each correct answer earns point</p>
                    </div>
                    <div className="flex flex-row items-center text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Trophy size={24} color="var(--primary-color)" />
                        <p className="text-gray-700" style={{ fontSize: '18px', color: 'white', marginLeft: '8px' }}>Highest scorer wins the jackpot</p>
                    </div>
                </div>
                <div style={{ background: 'var(--black-color)' }}>
                    {/* {Live people section} */}
                    <img src={jackpotPng} alt="Live People" style={{ width: '100%' }} />
                    <div style={{ marginBottom: '100px', background: 'var(--background-color)', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '32px', color: 'white' }}>About Game of Stones</h1>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '80%', marginBottom: '16px', paddingBottom: '16px' }}>
                                <p style={{ color: 'white', fontSize: '18px', lineHeight: '1.6', textAlign: 'center', margin: '0' }}>
                                    Game of stones is a fun and competitive quiz game where players can test their knowledge and win exciting prizes!
                                    {isExpanded && (
                                        <span>
                                            <br /><br />
                                            Join thousands of players in this thrilling quiz adventure! Answer questions across various categories including science, history, sports, entertainment, and general knowledge. Each correct answer earns you valuable stones that can lead to amazing rewards.
                                            <br /><br />
                                            Features:
                                            <br />• Multiple game modes: Jackpot, Fastest Finger, and Rapid Fire
                                            <br />• Real-time leaderboards and competitions
                                            <br />• Daily challenges and special events
                                            {/* <br />• Exciting prizes and cash rewards */}
                                            {/* <br />• Social features to compete with friends */}
                                            <br /><br />
                                            Whether you're a trivia expert or just starting out, Game of Stones offers an engaging experience for all knowledge levels. Challenge yourself, climb the leaderboards, and become the ultimate quiz champion!
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
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        {/* <p style={{background: 'var(--black-color)'}}>Something happened here</p> */}
                    </div>

                    <div style={{ marginBottom: '200px', background: 'var(--black-color)' }}>
                        <h1 className="text-2xl font-bold text-center mb-1" style={{ fontSize: '28px', color: 'white' }}>About Game of Stones</h1>
                    </div>
                </div>
                {/* {} */}
                <Footer />
            </div>
        </div>
    )
}

export default Home;