import {
    POPUP_MESSAGE_REQUEST,
    POPUP_MESSAGE_SUCCESS,
    POPUP_MESSAGE_FAIL,

    SINGLE_POPUP_MESSAGE_REQUEST,
    SINGLE_POPUP_MESSAGE_SUCCESS,
    SINGLE_POPUP_MESSAGE_FAIL,

    CREATE_POPUP_MESSAGE_REQUEST,
    CREATE_POPUP_MESSAGE_SUCCESS,
    CREATE_POPUP_MESSAGE_RESET,
    CREATE_POPUP_MESSAGE_FAIL,

    UPDATE_POPUP_MESSAGE_REQUEST,
    UPDATE_POPUP_MESSAGE_SUCCESS,
    UPDATE_POPUP_MESSAGE_RESET,
    UPDATE_POPUP_MESSAGE_FAIL,

    DELETE_POPUP_MESSAGE_REQUEST,
    DELETE_POPUP_MESSAGE_SUCCESS,
    DELETE_POPUP_MESSAGE_RESET,
    DELETE_POPUP_MESSAGE_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/PopupMessageConstant'


export const PopupMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case POPUP_MESSAGE_REQUEST:
        case SINGLE_POPUP_MESSAGE_REQUEST:
        case CREATE_POPUP_MESSAGE_REQUEST:
        case UPDATE_POPUP_MESSAGE_REQUEST:
        case DELETE_POPUP_MESSAGE_REQUEST:
            return {
                loading: true,
            };



        case POPUP_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                popupMessages: action.payload.popupMessages,
            };
     
        case SINGLE_POPUP_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                popupMessage: action.payload.popupMessage,
            };


        case CREATE_POPUP_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_POPUP_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_POPUP_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case POPUP_MESSAGE_FAIL:
        case SINGLE_POPUP_MESSAGE_FAIL:
        case CREATE_POPUP_MESSAGE_FAIL:
        case UPDATE_POPUP_MESSAGE_FAIL:
        case DELETE_POPUP_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_POPUP_MESSAGE_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_POPUP_MESSAGE_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_POPUP_MESSAGE_RESET:
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
