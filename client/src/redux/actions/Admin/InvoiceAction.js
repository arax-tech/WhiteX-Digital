import axios from 'axios'
import {
    INVOICE_REQUEST,
    INVOICE_SUCCESS,
    INVOICE_FAIL,

    SINGLE_INVOICE_REQUEST,
    SINGLE_INVOICE_SUCCESS,
    SINGLE_INVOICE_FAIL,

    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL,

    UPDATE_INVOICE_REQUEST,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAIL,

    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/InvoiceConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetInvoicesAction = () => async (dispatch) => {
    try {
        dispatch({ type: INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/invoice`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: INVOICE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetSingleInvoiceAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const role = localStorage.getItem("role");
        const { data } = await axios.get(`${BaseURL}/api/${role}/invoice/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_INVOICE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateInvoiceAction = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/invoice/store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_INVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_INVOICE_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateInvoiceAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/admin/invoice/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_INVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_INVOICE_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteInvoiceAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/invoice/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_INVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_INVOICE_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}