import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './screens/home/homeSlice';
import leaderboardReducer from "./screens/leaderboard/leaderboardSlice";
import questionsReducer from "./screens/questions/questionsSlice";
import logiReducer from "./screens/login/LoginSlice";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        leaderboard: leaderboardReducer,
        questions: questionsReducer,
        login: logiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;