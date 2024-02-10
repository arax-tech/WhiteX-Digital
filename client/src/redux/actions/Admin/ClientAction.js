import axios from 'axios'
import {
    CLIENT_REQUEST,
    CLIENT_SUCCESS,
    CLIENT_FAIL,

    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS,
    CUSTOMER_FAIL,


    SINGLE_CLIENT_REQUEST,
    SINGLE_CLIENT_SUCCESS,
    SINGLE_CLIENT_FAIL,

    CREATE_CLIENT_REQUEST,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAIL,

    UPDATE_CLIENT_REQUEST,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,

    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/ClientConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetClientsAction = () => async (dispatch) => {
    try {
        dispatch({ type: CLIENT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/client`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: CLIENT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CLIENT_FAIL,
            payload: error.response.data.message
        })
    }
};


export const GetCustomersAction = () => async (dispatch) => {
    try {
        dispatch({ type: CUSTOMER_REQUEST });
        const { data } = await axios.get(
            'https://whitexdigital.com/wp-json/wc/v3/customers',
            {
                params: {
                    role:'all',
                    consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                    consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                },
            }
        );
        dispatch({
            type: CUSTOMER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CUSTOMER_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetSingleClientAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_CLIENT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/client/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_CLIENT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_CLIENT_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateClientAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CLIENT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/client/store`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_CLIENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_CLIENT_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateClientAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CLIENT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/client/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_CLIENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CLIENT_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteClientAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CLIENT_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/client/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_CLIENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_CLIENT_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}