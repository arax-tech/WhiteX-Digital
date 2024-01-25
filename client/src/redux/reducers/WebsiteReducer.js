import {
    WEBSITE_PACKAGE_REQUEST,
    WEBSITE_PACKAGE_SUCCESS,
    WEBSITE_PACKAGE_FAIL,

    WEBSITE_SINGLE_PACKAGE_REQUEST,
    WEBSITE_SINGLE_PACKAGE_SUCCESS,
    WEBSITE_SINGLE_PACKAGE_FAIL,

    CLEAR_ERRORS
} from '../constants/WebsiteConstant'

export const WebsiteReducer = (state = {}, action) => {
    switch (action.type) {
        case WEBSITE_PACKAGE_REQUEST:
        case WEBSITE_SINGLE_PACKAGE_REQUEST:
            return {
                loading: true,
            };




        case WEBSITE_PACKAGE_SUCCESS:
            return {
                loading: false,
                packages: action.payload.packages,
            };
        case WEBSITE_SINGLE_PACKAGE_SUCCESS:
            return {
                loading: false,
                package: action.payload.package,
            };


        case WEBSITE_PACKAGE_FAIL:
        case WEBSITE_SINGLE_PACKAGE_FAIL:
            return {
                loading: false,
                errors: action.payload,
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