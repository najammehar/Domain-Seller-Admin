import {
    getOffersStart,
    getOffersSuccess,
    getOffersFailure,
    deleteOfferStart,
    deleteOfferSuccess,
    deleteOfferFailure,
    markAsRead,
    getCountReadFalseOffers
} from '../store/offerSlice';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/offers" : "/api/offers";


export const getOffers = (page) => async (dispatch) => {
    dispatch(getOffersStart());
    try {
        const response = await fetch(`${API_URL}/get-offers?page=${page}&limit=20`);
        const data = await response.json();
        dispatch(getOffersSuccess(data));
    } catch (error) {
        dispatch(getOffersFailure(error.message));
    }
}

export const deleteOffer = (id) => async (dispatch) => {
    dispatch(deleteOfferStart());
    try {
        await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        dispatch(deleteOfferSuccess(id));
    } catch (error) {
        dispatch(deleteOfferFailure(error.message));
    }
}

export const markAsReadService =  (id) => async (dispatch) => {
    try {
        await fetch(`${API_URL}/mark-as-read/${id}`, { method: 'PUT' });
        dispatch(markAsRead(id));
    } catch (error) {
        console.log(error.message);
    }
}

export const getCountRead = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/get-count-read-false-offers`);
        const data = await response.json();
        dispatch(getCountReadFalseOffers(data.count));
    } catch (error) {
        console.log(error.message);
    }
}