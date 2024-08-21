import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import domainReducer from './domainSlice';
import offerReducer from './offerSlice';
import messageReducer from './messageSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        domain: domainReducer,
        offer: offerReducer,
        message: messageReducer,
    },
});