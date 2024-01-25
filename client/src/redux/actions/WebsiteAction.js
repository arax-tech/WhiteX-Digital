import axios from 'axios'
import {
    WEBSITE_PACKAGE_REQUEST,
    WEBSITE_PACKAGE_SUCCESS,
    WEBSITE_PACKAGE_FAIL,

    WEBSITE_SINGLE_PACKAGE_REQUEST,
    WEBSITE_SINGLE_PACKAGE_SUCCESS,
    WEBSITE_SINGLE_PACKAGE_FAIL,

    CLEAR_ERRORS
} from '../constants/WebsiteConstant'
import { BaseURL } from '../constants/BaseURL';



export const GetWebsitePackagesAction = () => async (dispatch) => {
    try {
        dispatch({ type: WEBSITE_PACKAGE_REQUEST });
        const { data } = await axios.get(`${BaseURL}/api/website/packages`);
        dispatch({
            type: WEBSITE_PACKAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: WEBSITE_PACKAGE_FAIL,
            payload: error.response.data.message
        })
    }
};


export const WebsiteSinglePackageAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: WEBSITE_SINGLE_PACKAGE_REQUEST });
        const { data } = await axios.get(`${BaseURL}/api/website/package/${id}`);
        dispatch({
            type: WEBSITE_SINGLE_PACKAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: WEBSITE_SINGLE_PACKAGE_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}