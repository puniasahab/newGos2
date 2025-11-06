import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
    isLoggedIn: boolean;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    phoneNumber: string;
    error: string | null;
    openModal: boolean;
    email: string;
    tabSelected: 'phone' | 'email';
}


const initialState: LoginState = {
    isLoggedIn: false,
    user: null,
    phoneNumber: '',
    error: null,
    openModal: false,
    email: '',
    tabSelected: 'email',
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        },
        setEmailAdd: (state, action) => {
            state.email = action.payload;
        },
        setTabSelected: (state, action) => {
            state.tabSelected = action.payload;
        },
    }
});

export const { setLogin, setLogout, setUser, setPhoneNumber, setOpenModal, setEmailAdd, setTabSelected } = loginSlice.actions;
export default loginSlice.reducer;