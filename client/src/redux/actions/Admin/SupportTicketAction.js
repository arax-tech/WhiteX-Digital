import axios from 'axios'
import {
    SUPPORT_REQUEST,
    SUPPORT_SUCCESS,
    SUPPORT_FAIL,

    SINGLE_SUPPORT_REQUEST,
    SINGLE_SUPPORT_SUCCESS,
    SINGLE_SUPPORT_FAIL,

    SUPPORT_CHAT_REQUEST,
    SUPPORT_CHAT_SUCCESS,
    SUPPORT_CHAT_FAIL,

    CREATE_SUPPORT_REQUEST,
    CREATE_SUPPORT_SUCCESS,
    CREATE_SUPPORT_FAIL,

    UPDATE_SUPPORT_REQUEST,
    UPDATE_SUPPORT_SUCCESS,
    UPDATE_SUPPORT_FAIL,

    DELETE_SUPPORT_REQUEST,
    DELETE_SUPPORT_SUCCESS,
    DELETE_SUPPORT_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/SupportTicketConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSupportTicketsAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUPPORT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/support`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SUPPORT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SUPPORT_FAIL,
            payload: error.response.data.message
        })
    }
};



export const GetSingleSupportTicketAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SUPPORT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/support/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_SUPPORT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_SUPPORT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateSupportTicketAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_SUPPORT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/support/store`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_SUPPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_SUPPORT_FAIL,
            payload: error.response.data
        })
    }
}

export const CreateSupportChatAction = (id, content) => async (dispatch) => {
    try {
        dispatch({ type: SUPPORT_CHAT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/support/chat/store/${id}`, { content },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );


        dispatch({
            type: SUPPORT_CHAT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SUPPORT_CHAT_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateSupportTicketAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUPPORT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/support/update/${id}`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_SUPPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUPPORT_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteSupportTicketAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUPPORT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/support/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_SUPPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SUPPORT_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}