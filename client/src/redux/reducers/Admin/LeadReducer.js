import {
    LEAD_REQUEST,
    LEAD_SUCCESS,
    LEAD_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/LeadConstant'


export const LeadsReducer = (state = {}, action) => {
    switch (action.type) {
        case LEAD_REQUEST:
            return {
                loading: true,
            };


        case LEAD_SUCCESS:
            return {
                ...state,
                loading: false,
                SubscriptionRegistrations: action.payload.response.SubscriptionRegistrations,
                DigitalMarketingBundlePlans: action.payload.response.DigitalMarketingBundlePlans,
                FreeMarketingAnalysis: action.payload.response.FreeMarketingAnalysis,
                BookFreeStrategyCalls: action.payload.response.BookFreeStrategyCalls,
            };


        case LEAD_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
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
