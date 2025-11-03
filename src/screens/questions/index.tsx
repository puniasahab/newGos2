
import { useEffect, useState } from "react";
import { useSound } from "../../components/sound";
// import { QuestionType } from "./questionsEnum";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { questionApis } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import { getNameAndContestId } from "../../commonFunctions";
// import Countdown from 'react-countdown';
import { setIsQuizCompleted, 
    setAnswerOptions,
     setCurrentQuestionId, 
     setTotalQuestions, 
     setQuestion,
     setCorrectAnswerCount,
     setSkippedAnswerCount,
     setWrongAnswerCount,
     setCurrentQuestionIndex,
     setScore,
     setCorrectAnswer

} from "./questionsSlice";
// @ts-ignore
import confetti from "canvas-confetti";
import ProgressBarTimer from "./ProgressBarTimer";

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
   
    const { playClickSound, playCorrectSound, playWrongSound } = useSound();
    // const [questionType, setQuestionType] = useState<string>();

    // const { nameAndContestId } = useAppSelector((state) => state.home);
    const { correctAnswer, currentQuestionIndex,  currentQuestionId, answerOptions, 
        // skippedAnswerCount, correctAnswerCount, wrongAnswerCount, 
        question, 
        // totalQuestions, isQuizCompleted,   
    } = useAppSelector((state) => state.questions);

    const { opt1, opt2, opt3, opt4 } = answerOptions;
    const noOfQuestionsPlayed = 1;
    const totalNoOfQuestions = 10;
    const totalStonesGained = 100;


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
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        try {
            const status = isAnswerCorrect ? 1 : 0;
            // @ts-ignore
            const response = await questionApis.submitAnswer(currentQuestionId, status, type, parseInt(getNameAndContestId()?.find((item: {name: string, contestId: number}) => item.name === type)?.contestId || "0" || "0"));
            setTimeout(() => {
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
                setSkipButtonClicked(!skipButtonClicked);
            }, 1200);
        } catch(error) {
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

        if(isWrongAnswerSelected && option === correctAnswer) {
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
            const contestId = getNameAndContestId()?.find((item: {name: string, contestId: number}) => item.name === type)?.contestId;
            // @ts-ignore
            const response = questionApis.submitAnswer(currentQuestionId, status, type, contestId);
        } catch(error) {    
            console.log(error);
        }
        setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
            setSkipButtonClicked(!skipButtonClicked);
        }, 1200);
    }
    

    useEffect(() => {

        const contestId = getNameAndContestId()?.find((item: {name: string, contestId: number}) => item.name === type)?.contestId;
        questionApis.fetchQuestion(contestId).then((data) => {
            dispatch(setIsQuizCompleted(data.data.questionsCompleted));
            if(!data.data.questionsCompleted) {
                dispatch(setQuestion(data.data.data.question.translated_question));
                dispatch(setAnswerOptions({
                    ...data.data.data.question.answer_data
                }));
                dispatch(setCurrentQuestionId(data.data.data.question.id));
                dispatch(setTotalQuestions(data.data.data.total_questions));
                dispatch(setCorrectAnswer(data.data.data.question.correct_answer));
                setLoading(false);
            }
            else {
                dispatch(setSkippedAnswerCount(data.data.userResult.skipped_answers));
                dispatch(setCorrectAnswerCount(data.data.userResult.correct_answers));
                dispatch(setTotalQuestions(data.data.totalNoOfQuestions));
                dispatch(setWrongAnswerCount(data.data.userResult.wrong_answers));
                dispatch(setScore(data.data.userResult.total_stones));
                dispatch(setCurrentQuestionIndex(data.data.userResult.current_question_index));
                // dispatch(setIsQuizCompleted(true)); --- IGNORE ---
            }
        }).catch((error) => {
            console.error('Error fetching questions:', error);
            setLoading(false);
        });
       
    }, [skipButtonClicked])
    // const Completionist = () => <span>You are good to go!</span>;



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
                                }} className="stat-value">{noOfQuestionsPlayed}/{totalNoOfQuestions}</span>
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
                                }} className="stat-value">{totalStonesGained}</span>
                            </div>

                        </div>
                            <ProgressBarTimer duration={12} onComplete={() => {
                                // Increment question index before skipping
                                dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
                                setSkipButtonClicked(!skipButtonClicked);
                                // handleSkip();
                            }} />
                        {/* {Question} */}
                        <div style={{ borderRadius: '0 20px 0 20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', textAlign: 'center', paddingTop: '72px', paddingBottom: '60px', marginLeft: '16px', marginRight: '16px', marginTop: '16px', position: 'relative', backgroundColor: 'white', color: 'black' }}>
                            <h2>{question}</h2>
                            <div className="bg-[linear-gradient(to_right,#ef4444,#7c3aed)]" style={{ position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)', borderRadius: '100%', color: 'white' }}>
                                {/* <CountdownCircleTimer
                   isPlaying
                   size={50}
                   strokeWidth={4}
                   duration={12} // Timer duration in seconds
                //    trailColor="green-500"
                   colors={['#004777', '#70580fff', '#A30000', '#A30000']} // Colors for different progress stages
                   colorsTime={[10, 6, 3, 0]} // Time points for color changes
                onComplete={() => {
                    // Increment question index before skipping
                    dispatch(incrementCurrentQuestionIndex());
                    setSkipButtonClicked(!skipButtonClicked);
                    handleSkip();
                    return { shouldRepeat: false };
                }} // Change skip state when timer ends
        >
          {({ remainingTime }) => (
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {remainingTime}
            </div>
          )}
        </CountdownCircleTimer> */}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '40px', marginBottom: '16px', marginLeft: '16px', marginRight: '16px' }}>
                            <div
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
                            </div>
                            <div
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
                            </div>
                            <div
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
                            </div>
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
                            </div>
                        </div>

                        {/* {Skip Button} */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '32px', marginLeft: '32px' }}>
                            <div style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', color: '#930000', backgroundColor: 'white', padding: '16px', marginTop: '40px', textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginLeft: '16px', marginRight: '16px', width: 'calc(100% - 120px)', marginBottom: '120px', borderRadius: '0 20px 0 20px' }}
                            onClick = {() => {handleSkip()}}
                            >
                                Skip
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