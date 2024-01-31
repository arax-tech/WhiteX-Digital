import axios from 'axios'
import {
    ADMINS_REQUEST,
    ADMINS_SUCCESS,
    ADMINS_FAIL,

    SINGLE_ADMINS_REQUEST,
    SINGLE_ADMINS_SUCCESS,
    SINGLE_ADMINS_FAIL,

    CREATE_ADMINS_REQUEST,
    CREATE_ADMINS_SUCCESS,
    CREATE_ADMINS_FAIL,

    UPDATE_ADMINS_REQUEST,
    UPDATE_ADMINS_SUCCESS,
    UPDATE_ADMINS_FAIL,

    DELETE_ADMINS_REQUEST,
    DELETE_ADMINS_SUCCESS,
    DELETE_ADMINS_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/AdminsConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetAdminsAction = () => async (dispatch) => {
    try {
        dispatch({ type: ADMINS_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/admins`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: ADMINS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ADMINS_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetSingleAdminsAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ADMINS_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/admins/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_ADMINS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_ADMINS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateAdminAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADMINS_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/admins/store`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_ADMINS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ADMINS_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateAdminAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADMINS_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/admins/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_ADMINS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ADMINS_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ADMINS_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/admins/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_ADMINS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_ADMINS_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}