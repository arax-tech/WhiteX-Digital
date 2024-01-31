import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,

    CREATE_SUBSCRIPTION_REQUEST,
    CREATE_SUBSCRIPTION_SUCCESS,
    CREATE_SUBSCRIPTION_RESET,
    CREATE_SUBSCRIPTION_FAIL,

    UPDATE_SUBSCRIPTION_REQUEST,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_RESET,
    UPDATE_SUBSCRIPTION_FAIL,

    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_RESET,
    DELETE_SUBSCRIPTION_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/SubscriptionConstant'


export const SubscriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
        case SINGLE_SUBSCRIPTION_REQUEST:
        case CREATE_SUBSCRIPTION_REQUEST:
        case UPDATE_SUBSCRIPTION_REQUEST:
        case DELETE_SUBSCRIPTION_REQUEST:
            return {
                loading: true,
            };



        case SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscriptions: action.payload.subscriptions,
            };
        case SINGLE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload.subscription,
            };


        case CREATE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case SUBSCRIPTION_FAIL:
        case SINGLE_SUBSCRIPTION_FAIL:
        case CREATE_SUBSCRIPTION_FAIL:
        case UPDATE_SUBSCRIPTION_FAIL:
        case DELETE_SUBSCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };



        case CREATE_SUBSCRIPTION_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_SUBSCRIPTION_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_SUBSCRIPTION_RESET:
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
