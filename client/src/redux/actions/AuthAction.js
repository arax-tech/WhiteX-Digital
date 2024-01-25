import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,


    

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,


    CLEAR_ERRORS,
} from '../constants/AuthConstant'
import { BaseURL } from '../constants/BaseURL';

export const LoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        // Get the CSRF token from the meta tag in your HTML document
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        

        const { data } = await axios.post(
            `${BaseURL}/api/auth/login`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            }
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
        });
    }
};






export const AuthUserAction = () => async (dispatch) => {
    try {
        console.log('here');

        dispatch({ type: AUTH_USER_REQUEST });

        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        // const { data } = await axios.get(`${BaseURL}/api/${role}/profile`)
        dispatch({
            type: AUTH_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_USER_FAIL,
            payload: error.response.data
        })

    }
}


export const ProfileUpdateAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.patch(`${BaseURL}/api/${role}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.message,
        })

    }
}





export const PasswordUpdateAction = (current_password, new_password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');

        const bodyParameters = {
            current_password: current_password,
            new_password: new_password,
        };

        const { data } = await axios.patch(`${BaseURL}/api/${role}/password/update`, bodyParameters, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const AuthLogout = () => async (dispatch) => {
    try {

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/auth/logout`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}