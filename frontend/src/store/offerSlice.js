import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    offers: [],
    total: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    count: 0
};

export const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        getOffersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getOffersSuccess: (state, action) => {
            state.loading = false;

            const offerMap = new Map();
            // Add existing offers to the map
            state.offers.forEach(offer => {
                offerMap.set(offer._id, offer);
            });
        
            // Add new offers from the payload to the map (automatically handles duplicates)
            action.payload.offers.forEach(offer => {
                offerMap.set(offer._id, offer);
            });
        
            // Convert the map back to an array
            state.offers = Array.from(offerMap.values());


            state.total = action.payload.total;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.currentPage;

            
        },
        getOffersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOfferStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteOfferSuccess: (state, action) => {
            state.loading = false;
            state.offers = state.offers.filter((offer) => offer._id !== action.payload);
            state.total -= 1;
        },
        deleteOfferFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        markAsRead: (state, action) => {
            const offer = state.offers.find(offer => offer._id === action.payload);
            if(offer && !offer.read){
                offer.read = true;
                state.count -= 1;
            }
        },
        getCountReadFalseOffers: (state, action) => {
            state.count = action.payload
        }
    }
});

export const { getOffersStart, getOffersSuccess, getOffersFailure, deleteOfferStart, deleteOfferSuccess, deleteOfferFailure, markAsRead, getCountReadFalseOffers } = offerSlice.actions;
export default offerSlice.reducer;