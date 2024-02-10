import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS,
    CUSTOMER_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,


    UPDATE_BILLING_REQUEST,
    UPDATE_BILLING_SUCCESS,
    UPDATE_BILLING_FAIL,
    UPDATE_BILLING_RESET,

    CLEAR_ERRORS
} from '../../constants/Client/SubscriptionConstant'


export const ClientSubscriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
        case CUSTOMER_REQUEST:
        case SINGLE_SUBSCRIPTION_REQUEST:
        case UPDATE_BILLING_REQUEST:
            return {
                loading: true,
            };



        case SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload,
            };
        case CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: action.payload,
            };
        case UPDATE_BILLING_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                message: "Billing Update Successfully...",
            };
        case UPDATE_BILLING_RESET:
            return {
                ...state,
                message: null,
                isUpdated: false,
            };
        case SINGLE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload.subscription,
            };




        case SUBSCRIPTION_FAIL:
        case SINGLE_SUBSCRIPTION_FAIL:
        case UPDATE_BILLING_FAIL:
        case CUSTOMER_FAIL:
            return {
                ...state,
                loading: false,
            };




        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
            };

        default:
            return state;
    }
}
