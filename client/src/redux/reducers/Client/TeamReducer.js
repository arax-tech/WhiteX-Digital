import {
    TEAM_REQUEST,
    TEAM_SUCCESS,
    TEAM_FAIL,

    SINGLE_TEAM_REQUEST,
    SINGLE_TEAM_SUCCESS,
    SINGLE_TEAM_FAIL,

    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_RESET,
    CREATE_TEAM_FAIL,

    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_RESET,
    UPDATE_TEAM_FAIL,

    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_RESET,
    DELETE_TEAM_FAIL,


    CLEAR_ERRORS
} from '../../constants/Client/TeamConstant'


export const TeamReducer = (state = {}, action) => {
    switch (action.type) {
        case TEAM_REQUEST:
        case SINGLE_TEAM_REQUEST:
        case CREATE_TEAM_REQUEST:
        case UPDATE_TEAM_REQUEST:
        case DELETE_TEAM_REQUEST:
            return {
                loading: true,
            };



        case TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                teams: action.payload.teams,
            };
        case SINGLE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                team: action.payload.team,
            };


        case CREATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case TEAM_FAIL:
        case SINGLE_TEAM_FAIL:
        case CREATE_TEAM_FAIL:
        case UPDATE_TEAM_FAIL:
        case DELETE_TEAM_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case CREATE_TEAM_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_TEAM_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_TEAM_RESET:
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
