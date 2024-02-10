import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    SETTING_REQUEST,
    SETTING_SUCCESS,
    SETTING_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

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
        const { data } = await axios.post(`${BaseURL}/api/auth/login`, { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
        });
    }
};
export const OtpVerifyAction = (otp) => async (dispatch) => {
    try {
        dispatch({ type: VERIFY_REQUEST });
        const { data } = await axios.post(`${BaseURL}/api/auth/verify-otp`, { otp },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        dispatch({
            type: VERIFY_SUCCESS,
            payload: data,
        });
        console.log(data)
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: VERIFY_FAIL,
            payload: error.response.data,
        });
    }
};

export const ForgotPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const { data } = await axios.post(`${BaseURL}/api/auth/password/forgot`, { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data,
        });
    }
};

export const ResetPasswordAction = (reset_token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const { data } = await axios.post(`${BaseURL}/api/auth/password/reset/${reset_token}`, { password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data,
        });
    }
};

export const SettingAction = () => async (dispatch) => {
    try {
        dispatch({ type: SETTING_REQUEST });

        const { data } = await axios.get(`${BaseURL}/api/auth/setting`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: SETTING_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: SETTING_FAIL,
            payload: error.response.data
        })

    }
}


export const AuthUserAction = () => async (dispatch) => {
    try {
        // console.log('here');

        dispatch({ type: AUTH_USER_REQUEST });

        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

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
        const { data } = await axios.post(`${BaseURL}/api/${role}/update/profile`, formData, {
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

        const { data } = await axios.post(`${BaseURL}/api/${role}/update/password`, bodyParameters, {
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

export const AuthLogoutAction = () => async (dispatch) => {
    try {

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/auth/logout`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            payload: data
        })
        window.location.href = "/";
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