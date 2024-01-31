import axios from 'axios'
import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/SubscriptionConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSubscriptionAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/subscription`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SUBSCRIPTION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetSingleSubscriptionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/subscription/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}