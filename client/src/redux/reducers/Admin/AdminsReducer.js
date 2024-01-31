import {
    ADMINS_REQUEST,
    ADMINS_SUCCESS,
    ADMINS_FAIL,

    SINGLE_ADMINS_REQUEST,
    SINGLE_ADMINS_SUCCESS,
    SINGLE_ADMINS_FAIL,

    CREATE_ADMINS_REQUEST,
    CREATE_ADMINS_SUCCESS,
    CREATE_ADMINS_RESET,
    CREATE_ADMINS_FAIL,

    UPDATE_ADMINS_REQUEST,
    UPDATE_ADMINS_SUCCESS,
    UPDATE_ADMINS_RESET,
    UPDATE_ADMINS_FAIL,

    DELETE_ADMINS_REQUEST,
    DELETE_ADMINS_SUCCESS,
    DELETE_ADMINS_RESET,
    DELETE_ADMINS_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/AdminsConstant'


export const AdminsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMINS_REQUEST:
        case SINGLE_ADMINS_REQUEST:
        case CREATE_ADMINS_REQUEST:
        case UPDATE_ADMINS_REQUEST:
        case DELETE_ADMINS_REQUEST:
            return {
                loading: true,
            };



        case ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: action.payload.admins,
            };
        case SINGLE_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                admin: action.payload.admin,
            };


        case CREATE_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case ADMINS_FAIL:
        case SINGLE_ADMINS_FAIL:
        case CREATE_ADMINS_FAIL:
        case UPDATE_ADMINS_FAIL:
        case DELETE_ADMINS_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_ADMINS_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_ADMINS_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_ADMINS_RESET:
            return {
                loading: false,
                isDeleted: false,
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
                status: null,
            };

        default:
            return state;
    }
}
