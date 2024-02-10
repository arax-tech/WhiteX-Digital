import axios from 'axios'
import {
    LEAD_REQUEST,
    LEAD_SUCCESS,
    LEAD_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/LeadConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetLeadsAction = () => async (dispatch) => {
    try {
        dispatch({ type: LEAD_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/lead`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: LEAD_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: LEAD_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}