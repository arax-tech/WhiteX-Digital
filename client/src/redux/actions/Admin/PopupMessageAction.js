import axios from 'axios'
import {
    POPUP_MESSAGE_REQUEST,
    POPUP_MESSAGE_SUCCESS,
    POPUP_MESSAGE_FAIL,

    SINGLE_POPUP_MESSAGE_REQUEST,
    SINGLE_POPUP_MESSAGE_SUCCESS,
    SINGLE_POPUP_MESSAGE_FAIL,

    CREATE_POPUP_MESSAGE_REQUEST,
    CREATE_POPUP_MESSAGE_SUCCESS,
    CREATE_POPUP_MESSAGE_FAIL,

    UPDATE_POPUP_MESSAGE_REQUEST,
    UPDATE_POPUP_MESSAGE_SUCCESS,
    UPDATE_POPUP_MESSAGE_FAIL,

    DELETE_POPUP_MESSAGE_REQUEST,
    DELETE_POPUP_MESSAGE_SUCCESS,
    DELETE_POPUP_MESSAGE_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/PopupMessageConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetPopupMessagesAction = () => async (dispatch) => {
    try {
        dispatch({ type: POPUP_MESSAGE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/popup/message`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: POPUP_MESSAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: POPUP_MESSAGE_FAIL,
            payload: error.response.data.message
        })
    }
};



export const GetSinglePopupMessageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_POPUP_MESSAGE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/popup/message/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_POPUP_MESSAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_POPUP_MESSAGE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreatePopupMessageAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_POPUP_MESSAGE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/popup/message/store`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_POPUP_MESSAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_POPUP_MESSAGE_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdatePopupMessageAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_POPUP_MESSAGE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/popup/message/update/${id}`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_POPUP_MESSAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_POPUP_MESSAGE_FAIL,
            payload: error.response.data
        })
    }
}


export const DeletePopupMessageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_POPUP_MESSAGE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/popup/message/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_POPUP_MESSAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_POPUP_MESSAGE_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}