import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAIL,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,


    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
   
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    CLEAR_ERRORS,
} from '../constants/AuthConstant'


export const AuthReducer = (state = { user: {} }, action) => {
    console.log(action.payload?.status);
    switch (action.type) {
        case LOGIN_REQUEST:
        case VERIFY_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case AUTH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                status: action.payload.status,
                token: action.payload.token,
                user: action.payload.user,
                menus: action.payload.menus,
            };


        case AUTH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                menus: action.payload.menus,
            };

        case AUTH_LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                message: action.payload.message,
                status: action.payload.status,
            };



        case LOGIN_FAIL:
        case VERIFY_FAIL:
        case AUTH_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
            };
        case AUTH_LOGOUT_FAIL:
            return {
                loading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
                status: null,
            }

        default:
            return state;
    }
}

export const UpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
                status: null
            };

        default:
            return state;
    }
}


export const ForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                status: action.payload.status,
                message: action.payload.message,
            };


        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                isUpdated: false,
                status: action.payload.status,
                message: action.payload.message,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                status: null,
                message: null,
                isUpdated: null,
            };

        default:
            return state;
    }
}
