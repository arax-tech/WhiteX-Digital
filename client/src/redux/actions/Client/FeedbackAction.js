import axios from 'axios'
import {
    FEEDBACK_REQUEST,
    FEEDBACK_SUCCESS,
    FEEDBACK_FAIL,

    SINGLE_FEEDBACK_REQUEST,
    SINGLE_FEEDBACK_SUCCESS,
    SINGLE_FEEDBACK_FAIL,

    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAIL,

    UPDATE_FEEDBACK_REQUEST,
    UPDATE_FEEDBACK_SUCCESS,
    UPDATE_FEEDBACK_FAIL,

    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/FeedbackConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetFeedbacksAction = () => async (dispatch) => {
    try {
        dispatch({ type: FEEDBACK_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/feedback`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: FEEDBACK_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FEEDBACK_FAIL,
            payload: error.response.data.message
        })
    }
};



export const GetSingleFeedbackAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_FEEDBACK_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/feedback/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_FEEDBACK_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_FEEDBACK_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateFeedbackAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_FEEDBACK_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/feedback/store`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_FEEDBACK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_FEEDBACK_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateFeedbackAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FEEDBACK_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/feedback/update/${id}`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_FEEDBACK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_FEEDBACK_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteFeedbackAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FEEDBACK_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/feedback/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_FEEDBACK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_FEEDBACK_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}