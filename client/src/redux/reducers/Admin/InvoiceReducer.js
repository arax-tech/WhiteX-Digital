import {
    INVOICE_REQUEST,
    INVOICE_SUCCESS,
    INVOICE_FAIL,

    SINGLE_INVOICE_REQUEST,
    SINGLE_INVOICE_SUCCESS,
    SINGLE_INVOICE_FAIL,

    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_RESET,
    CREATE_INVOICE_FAIL,

    UPDATE_INVOICE_REQUEST,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_RESET,
    UPDATE_INVOICE_FAIL,

    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_RESET,
    DELETE_INVOICE_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/InvoiceConstant'


export const InvoicesReducer = (state = {}, action) => {
    switch (action.type) {
        case INVOICE_REQUEST:
        case SINGLE_INVOICE_REQUEST:
        case CREATE_INVOICE_REQUEST:
        case UPDATE_INVOICE_REQUEST:
        case DELETE_INVOICE_REQUEST:
            return {
                loading: true,
            };



        case INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload.invoices,
            };
        case SINGLE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoice: action.payload.invoice,
            };


        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case INVOICE_FAIL:
        case SINGLE_INVOICE_FAIL:
        case CREATE_INVOICE_FAIL:
        case UPDATE_INVOICE_FAIL:
        case DELETE_INVOICE_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_INVOICE_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_INVOICE_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_INVOICE_RESET:
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
