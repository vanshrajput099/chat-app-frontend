import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sideUsers: [],
    isCheckingSideUsers: false,
    messageUser: null,
    messages: [],
    isLoadingMessages: false,
    onlineUsers: [],
    activeMessageUser: null
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setActiveMessageUser: (state, action) => {
            state.activeMessageUser = action.payload;
        },
        changeCheckingSideUsers: (state, action) => {
            state.isCheckingSideUsers = action.payload;
        },
        setSideUsers: (state, action) => {
            state.sideUsers = action.payload;
        },
        setMessageUser: (state, action) => {
            state.messageUser = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        changeLoadingMessagesTrue: (state, action) => {
            state.isLoadingMessages = true;
        },
        changeLoadingMessagesFalse: (state, action) => {
            state.isLoadingMessages = false;
        },
        setMessageUserNull: (state, action) => {
            state.messageUser = null;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = (action.payload);
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setLogoutMessages: (state, action) => {
            state.sideUsers = [];
            state.messageUser = null;
            state.messages = [];
            state.onlineUsers = [];
        },
        setBackMessage: (state, action) => {
            state.messageUser = null;
            state.messages = [];
        },
        removeOnlineUser: (state, action) => {
            console.log(state.onlineUsers)
            const idx = state.onlineUsers.indexOf(action.payload);
            console.log(idx)
            if (idx !== -1) {
                const arr = state.onlineUsers.filter((ele, index) => idx !== index);
                state.onlineUsers = arr;
            }
        }
    },
});

export const { setActiveMessageUser, removeOnlineUser, setBackMessage, setLogoutMessages, setOnlineUsers, changeCheckingSideUsers, setSideUsers, setMessageUser, setMessages, changeLoadingMessagesTrue, changeLoadingMessagesFalse, setMessageUserNull, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
