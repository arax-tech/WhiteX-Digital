import {
    WIDTHDRAW_REQUEST,
    WIDTHDRAW_SUCCESS,
    WIDTHDRAW_FAIL,

    SINGLE_WIDTHDRAW_REQUEST,
    SINGLE_WIDTHDRAW_SUCCESS,
    SINGLE_WIDTHDRAW_FAIL,

    CREATE_WIDTHDRAW_REQUEST,
    CREATE_WIDTHDRAW_SUCCESS,
    CREATE_WIDTHDRAW_RESET,
    CREATE_WIDTHDRAW_FAIL,

    UPDATE_WIDTHDRAW_REQUEST,
    UPDATE_WIDTHDRAW_SUCCESS,
    UPDATE_WIDTHDRAW_RESET,
    UPDATE_WIDTHDRAW_FAIL,

    DELETE_WIDTHDRAW_REQUEST,
    DELETE_WIDTHDRAW_SUCCESS,
    DELETE_WIDTHDRAW_RESET,
    DELETE_WIDTHDRAW_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/WidthdrawConstant'


export const WidthdrawReducer = (state = {}, action) => {
    switch (action.type) {
        case WIDTHDRAW_REQUEST:
        case SINGLE_WIDTHDRAW_REQUEST:
        case CREATE_WIDTHDRAW_REQUEST:
        case UPDATE_WIDTHDRAW_REQUEST:
        case DELETE_WIDTHDRAW_REQUEST:
            return {
                loading: true,
            };






        case WIDTHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                widthdraws: action.payload.widthdraws,
            };

        case SINGLE_WIDTHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                widthdraw: action.payload.widthdraw,
            };

        case CREATE_WIDTHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_WIDTHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_WIDTHDRAW_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case WIDTHDRAW_FAIL:
        case SINGLE_WIDTHDRAW_FAIL:
        case CREATE_WIDTHDRAW_FAIL:
        case UPDATE_WIDTHDRAW_FAIL:
        case DELETE_WIDTHDRAW_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };






        case CREATE_WIDTHDRAW_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_WIDTHDRAW_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_WIDTHDRAW_RESET:
            return {
                loading: false,
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
