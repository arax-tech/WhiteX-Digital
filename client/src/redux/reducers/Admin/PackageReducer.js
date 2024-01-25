import {
    PACKAGE_REQUEST,
    PACKAGE_SUCCESS,
    PACKAGE_FAIL,

    SINGLE_PACKAGE_REQUEST,
    SINGLE_PACKAGE_SUCCESS,
    SINGLE_PACKAGE_FAIL,

    CREATE_PACKAGE_REQUEST,
    CREATE_PACKAGE_SUCCESS,
    CREATE_PACKAGE_RESET,
    CREATE_PACKAGE_FAIL,

    UPDATE_PACKAGE_REQUEST,
    UPDATE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_RESET,
    UPDATE_PACKAGE_FAIL,

    DELETE_PACKAGE_REQUEST,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_RESET,
    DELETE_PACKAGE_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/PackageConstant'

export const PackagesReducer = (state = {}, action) => {
    switch (action.type) {
        case PACKAGE_REQUEST:
        case SINGLE_PACKAGE_REQUEST:
        case CREATE_PACKAGE_REQUEST:
        case UPDATE_PACKAGE_REQUEST:
        case DELETE_PACKAGE_REQUEST:
            return {
                loading: true,
            };




        case PACKAGE_SUCCESS:
            return {
                loading: false,
                packages: action.payload.packages,
            };
        case SINGLE_PACKAGE_SUCCESS:
            return {
                loading: false,
                package: action.payload.package,
            };
        case CREATE_PACKAGE_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };
        case UPDATE_PACKAGE_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_PACKAGE_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };




        case PACKAGE_FAIL:
        case SINGLE_PACKAGE_FAIL:
        case CREATE_PACKAGE_FAIL:
        case UPDATE_PACKAGE_FAIL:
        case DELETE_PACKAGE_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };







        case CREATE_PACKAGE_RESET:
            return {
                isCreated: false,
            };
        case UPDATE_PACKAGE_RESET:
            return {
                isUpdated: false,
            };
        case DELETE_PACKAGE_RESET:
            return {
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