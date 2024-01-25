import axios from 'axios'
import {
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAIL,

    SINGLE_BOOKING_REQUEST,
    SINGLE_BOOKING_SUCCESS,
    SINGLE_BOOKING_FAIL,

    UPDATE_BOOKING_STATUS_REQUEST,
    UPDATE_BOOKING_STATUS_SUCCESS,
    UPDATE_BOOKING_STATUS_FAIL,

    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/BookingConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetBookingsAction = () => async (dispatch) => {
    try {
        dispatch({ type: BOOKING_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/booking`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: BOOKING_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
};

export const SingleBookingAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_BOOKING_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/${role}/booking/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_BOOKING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_BOOKING_FAIL,
            payload: error.response.data
        })
    }
}

export const UpdateBookingStatusAction = (id, status, remarks) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BOOKING_STATUS_REQUEST });

        const formData = {
            status: status,
            remarks: remarks,
        }

        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.patch(`${BaseURL}/api/${role}/booking/update/status/${id}`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: UPDATE_BOOKING_STATUS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BOOKING_STATUS_FAIL,
            payload: error.message,
        })

    }
}

export const DeleteBookingAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BOOKING_REQUEST });
        const role = localStorage.getItem("role");
        const token = localStorage.getItem('token');
        const { data } = await axios.delete(`${BaseURL}/api/${role}/booking/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_BOOKING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_BOOKING_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}