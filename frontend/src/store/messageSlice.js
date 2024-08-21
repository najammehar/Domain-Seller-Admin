import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    messages: [],
    total: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    count: 0
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getMessagesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getMessagesSuccess: (state, action) => {
            state.loading = false;

            const messageMap = new Map();
            // Add existing messages to the map
            state.messages.forEach(message => {
                messageMap.set(message._id, message);
            });
        
            // Add new messages from the payload to the map (automatically handles duplicates)
            action.payload.messages.forEach(message => {
                messageMap.set(message._id, message);
            });
        
            // Convert the map back to an array
            state.messages = Array.from(messageMap.values());


            state.total = action.payload.total;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.currentPage;

            
        },
        getMessagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteMessageStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteMessageSuccess: (state, action) => {
            state.loading = false;
            state.messages = state.messages.filter((message) => message._id !== action.payload);
            state.total -= 1;
        },
        deleteMessageFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        markAsRead: (state, action) => {
            const message = state.messages.find(message => message._id === action.payload);
            if(message && !message.read){
                message.read = true;
                state.count -= 1;
            }
        },
        getCountReadFalseMessages: (state, action) => {
            state.count = action.payload
        }
    }
});

export const { getMessagesStart, getMessagesSuccess, getMessagesFailure, deleteMessageStart, deleteMessageSuccess, deleteMessageFailure, markAsRead, getCountReadFalseMessages } = messageSlice.actions;
export default messageSlice.reducer;