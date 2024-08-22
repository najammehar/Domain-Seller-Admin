import {
    getMessagesStart,
    getMessagesSuccess,
    getMessagesFailure,
    deleteMessageStart,
    deleteMessageSuccess,
    deleteMessageFailure,
    markAsRead,
    getCountReadFalseMessages
} from '../store/messageSlice';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/messages" : "/api/messages";


export const getMessages = (page) => async (dispatch) => {
    dispatch(getMessagesStart());
    try {
        const response = await fetch(`${API_URL}/get-messages?page=${page}&limit=20`);
        const data = await response.json();
        dispatch(getMessagesSuccess(data));
    } catch (error) {
        dispatch(getMessagesFailure(error.message));
    }
}

export const deleteMessage = (id) => async (dispatch) => {
    dispatch(deleteMessageStart());
    try {
        await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        dispatch(deleteMessageSuccess(id));
    } catch (error) {
        dispatch(deleteMessageFailure(error.message));
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
        const response = await fetch(`${API_URL}/get-count-read-false-messages`);
        const data = await response.json();
        dispatch(getCountReadFalseMessages(data.count));
    } catch (error) {
        console.log(error.message);
    }
}