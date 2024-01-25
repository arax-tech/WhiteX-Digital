import axios from 'axios'
import {
    BANNER_REQUEST,
    BANNER_SUCCESS,
    BANNER_FAIL,

    SINGLE_BANNER_REQUEST,
    SINGLE_BANNER_SUCCESS,
    SINGLE_BANNER_FAIL,

    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_FAIL,

    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,

    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/BannerConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetBannersAction = () => async (dispatch) => {
    try {
        dispatch({ type: BANNER_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/ads`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: BANNER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: BANNER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const SingleBannerAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_BANNER_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/ads/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const CreateBannerAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BANNER_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/ads/store`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateBannerAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BANNER_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.patch(`${BaseURL}/api/admin/ads/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteBannerAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BANNER_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/admin/ads/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}