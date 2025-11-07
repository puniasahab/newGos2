import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    id: string;
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
    isMobileVerified?: boolean;
}

interface ProfileState {
    userProfile: UserProfile;
    isLoading: boolean;
    error: string | null;
    isEditMode: boolean;
    openModal: boolean;
    tabSelected?: 'phone' | 'email';
}

const initialState: ProfileState = {
    userProfile: {
        id: '',
        name: '',
        email: '',
        phone: '',
        country: 'India',
        avatar: '',
        isEmailVerified: false,
        gainedStones: 0,
        totalPlayed: 0,
        referralCount: 0,
        dailyGameStones: 0,
        isMobileVerified: false,
    },
    isLoading: false,
    error: null,
    isEditMode: false,
    openModal: false,
    tabSelected: "email",
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            state.userProfile = { ...state.userProfile, ...action.payload };
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userProfile.name = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.userProfile.email = action.payload;
        },
        setUserPhone: (state, action: PayloadAction<string>) => {
            state.userProfile.phone = action.payload;
        },
        setUserCountry: (state, action: PayloadAction<string>) => {
            state.userProfile.country = action.payload;
        },
        setUserAvatar: (state, action: PayloadAction<string>) => {
            state.userProfile.avatar = action.payload;
        },
        setEmailVerified: (state, action: PayloadAction<boolean>) => {
            state.userProfile.isEmailVerified = action.payload;
        },
        setMobileVerified: (state, action: PayloadAction<boolean>) => {
            state.userProfile.isMobileVerified = action.payload;
        },
        setGainedStones: (state, action: PayloadAction<number>) => {
            state.userProfile.gainedStones = action.payload;
        },
        setTotalPlayed: (state, action: PayloadAction<number>) => {
            state.userProfile.totalPlayed = action.payload;
        },
        setReferralCount: (state, action: PayloadAction<number>) => {
            state.userProfile.referralCount = action.payload;
        },
        setDailyGameStones: (state, action: PayloadAction<number>) => {
            state.userProfile.dailyGameStones = action.payload;
        },
        incrementGainedStones: (state, action: PayloadAction<number>) => {
            state.userProfile.gainedStones += action.payload;
        },
        incrementTotalPlayed: (state) => {
            state.userProfile.totalPlayed += 1;
        },
        incrementReferralCount: (state) => {
            state.userProfile.referralCount += 1;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.isEditMode = action.payload;
        },
        resetProfile: (state) => {
            state.userProfile = initialState.userProfile;
            state.error = null;
            state.isEditMode = false;
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.openModal = action.payload;
        },
        setTabSelected: (state, action: PayloadAction<'phone' | 'email'>) => {
            state.tabSelected = action.payload;
        }
    }
});

export const {
    setUserProfile,
    updateUserProfile,
    setUserName,
    setUserEmail,
    setUserPhone,
    setUserCountry,
    setUserAvatar,
    setEmailVerified,
    setGainedStones,
    setTotalPlayed,
    setReferralCount,
    setDailyGameStones,
    incrementGainedStones,
    incrementTotalPlayed,
    incrementReferralCount,
    setIsLoading,
    setError,
    setEditMode,
    resetProfile,
    setOpenModal,
    setMobileVerified,
    setTabSelected,
} = profileSlice.actions;

export default profileSlice.reducer;
