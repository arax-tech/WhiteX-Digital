import axios from 'axios'
import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,

    UPDATE_SUBSCRIPTION_REQUEST,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_FAIL,

    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/SubscriptionConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSubscriptionAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/subscription`, {
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
        const { data } = await axios.get(`${BaseURL}/api/admin/subscription/single/${id}`, {
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

export const UpdateSubscriptionAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/subscription/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUBSCRIPTION_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteSubscriptionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/subscription/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIPTION_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}