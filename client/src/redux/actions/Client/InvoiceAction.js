import axios from 'axios'
import {
    INVOICE_REQUEST,
    INVOICE_SUCCESS,
    INVOICE_FAIL,

    WOOCOMMERCE_INVOICE_REQUEST,
    WOOCOMMERCE_INVOICE_SUCCESS,
    WOOCOMMERCE_INVOICE_FAIL,

    SINGLE_INVOICE_REQUEST,
    SINGLE_INVOICE_SUCCESS,
    SINGLE_INVOICE_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/InvoiceConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetInvoicesAction = () => async (dispatch) => {
    try {
        dispatch({ type: INVOICE_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/invoice`, {
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

export const GetWooComInvoicesAction = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: WOOCOMMERCE_INVOICE_REQUEST });
        const { data } = await axios.get('https://whitexdigital.com/wp-json/wc/v3/orders', {
            params: {
                customer: customer_id, // Filter orders by customer ID
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });
        console.log(data);
        dispatch({
            type: WOOCOMMERCE_INVOICE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: WOOCOMMERCE_INVOICE_FAIL,
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

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}