import axios from 'axios'
import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,

    STATUS_USER_REQUEST,
    STATUS_USER_SUCCESS,
    STATUS_USER_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/UserConstant'
import { BaseURL } from '../../constants/BaseURL';

export const getAdminUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: USER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: USER_FAIL,
            payload: error.response.data.message
        })
    }
};


export const UpdateUserStatusAction = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: STATUS_USER_REQUEST });

        const token = localStorage.getItem('token');
        
        const bodyParameters = {
            status: status,
        };


        const { data } = await axios.patch(`${BaseURL}/api/admin/user/status/${id}`, bodyParameters, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: STATUS_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: STATUS_USER_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/admin/user/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}