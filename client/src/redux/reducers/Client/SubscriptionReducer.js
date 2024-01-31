import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,


    CLEAR_ERRORS
} from '../../constants/Client/SubscriptionConstant'


export const ClientSubscriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
        case SINGLE_SUBSCRIPTION_REQUEST:
            return {
                loading: true,
            };



        case SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload.subscription,
            };
        case SINGLE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload.subscription,
            };




        case SUBSCRIPTION_FAIL:
        case SINGLE_SUBSCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
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
