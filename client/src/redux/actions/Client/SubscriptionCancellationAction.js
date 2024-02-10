import axios from 'axios'
import {
    SUBSCRIPTION_CANCELLATION_REQUEST,
    SUBSCRIPTION_CANCELLATION_SUCCESS,
    SUBSCRIPTION_CANCELLATION_FAIL,

    CREATE_SUBSCRIPTION_CANCELLATION_REQUEST,
    CREATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    CREATE_SUBSCRIPTION_CANCELLATION_FAIL,

    UPDATE_SUBSCRIPTION_CANCELLATION_REQUEST,
    UPDATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    UPDATE_SUBSCRIPTION_CANCELLATION_FAIL,

    DELETE_SUBSCRIPTION_CANCELLATION_REQUEST,
    DELETE_SUBSCRIPTION_CANCELLATION_SUCCESS,
    DELETE_SUBSCRIPTION_CANCELLATION_FAIL,

    CLEAR_ERRORS,
} from '../../constants/Client/SubscriptionCancellationConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSubscriptionCancellationAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_CANCELLATION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/subscription/cancellation`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SUBSCRIPTION_CANCELLATION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SUBSCRIPTION_CANCELLATION_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateSubscriptionCancellationAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_SUBSCRIPTION_CANCELLATION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/subscription/cancellation/store`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_SUBSCRIPTION_CANCELLATION_FAIL,
            payload: error.response.data
        })
    }
}



export const UpdateSubscriptionCancellationAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBSCRIPTION_CANCELLATION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/subscription/cancellation/update/${id}`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });  


        dispatch({
            type: UPDATE_SUBSCRIPTION_CANCELLATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUBSCRIPTION_CANCELLATION_FAIL,
            payload: error.response.data
        })
    }
}





export const DeleteSubscriptionCancellationAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBSCRIPTION_CANCELLATION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/subscription/cancellation/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_SUBSCRIPTION_CANCELLATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIPTION_CANCELLATION_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}