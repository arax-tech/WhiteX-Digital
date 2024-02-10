import {
    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAIL,
    UPDATE_SETTING_RESET,

    CLEAR_ERRORS,
} from '../../constants/Admin/SettingConstant'


export const SettingReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SETTING_REQUEST:
            return {
                loading: true,
            };


        case UPDATE_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };

        case UPDATE_SETTING_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
            };



        case UPDATE_SETTING_RESET:
            return {
                loading: false,
                isUpdated: false,
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
