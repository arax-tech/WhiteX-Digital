import {
    MENU_REQUEST,
    MENU_SUCCESS,
    MENU_FAIL,

    SINGLE_MENU_REQUEST,
    SINGLE_MENU_SUCCESS,
    SINGLE_MENU_FAIL,

    CREATE_MENU_REQUEST,
    CREATE_MENU_SUCCESS,
    CREATE_MENU_RESET,
    CREATE_MENU_FAIL,

    UPDATE_MENU_REQUEST,
    UPDATE_MENU_SUCCESS,
    UPDATE_MENU_RESET,
    UPDATE_MENU_FAIL,

    DELETE_MENU_REQUEST,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_RESET,
    DELETE_MENU_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/MenuConstant'


export const AdminMenuReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_REQUEST:
        case SINGLE_MENU_REQUEST:
        case CREATE_MENU_REQUEST:
        case UPDATE_MENU_REQUEST:
        case DELETE_MENU_REQUEST:
            return {
                loading: true,
            };



        case MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menus: action.payload.menus,
            };
     
        case SINGLE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menu: action.payload.menu,
            };


        case CREATE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case MENU_FAIL:
        case SINGLE_MENU_FAIL:
        case CREATE_MENU_FAIL:
        case UPDATE_MENU_FAIL:
        case DELETE_MENU_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_MENU_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_MENU_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_MENU_RESET:
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
