import {
    FEEDBACK_REQUEST,
    FEEDBACK_SUCCESS,
    FEEDBACK_FAIL,

    SINGLE_FEEDBACK_REQUEST,
    SINGLE_FEEDBACK_SUCCESS,
    SINGLE_FEEDBACK_FAIL,

    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_RESET,
    CREATE_FEEDBACK_FAIL,

    UPDATE_FEEDBACK_REQUEST,
    UPDATE_FEEDBACK_SUCCESS,
    UPDATE_FEEDBACK_RESET,
    UPDATE_FEEDBACK_FAIL,

    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_RESET,
    DELETE_FEEDBACK_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/FeedbackConstant'


export const AdminFeedbackReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEDBACK_REQUEST:
        case SINGLE_FEEDBACK_REQUEST:
        case CREATE_FEEDBACK_REQUEST:
        case UPDATE_FEEDBACK_REQUEST:
        case DELETE_FEEDBACK_REQUEST:
            return {
                loading: true,
            };



        case FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                feedbacks: action.payload.feedbacks,
            };
     
        case SINGLE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                feedback: action.payload.feedback,
            };


        case CREATE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case FEEDBACK_FAIL:
        case SINGLE_FEEDBACK_FAIL:
        case CREATE_FEEDBACK_FAIL:
        case UPDATE_FEEDBACK_FAIL:
        case DELETE_FEEDBACK_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_FEEDBACK_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_FEEDBACK_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_FEEDBACK_RESET:
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
