import {
    SUPPORT_REQUEST,
    SUPPORT_SUCCESS,
    SUPPORT_FAIL,

    SINGLE_SUPPORT_REQUEST,
    SINGLE_SUPPORT_SUCCESS,
    SINGLE_SUPPORT_FAIL,

    CREATE_SUPPORT_REQUEST,
    CREATE_SUPPORT_SUCCESS,
    CREATE_SUPPORT_RESET,
    CREATE_SUPPORT_FAIL,

    SUPPORT_CHAT_REQUEST,
    SUPPORT_CHAT_SUCCESS,
    SUPPORT_CHAT_RESET,
    SUPPORT_CHAT_FAIL,

    UPDATE_SUPPORT_REQUEST,
    UPDATE_SUPPORT_SUCCESS,
    UPDATE_SUPPORT_RESET,
    UPDATE_SUPPORT_FAIL,

    DELETE_SUPPORT_REQUEST,
    DELETE_SUPPORT_SUCCESS,
    DELETE_SUPPORT_RESET,
    DELETE_SUPPORT_FAIL,


    CLEAR_ERRORS
} from '../../constants/Client/SupportConstant'


export const SupportReducer = (state = {}, action) => {
    switch (action.type) {
        case SUPPORT_REQUEST:
        case SINGLE_SUPPORT_REQUEST:
        case CREATE_SUPPORT_REQUEST:
        case UPDATE_SUPPORT_REQUEST:
        case DELETE_SUPPORT_REQUEST:
        case SUPPORT_CHAT_REQUEST:
            return {
                loading: true,
            };



        case SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                supports: action.payload.supports,
            };

        case SINGLE_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                support: action.payload.support,
                chats: action.payload.chats,
            };

        case SUPPORT_CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isChat: true,
            };

        case CREATE_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case SUPPORT_FAIL:
        case SINGLE_SUPPORT_FAIL:
        case CREATE_SUPPORT_FAIL:
        case UPDATE_SUPPORT_FAIL:
        case DELETE_SUPPORT_FAIL:
        case SUPPORT_CHAT_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_SUPPORT_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_SUPPORT_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case SUPPORT_CHAT_RESET:
            return {
                loading: false,
                isChat: false,
            };
        case DELETE_SUPPORT_RESET:
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
