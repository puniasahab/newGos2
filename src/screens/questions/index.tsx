
import { useEffect, useState } from "react";
import { useSound } from "../../components/sound";
// import { QuestionType } from "./questionsEnum";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { questionApis } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import { getIsJackpotPlayed, getIsRapidFirePlayed, getIsQuickFingerPlayed, getNameAndContestId, setContestId } from "../../commonFunctions";
// import Countdown from 'react-countdown';
import {
    setIsQuizCompleted,
    setAnswerOptions,
    setCurrentQuestionId,
    setTotalQuestions,
    setQuestion,
    setCorrectAnswerCount,
    setSkippedAnswerCount,
    setWrongAnswerCount,
    setCurrentQuestionIndex,
    setScore,
    setCorrectAnswer,
    setTotalStonesGained,
    setMediaUrl

} from "./questionsSlice";
// @ts-ignore
import confetti from "canvas-confetti";
import ProgressBarTimer from "./ProgressBarTimer";
import ResultScreen from "../resultScreen";
import { QuestionType } from "../../utils/questionsEnum";

// interface Question {
//     contestId?: string;
// }

const Questions = () => {
    const dispatch = useAppDispatch();
    const { type } = useParams();
    const [loading, setLoading] = useState<boolean>(false);

    const [skipButtonClicked, setSkipButtonClicked] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [timerKey, setTimerKey] = useState(0); // Key to force timer restart

    const { playClickSound, playCorrectSound, playWrongSound } = useSound();
    // const [questionType, setQuestionType] = useState<string>();

    // const { nameAndContestId } = useAppSelector((state) => state.home);
    const { correctAnswer, currentQuestionIndex, currentQuestionId, answerOptions,
        skippedAnswerCount, correctAnswerCount, wrongAnswerCount,
        question,
        totalStonesGained,
        totalQuestions, isQuizCompleted, score, mediaUrl
    } = useAppSelector((state) => state.questions);

    const { opt1, opt2, opt3, opt4 } = answerOptions;
    // const noOfQuestionsPlayed = 1;
    // const totalNoOfQuestions = 10;
    // const totalStonesGained = 100;

    // Timer duration based on question type
    const getTimerDuration = () => {
        switch (type) {
            case QuestionType.JACKPOT:
                return 20; // 20 seconds per question
            case QuestionType.FASTEST_FINGER:
                return 11; // 11 seconds per question
            case QuestionType.RAPID_FIRE:
                return 60; // 60 seconds total for all questions
            default:
                return 12; // Default timer
        }
    };

    // Handle timer completion
    const handleTimerComplete = () => {
        if (isAnswerSubmitted) return; // Don't process if answer already submitted

        if (type === QuestionType.RAPID_FIRE) {
            // For RAPID_FIRE, when timer ends, complete the entire quiz
            dispatch(setIsQuizCompleted(true));
        } else {
            // For JACKPOT and FASTEST_FINGER, skip current question and move to next
            // dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
            handleSkip();
        }
    };

    // Reset timer for new question (only for JACKPOT and FASTEST_FINGER)
    const resetTimerForNewQuestion = () => {
        if (type === QuestionType.JACKPOT || type === QuestionType.FASTEST_FINGER) {
            setTimerKey(prev => prev + 1);
        }
        // For RAPID_FIRE, timer continues running and doesn't reset
    };


    const handleAnswerClick = async (answer: string) => {
        if (isAnswerSubmitted) return;
        setSelectedAnswer(answer);
        setIsAnswerSubmitted(true);
        const isAnswerCorrect = answer === correctAnswer;
        if (isAnswerCorrect) {
            // Handle correct answer
            playClickSound();
            playCorrectSound();
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
        } else {
            // Handle wrong answer
            playClickSound()
            playWrongSound();
        }
        // dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        try {
            const status = isAnswerCorrect ? 1 : 0;
            // @ts-ignore
            const response = await questionApis.submitAnswer(currentQuestionId, status, type, parseInt(getNameAndContestId()?.find((item: { name: string, contestId: number }) => item.name === type)?.contestId || "0" || "0"));
            const contestIdForLS = getNameAndContestId()?.find((item: { name: string, contestId: number }) => item.name === type)?.contestId > 0 ? getNameAndContestId()?.find((item: { name: string, contestId: number }) => item.name === type)?.contestId : 0;
            setContestId(contestIdForLS);
            setTimeout(() => {
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
                setSkipButtonClicked(!skipButtonClicked);

                dispatch(setTotalStonesGained(response.data.session.gain_ston))
                resetTimerForNewQuestion();
            }, 1200);
        } catch (error) {
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
        }
    }

    const getOptionBackgroundColor = (option: string) => {
        if (!isAnswerSubmitted || !selectedAnswer) {
            return 'white'; // Default color
        }

        // const decryptedAnswer = decryptAnswer(correctAnswer);
        const isSelectedOption = option === selectedAnswer;
        const isCorrectOption = option === correctAnswer;
        const isWrongAnswerSelected = selectedAnswer !== correctAnswer;

        if (isSelectedOption) {
            return isCorrectOption ? '#4CAF50' : '#f44336'; // Green for correct, red for wrong
        }

        if (isWrongAnswerSelected && option === correctAnswer) {
            return "#4CAF50"; // Highlight correct answer if wrong answer was selected
        }

        return 'white'; // Default color for non-selected options
    };

    const getOptionTextColor = (option: string) => {
        const backgroundColor = getOptionBackgroundColor(option);
        return backgroundColor === 'white' ? '#000' : '#fff';
    };

    const handleSkip = () => {
        try {
            const status = 2;
            const contestId = getNameAndContestId()?.find((item: { name: string, contestId: number }) => item.name === type)?.contestId;
            // @ts-ignore
            const response = questionApis.submitAnswer(currentQuestionId, status, type, contestId);
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
            setSkipButtonClicked(!skipButtonClicked);
            resetTimerForNewQuestion();
        }, 1200);
    }



    useEffect(() => {
        let isContestPLayed = false;
        if (type === QuestionType.JACKPOT) {
            isContestPLayed = getIsJackpotPlayed(type) ? true : false;
        }
        else if (type === QuestionType.FASTEST_FINGER) {
            isContestPLayed = getIsQuickFingerPlayed(type) ? true : false;
        }
        else if (type === QuestionType.RAPID_FIRE) {
            isContestPLayed = getIsRapidFirePlayed(type) ? true : false;
        }
        console.log("Question", currentQuestionIndex, isContestPLayed)
        console.log("Checking...", (currentQuestionIndex === 1 && isContestPLayed))
        const contestId = getNameAndContestId()?.find((item: { name: string, contestId: number }) => item.name === type)?.contestId;
        if (currentQuestionIndex === 0 && isContestPLayed) {

            console.log("Checking inside if...", (currentQuestionIndex === 0 && isContestPLayed))

            questionApis.fetchQuestion(contestId, isContestPLayed).then((data) => {
                dispatch(setIsQuizCompleted(data.data.questionsCompleted));
                if (!data.data.questionsCompleted) {
                    dispatch(setQuestion(data.data.data.question.translated_question));
                    dispatch(setAnswerOptions({
                        ...data.data.data.question.answer_data
                    }));
                    dispatch(setCurrentQuestionId(data.data.data.question.id));
                    dispatch(setTotalQuestions(data.data.totalNoOfQuestions));
                    dispatch(setCorrectAnswer(data.data.data.question.correct_answer));
                    setLoading(false);
                    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
                    dispatch(setMediaUrl(data.data.data.question.media));
                    // Reset timer for new question (only for JACKPOT and FASTEST_FINGER)
                    resetTimerForNewQuestion();
                }
                else {
                    dispatch(setSkippedAnswerCount(data.data.userResult.skipped_answers));
                    dispatch(setCorrectAnswerCount(data.data.userResult.correct_answers));
                    dispatch(setTotalQuestions(data.data.totalNoOfQuestions));
                    dispatch(setWrongAnswerCount(data.data.userResult.wrong_answers));
                    dispatch(setScore(data.data.userResult.total_stones));
                    // dispatch(setCurrentQuestionIndex(data.data.userResult.current_question_index));
                    // dispatch(setIsQuizCompleted(true));
                }
            }).catch((error) => {
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
        }
        else {
            console.log("Checking inside else...", (currentQuestionIndex === 0 && isContestPLayed))

            questionApis.fetchQuestion(contestId, false).then((data) => {
                dispatch(setIsQuizCompleted(data.data.questionsCompleted));
                if (!data.data.questionsCompleted) {
                    dispatch(setQuestion(data.data.data.question.translated_question));
                    dispatch(setAnswerOptions({
                        ...data.data.data.question.answer_data
                    }));
                    dispatch(setMediaUrl(data.data.data.question.media));
                    dispatch(setCurrentQuestionId(data.data.data.question.id));
                    dispatch(setTotalQuestions(data.data.totalNoOfQuestions));
                    dispatch(setCorrectAnswer(data.data.data.question.correct_answer));
                    setLoading(false);
                    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));

                    // Reset timer for new question (only for JACKPOT and FASTEST_FINGER)
                    resetTimerForNewQuestion();
                }
                else {
                    dispatch(setSkippedAnswerCount(data.data.userResult.skipped_answers));
                    dispatch(setCorrectAnswerCount(data.data.userResult.correct_answers));
                    dispatch(setTotalQuestions(data.data.totalNoOfQuestions));
                    dispatch(setWrongAnswerCount(data.data.userResult.wrong_answers));
                    dispatch(setScore(data.data.userResult.total_stones));
                    // dispatch(setCurrentQuestionIndex(data.data.userResult.current_question_index));
                    // dispatch(setIsQuizCompleted(true));
                }
            }).catch((error) => {
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
        }

    }, [skipButtonClicked])
    // const Completionist = () => <span>You are good to go!</span>;

    const getPercentageScore = (part: number, total: number) => {
        if (QuestionType.RAPID_FIRE === type) {
            console.log("Current Question Index", currentQuestionIndex);
            if (totalQuestions > 0) {
                return Math.round((part / currentQuestionIndex) * 100)
            }
            else {
                return "0";
            }
        }
        else {
            if (totalQuestions > 0) {
                return Math.round((part / total) * 100);
            }
            else {
                return "0";
            }
        }
    }

    const getMediaUrlType = (url: string) => {
        const extension = url.split(".").pop()?.toLowerCase() || "";
        if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) return "image";
        if (["mp4", "mov", "webm", "mkv"].includes(extension)) return "video";
        if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";
        return "";
    }

    return (
        <>
            {
                loading ? (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(251, 248, 240, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #930000',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}>
                        </div>
                        <style>
                            {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
                        </style>
                    </div>
                ) : isQuizCompleted ? (
                    <ResultScreen
                        gameData={{
                            nextRoundTime: "14h 25 min",
                            currentScore: score,
                            correctPercentage: getPercentageScore(correctAnswerCount, totalQuestions),
                            wrongPercentage: getPercentageScore(wrongAnswerCount, totalQuestions),
                            skippedPercentage: getPercentageScore(skippedAnswerCount, totalQuestions),
                            correctCount: correctAnswerCount || 0,
                            wrongCount: wrongAnswerCount || 0,
                            skippedCount: skippedAnswerCount || 0,
                            totalQuestions: totalQuestions || 10
                        }}
                        isPlayed={true}
                    />
                ) : (
                    <>
                        <Header />
                        {/* {scorecard and number of question played section} */}
                        <div style={{
                            padding: '16px',
                            marginRight: '16px', marginLeft: '16px', display: 'flex', justifyContent: 'space-between', marginTop: '20px'
                        }}>

                            <div className="stat-box" style={{
                                display: 'flex',
                                overflow: 'hidden',
                                borderRadius: '0 20px 0 20px',
                                fontFamily: 'Arial, sans-serif'
                            }}>
                                <span className="stat-label" style={{
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    padding: '8px 16px',
                                    fontWeight: 500
                                }}>Played</span>
                                <span style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    padding: '8px 16px',
                                    fontWeight: 600
                                }} className="stat-value">{currentQuestionIndex}/{totalQuestions}</span>
                            </div>

                            <div className="stat-box" style={{
                                display: 'flex',
                                overflow: 'hidden',
                                borderRadius: '0 20px 0 20px',
                                fontFamily: 'Arial, sans-serif',
                            }}>
                                <span className="stat-label" style={{
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    padding: '8px 16px',
                                    fontWeight: 500
                                }}>Score</span>
                                <span style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    padding: '8px 16px',
                                    fontWeight: 600
                                }} className="stat-value">{totalStonesGained || 0}</span>
                            </div>

                        </div>
                        <ProgressBarTimer
                            key={type === QuestionType.RAPID_FIRE ? 'rapid-fire-timer' : timerKey}
                            duration={getTimerDuration()}
                            onComplete={handleTimerComplete}
                            shouldResetOnDurationChange={type !== QuestionType.RAPID_FIRE}
                        />
                        {/* {Question} */}
                        <div style={{
                            borderRadius: '0 20px 0 20px',
                            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                            textAlign: 'center',
                            padding: '20px',
                            marginLeft: '16px',
                            marginRight: '16px',
                            marginTop: '16px',
                            position: 'relative',
                            backgroundColor: 'white',
                            color: 'black',
                            height: '200px',
                            width: 'calc(100% - 72px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: mediaUrl ? 'flex-start' : 'center',
                            overflow: 'hidden'
                        }}>
                            <h2 style={{
                                fontSize: mediaUrl ?
                                    (question && question.length > 80 ? '16px' :
                                        question && question.length > 60 ? '18px' : '20px') :
                                    (question && question.length > 100 ? '18px' :
                                        question && question.length > 80 ? '20px' :
                                            question && question.length > 60 ? '22px' : '24px'),
                                margin: 0,
                                marginBottom: mediaUrl ? '16px' : 0,
                                lineHeight: '1.3',
                                wordWrap: 'break-word',
                                hyphens: 'auto',
                                maxWidth: '100%',
                                flex: mediaUrl ? '0 0 auto' : '1',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {question}
                            </h2>
                            {mediaUrl &&
                                <div style={{
                                    width: getMediaUrlType(mediaUrl) === "video" || getMediaUrlType(mediaUrl) === "audio" ? '90%' : '90%',
                                    height: '120px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    border: '2px solid #f0f0f0',
                                    marginTop: 'auto'
                                }}>
                                    {getMediaUrlType(mediaUrl) === "image" ?
                                        (<img
                                            src={mediaUrl}
                                            alt="Question Media"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />) : getMediaUrlType(mediaUrl) === "video" ? (
                                    <video
                                        src={mediaUrl}
                                        controls
                                        autoPlay
                                        // muted
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                    ) : (<audio src={mediaUrl} controls autoPlay style={{ width: '80%' }} ></audio>)}
                                </div>
                            }
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '40px', marginBottom: '4px', marginLeft: '16px', marginRight: '16px' }}>
                            {opt1 && <div
                                style={{
                                    borderRadius: '0 20px 0 20px',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                    textAlign: 'center',
                                    padding: '12px',
                                    fontSize: "20px",
                                    backgroundColor: getOptionBackgroundColor(opt1),
                                    color: getOptionTextColor(opt1),
                                    cursor: isAnswerSubmitted ? 'default' : 'pointer',
                                    opacity: isAnswerSubmitted ? 0.8 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => !isAnswerSubmitted && handleAnswerClick(opt1)}
                            >
                                {opt1}
                            </div>}
                            {opt2 && <div
                                style={{
                                    borderRadius: '20px 0 20px 0',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                    textAlign: 'center',
                                    padding: '12px',
                                    fontSize: "20px",
                                    backgroundColor: getOptionBackgroundColor(opt2),
                                    color: getOptionTextColor(opt2),

                                    // color: 'black',
                                    cursor: isAnswerSubmitted ? 'default' : 'pointer',
                                    opacity: isAnswerSubmitted ? 0.8 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => !isAnswerSubmitted && handleAnswerClick(opt2)}
                            >
                                {opt2}
                            </div>}
                            {opt3 && <div
                                style={{
                                    borderRadius: '20px 0 20px 0',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                    textAlign: 'center',
                                    padding: '12px',
                                    fontSize: "20px",
                                    // backgroundColor: 'white',
                                    // color: 'black',
                                    cursor: isAnswerSubmitted ? 'default' : 'pointer',
                                    backgroundColor: getOptionBackgroundColor(opt3),
                                    color: getOptionTextColor(opt3),
                                    // cursor: isAnswerSubmitted ? 'default' : 'pointer',
                                    opacity: isAnswerSubmitted ? 0.8 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => !isAnswerSubmitted && handleAnswerClick(opt3)}
                            >
                                {opt3}
                            </div>}
                            {opt4 &&
                                <div
                                    style={{
                                        borderRadius: '0 20px 0 20px',
                                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                        textAlign: 'center',
                                        padding: '12px',
                                        fontSize: "20px",
                                        // backgroundColor: 'white',
                                        // color: 'black',
                                        backgroundColor: getOptionBackgroundColor(opt4),
                                        color: getOptionTextColor(opt4),
                                        cursor: isAnswerSubmitted ? 'default' : 'pointer',
                                        opacity: isAnswerSubmitted ? 0.8 : 1,
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => !isAnswerSubmitted && handleAnswerClick(opt4)}
                                >
                                    {opt4}
                                </div>}
                        </div>

                        {/* {Skip Button} */}
                        <div style={{backgroundColor: 'black'}}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '32px', marginLeft: '32px', backgroundColor: 'black'}}>
                            <div style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', color: '#930000', backgroundColor: 'white', padding: '8px', marginTop: '40px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginLeft: '16px', marginRight: '16px', width: 'calc(100% - 120px)', marginBottom: '120px', borderRadius: '0 20px 0 20px' }}
                                onClick={() => { handleSkip() }}
                            >
                                Skip
                            </div>
                        </div>
                        </div>
                        <Footer />
                    </>
                )
            }
        </>
    )
}


export default Questions;