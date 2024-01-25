import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,

    SINGLE_USER_REQUEST,
    SINGLE_USER_SUCCESS,
    SINGLE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    STATUS_USER_REQUEST,
    STATUS_USER_SUCCESS,
    STATUS_USER_RESET,
    STATUS_USER_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/UserConstant'


export const UsersReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REQUEST:
        case SINGLE_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case STATUS_USER_REQUEST:
            return {
                loading: true,
            };


        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            };

        case SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            };
        case STATUS_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case USER_FAIL:
        case SINGLE_USER_FAIL:
        case DELETE_USER_FAIL:
        case STATUS_USER_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };






        case STATUS_USER_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_USER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };

        default:
            return state;
    }
}
