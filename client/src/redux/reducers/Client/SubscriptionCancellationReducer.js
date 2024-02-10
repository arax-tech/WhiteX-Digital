import {
    SUBSCRIPTION_CANCELLATION_REQUEST,
    SUBSCRIPTION_CANCELLATION_SUCCESS,
    SUBSCRIPTION_CANCELLATION_FAIL,

    CREATE_SUBSCRIPTION_CANCELLATION_REQUEST,
    CREATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    CREATE_SUBSCRIPTION_CANCELLATION_RESET,
    CREATE_SUBSCRIPTION_CANCELLATION_FAIL,

    UPDATE_SUBSCRIPTION_CANCELLATION_REQUEST,
    UPDATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    UPDATE_SUBSCRIPTION_CANCELLATION_RESET,
    UPDATE_SUBSCRIPTION_CANCELLATION_FAIL,

    DELETE_SUBSCRIPTION_CANCELLATION_REQUEST,
    DELETE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    DELETE_SUBSCRIPTION_CANCELLATION_RESET,
    DELETE_SUBSCRIPTION_CANCELLATION_FAIL,


    CLEAR_ERRORS
} from '../../constants/Client/SubscriptionCancellationConstant'


export const ClientSubscriptionCancellationReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBSCRIPTION_CANCELLATION_REQUEST:
        case CREATE_SUBSCRIPTION_CANCELLATION_REQUEST:
        case UPDATE_SUBSCRIPTION_CANCELLATION_REQUEST:
        case DELETE_SUBSCRIPTION_CANCELLATION_REQUEST:
            return {
                loading: true,
            };



        case SUBSCRIPTION_CANCELLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                cancellations: action.payload.cancellations,
            };


        case CREATE_SUBSCRIPTION_CANCELLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };
        case UPDATE_SUBSCRIPTION_CANCELLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_SUBSCRIPTION_CANCELLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case SUBSCRIPTION_CANCELLATION_FAIL:
        case CREATE_SUBSCRIPTION_CANCELLATION_FAIL:
        case UPDATE_SUBSCRIPTION_CANCELLATION_FAIL:
        case DELETE_SUBSCRIPTION_CANCELLATION_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };




        case CREATE_SUBSCRIPTION_CANCELLATION_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_SUBSCRIPTION_CANCELLATION_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_SUBSCRIPTION_CANCELLATION_RESET:
            return {
                loading: false,
                isDeleted: false,
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                message: null,
                status: null,
            };

        default:
            return state;
    }
}
