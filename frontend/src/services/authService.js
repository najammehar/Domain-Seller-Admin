import { loginStart, loginSuccess, loginFailure, logout, checkAuthFailure, checkAuthSuccess, checkAuthStart } from "../store/authSlice";

const API_URL = "http://localhost:3000/api/auth";

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  };

export const login = (credential) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
            credentials: 'include',
        });
        const data = await handleResponse(response);
        dispatch(loginSuccess(data.user));
    } catch (error) {
        dispatch(loginFailure(error.message));
        throw error;
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        });
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

export const checkAuth = () => async (dispatch) => {
    dispatch(checkAuthStart());
    try {
        const response = await fetch(`${API_URL}/check-auth`,{
            method: 'GET',
            credentials: 'include',
        });
        const data = await handleResponse(response);
        dispatch(checkAuthSuccess(data.user));
    } catch (error) {
        dispatch(checkAuthFailure());
        throw error;
    }
}