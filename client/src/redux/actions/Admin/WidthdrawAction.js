import axios from 'axios'
import {
    WIDTHDRAW_REQUEST,
    WIDTHDRAW_SUCCESS,
    WIDTHDRAW_FAIL,

    UPDATE_WIDTHDRAW_REQUEST,
    UPDATE_WIDTHDRAW_SUCCESS,
    UPDATE_WIDTHDRAW_FAIL,

    DELETE_WIDTHDRAW_REQUEST,
    DELETE_WIDTHDRAW_SUCCESS,
    DELETE_WIDTHDRAW_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/WidthdrawConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetWidthdrawAction = () => async (dispatch) => {
    try {
        dispatch({ type: WIDTHDRAW_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/widthdraw`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: WIDTHDRAW_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: WIDTHDRAW_FAIL,
            payload: error.response.data.message
        })
    }
};






export const UpdateWidthdrawStatusAction = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_WIDTHDRAW_REQUEST });

        const token = localStorage.getItem('token');

        const bodyParameters = {
            status: status,
        };

        const { data } = await axios.patch(`${BaseURL}/api/admin/widthdraw/update/${id}`,bodyParameters, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_WIDTHDRAW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_WIDTHDRAW_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteWidthdrawAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_WIDTHDRAW_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/admin/widthdraw/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_WIDTHDRAW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_WIDTHDRAW_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}