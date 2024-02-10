import {
    INVOICE_REQUEST,
    INVOICE_SUCCESS,
    INVOICE_FAIL,

    WOOCOMMERCE_INVOICE_REQUEST,
    WOOCOMMERCE_INVOICE_SUCCESS,
    WOOCOMMERCE_INVOICE_FAIL,

    SINGLE_INVOICE_REQUEST,
    SINGLE_INVOICE_SUCCESS,
    SINGLE_INVOICE_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/InvoiceConstant'


export const ClientInvoicesReducer = (state = {}, action) => {
    switch (action.type) {
        case INVOICE_REQUEST:
        case SINGLE_INVOICE_REQUEST:
        case WOOCOMMERCE_INVOICE_REQUEST:
            return {
                loading: true,
            };



        case INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload.invoices,
            };
        case WOOCOMMERCE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                wooInvoices: action.payload,
            };
        case SINGLE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoice: action.payload.invoice,
            };


        case INVOICE_FAIL:
        case SINGLE_INVOICE_FAIL:
        case WOOCOMMERCE_INVOICE_FAIL:
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
