import {
    CLIENT_REQUEST,
    CLIENT_SUCCESS,
    CLIENT_FAIL,

    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS,
    CUSTOMER_FAIL,

    SINGLE_CLIENT_REQUEST,
    SINGLE_CLIENT_SUCCESS,
    SINGLE_CLIENT_FAIL,

    CREATE_CLIENT_REQUEST,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_RESET,
    CREATE_CLIENT_FAIL,

    UPDATE_CLIENT_REQUEST,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_RESET,
    UPDATE_CLIENT_FAIL,

    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_RESET,
    DELETE_CLIENT_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/ClientConstant'


export const ClientReducer = (state = {}, action) => {
    switch (action.type) {
        case CLIENT_REQUEST:
        case CUSTOMER_REQUEST:
        case SINGLE_CLIENT_REQUEST:
        case CREATE_CLIENT_REQUEST:
        case UPDATE_CLIENT_REQUEST:
        case DELETE_CLIENT_REQUEST:
            return {
                loading: true,
            };



        case CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                clients: action.payload.clients,
            };
        case CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload,
            };
        case SINGLE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                client: action.payload.client,
            };


        case CREATE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case CLIENT_FAIL:
        case CUSTOMER_FAIL:
        case SINGLE_CLIENT_FAIL:
        case CREATE_CLIENT_FAIL:
        case UPDATE_CLIENT_FAIL:
        case DELETE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_CLIENT_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_CLIENT_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_CLIENT_RESET:
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
