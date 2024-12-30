import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authUser: null,
    isCheckingAuth: true,
    isSigningIn: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    socket: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeIsLogginIn: (state, action) => {
            state.isLogginIn = action.payload;
        },
        changeCheckingAuth: (state, action) => {
            state.isCheckingAuth = false;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setLogout: (state, action) => {
            state.authUser = null;
            state.socket = null;
        },
        setUsername: (state, action) => {
            state.authUser = action.payload;
        },
        setAvatar: (state, action) => {
            state.authUser = action.payload;
        },
        changeIsUpdatingProfile: (state, action) => {
            state.isUpdatingProfile = action.payload;
        }
    },
});

export const { changeIsUpdatingProfile, setUsername, changeIsLogginIn, setAvatar, changeCheckingAuth, setAuthUser, setSocket, setLogout } = userSlice.actions;

export default userSlice.reducer;
