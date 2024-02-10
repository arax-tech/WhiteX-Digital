import axios from 'axios'
import {
    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAIL,

    CLEAR_ERRORS,
} from '../../constants/Admin/SettingConstant'
import { BaseURL } from '../../constants/BaseURL';

export const SettingUpdateAction = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        dispatch({ type: UPDATE_SETTING_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/update/setting`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_SETTING_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_FAIL,
            payload: error.message,
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}