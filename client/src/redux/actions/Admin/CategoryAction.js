import axios from 'axios'
import {
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAIL,

    SINGLE_CATEGORY_REQUEST,
    SINGLE_CATEGORY_SUCCESS,
    SINGLE_CATEGORY_FAIL,

    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/CategroyConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/category`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const SingleCategoryAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_CATEGORY_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/category/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}


export const CreateCategoryAction = (name) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        const bodyParameters = {
            name: name,
        };
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/category/store`, bodyParameters, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}

export const UpdateCategoryAction = (id, name) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const bodyParameters = {
            name: name,
        };

        const token = localStorage.getItem('token');
        const { data } = await axios.patch(`${BaseURL}/api/admin/category/update/${id}`, bodyParameters, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}





export const DeleteCategoryAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/admin/category/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}