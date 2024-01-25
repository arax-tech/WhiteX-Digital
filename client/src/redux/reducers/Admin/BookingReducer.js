import {
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAIL,

    SINGLE_BOOKING_REQUEST,
    SINGLE_BOOKING_SUCCESS,
    SINGLE_BOOKING_FAIL,

    UPDATE_BOOKING_STATUS_REQUEST,
    UPDATE_BOOKING_STATUS_SUCCESS,
    UPDATE_BOOKING_STATUS_RESET,
    UPDATE_BOOKING_STATUS_FAIL,

    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_RESET,
    DELETE_BOOKING_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/BookingConstant'


export const BookingReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOKING_REQUEST:
        case SINGLE_BOOKING_REQUEST:
        case DELETE_BOOKING_REQUEST:
        case UPDATE_BOOKING_STATUS_REQUEST:
            return {
                loading: true,
            };






        case BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload.bookings,
            };

        case SINGLE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload.booking,
            };



        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };
        case UPDATE_BOOKING_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };


        case BOOKING_FAIL:
        case SINGLE_BOOKING_FAIL:
        case DELETE_BOOKING_FAIL:
        case UPDATE_BOOKING_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };




        case DELETE_BOOKING_RESET:
        case UPDATE_BOOKING_STATUS_RESET:
            return {
                loading: false,
                isDeleted: false,
                isUpdated: false,
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
