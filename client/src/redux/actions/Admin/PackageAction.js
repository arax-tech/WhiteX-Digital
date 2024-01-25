import axios from 'axios'
import {
    PACKAGE_REQUEST,
    PACKAGE_SUCCESS,
    PACKAGE_FAIL,

    SINGLE_PACKAGE_REQUEST,
    SINGLE_PACKAGE_SUCCESS,
    SINGLE_PACKAGE_FAIL,

    CREATE_PACKAGE_REQUEST,
    CREATE_PACKAGE_SUCCESS,
    CREATE_PACKAGE_FAIL,

    UPDATE_PACKAGE_REQUEST,
    UPDATE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_FAIL,

    DELETE_PACKAGE_REQUEST,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/PackageConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetPackagesAction = () => async (dispatch) => {
    try {
        dispatch({ type: PACKAGE_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/package`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: PACKAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PACKAGE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const SinglePackageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PACKAGE_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/package/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_PACKAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PACKAGE_FAIL,
            payload: error.response.data
        })
    }
}


export const CreatePackageAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PACKAGE_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/${role}/package/store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: CREATE_PACKAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_PACKAGE_FAIL,
            payload: error.message,
        })

    }
}


export const UpdatePackageAction = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PACKAGE_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.patch(`${BaseURL}/api/${role}/package/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_PACKAGE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PACKAGE_FAIL,
            payload: error.message,
        })

    }
}




export const DeletePackageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PACKAGE_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/${role}/package/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_PACKAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_PACKAGE_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}