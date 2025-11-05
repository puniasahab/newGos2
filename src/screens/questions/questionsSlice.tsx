import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface QuestionState {
    question: string;
    correctAnswer: string;
    currentQuestionIndex: number;
    isLoading: boolean;
    score: number;
    isQuizCompleted: boolean;
    answerOptions: {opt1: string, opt2: string, opt3: string, opt4: string};
    currentQuestionId: number;
    totalQuestions: number;
    correctAnswerCount: number;
    wrongAnswerCount: number;
    skippedAnswerCount: number;
    totalStonesGained?: number;
    mediaUrl?: string;

}


const initialState: QuestionState = {
    question: "",
    correctAnswer: "",
    currentQuestionIndex: 0,
    isLoading: false,
    score: 0,
    isQuizCompleted: false,
    answerOptions: 
        { opt1: "Option1", opt2: "Option2", opt3: "Option3", opt4: "Option4" }
    ,
    currentQuestionId: 0,
    totalQuestions: 0,
    correctAnswerCount: 0,
    wrongAnswerCount: 0,
    skippedAnswerCount: 0,
    mediaUrl: "",
}


export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestion: (state, action: PayloadAction<string>) => {
            state.question = action.payload;
        },
        setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
            state.currentQuestionIndex = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        },
        setIsQuizCompleted: (state, action: PayloadAction<boolean>) => {
            state.isQuizCompleted = action.payload;
        },
        setAnswerOptions: (state, action: PayloadAction<{opt1: string, opt2: string, opt3: string, opt4: string}>) => {
            state.answerOptions = action.payload;
        },
        setCurrentQuestionId: (state, action: PayloadAction<number>) => {
            state.currentQuestionId = action.payload;
        },
        setTotalQuestions: (state, action: PayloadAction<number>) => {
            state.totalQuestions = action.payload;
        },
        setCorrectAnswerCount: (state, action: PayloadAction<number>) => {
            state.correctAnswerCount = action.payload;
        },
        setWrongAnswerCount: (state, action: PayloadAction<number>) => {
            state.wrongAnswerCount = action.payload;
        },
        setSkippedAnswerCount: (state, action: PayloadAction<number>) => {
            state.skippedAnswerCount = action.payload;
        },
        setCorrectAnswer: (state, action: PayloadAction<string>) => {
            state.correctAnswer = action.payload;
        },
        setTotalStonesGained: (state, action: PayloadAction<number>) => {
            state.totalStonesGained = action.payload;
        },
        setMediaUrl: (state, action: PayloadAction<string>) => {
            state.mediaUrl = action.payload;
        },
    },
});


export const { setQuestion, 
    setCurrentQuestionIndex,
     setIsLoading,
     setScore,
     setIsQuizCompleted,
     setAnswerOptions,
     setCurrentQuestionId,
     setTotalQuestions,
     setCorrectAnswerCount,
     setWrongAnswerCount,
     setCorrectAnswer,
     setSkippedAnswerCount,
    setTotalStonesGained,
    setMediaUrl
} = questionsSlice.actions;

export default questionsSlice.reducer;
