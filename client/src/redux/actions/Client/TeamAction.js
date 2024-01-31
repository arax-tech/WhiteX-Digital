import axios from 'axios'
import {
    TEAM_REQUEST,
    TEAM_SUCCESS,
    TEAM_FAIL,

    SINGLE_TEAM_REQUEST,
    SINGLE_TEAM_SUCCESS,
    SINGLE_TEAM_FAIL,

    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,

    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,

    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,

    CLEAR_ERRORS
} from '../../constants/Client/TeamConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetTeamAction = () => async (dispatch) => {
    try {
        dispatch({ type: TEAM_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/team`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: TEAM_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: TEAM_FAIL,
            payload: error.response.data.message
        })
    }
};
export const GetSingleTeamAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_TEAM_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/team/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_TEAM_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_TEAM_FAIL,
            payload: error.response.data.message
        })
    }
};

export const CreateTeamAction = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_TEAM_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/team/store`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });


        dispatch({
            type: CREATE_TEAM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_TEAM_FAIL,
            payload: error.response.data
        })
    }
}


export const UpdateTeamAction = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TEAM_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BaseURL}/api/client/team/update/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: UPDATE_TEAM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_TEAM_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteTeamAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TEAM_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/client/team/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_TEAM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_TEAM_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}