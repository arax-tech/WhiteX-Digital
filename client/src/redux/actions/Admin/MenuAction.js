import axios from 'axios'
import {
    MENU_REQUEST,
    MENU_SUCCESS,
    MENU_FAIL,

    SINGLE_MENU_REQUEST,
    SINGLE_MENU_SUCCESS,
    SINGLE_MENU_FAIL,

    CREATE_MENU_REQUEST,
    CREATE_MENU_SUCCESS,
    CREATE_MENU_FAIL,

    UPDATE_MENU_REQUEST,
    UPDATE_MENU_SUCCESS,
    UPDATE_MENU_FAIL,

    DELETE_MENU_REQUEST,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/MenuConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetMenusAction = () => async (dispatch) => {
    try {
        dispatch({ type: MENU_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/menu`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: MENU_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: MENU_FAIL,
            payload: error.response.data.message
        })
    }
};



export const GetSingleMenuAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_MENU_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/menu/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_MENU_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_MENU_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateMenuAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_MENU_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/menu/store`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_MENU_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_MENU_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateMenuAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MENU_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/menu/update/${id}`, form, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_MENU_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_MENU_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteMenuAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MENU_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/menu/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_MENU_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_MENU_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}