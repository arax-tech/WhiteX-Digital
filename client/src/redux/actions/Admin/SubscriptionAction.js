import axios from 'axios'
import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS,
    SUBSCRIPTION_FAIL,

    SINGLE_SUBSCRIPTION_REQUEST,
    SINGLE_SUBSCRIPTION_SUCCESS,
    SINGLE_SUBSCRIPTION_FAIL,

    UPDATE_SUBSCRIPTION_REQUEST,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_FAIL,

    SUBSCRIPTION_INVOICE_REQUEST,
    SUBSCRIPTION_INVOICE_SUCCESS,
    SUBSCRIPTION_INVOICE_FAIL,

    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/SubscriptionConstant'
import { BaseURL } from '../../constants/BaseURL';

export const GetSubscriptionAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_REQUEST });


       // Get All Subscriptions
        const response = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });

        const subscriptions = response.data;


        // Get all subscription with customer and with subscription orders
        const subscriptionsWithDetails = await Promise.all(
            subscriptions.map(async (subscription) => {
                const GetUserDetails = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/customers/${subscription.customer_id}`, {
                    params: {
                        consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                        consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                    },
                });

                const user = GetUserDetails.data;

                const GetSubscriptionOrders = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/orders`, {
                    params: {
                        consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                        consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                        subscription: subscription.id,
                    },
                });

                const orders = GetSubscriptionOrders.data;

                return { ...subscription, user, orders };
            })
        );

        // Get All Subscriptions Products
        const SubscriptionProducts = await axios.get('https://whitexdigital.com/wp-json/wc/v3/products', {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                type: 'subscription',
            },
        });

        const subscriptionProducts = SubscriptionProducts.data;

        const finalResponse = { subscriptionsWithDetails, subscriptionProducts };
 
        

        
        console.log(finalResponse)

        dispatch({
            type: SUBSCRIPTION_SUCCESS,
            payload: finalResponse
        })
    }
    catch (error) {
        dispatch({
            type: SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};

export const GetSubscriptionInvoicesAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUBSCRIPTION_INVOICE_REQUEST });
        // Step 1: Retrieve Subscriptions
        const subscriptionsResponse = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                per_page: 100, // Adjust per_page as needed
            },
        });
        const subscriptions = subscriptionsResponse.data;



        // Step 2: Retrieve Orders (Invoices)
        let invoices = [];
        for (const subscription of subscriptions) {
            // Fetch orders associated with the subscription
            const subscriptionOrdersResponse = await axios.get('https://whitexdigital.com/wp-json/wc/v3/orders', {
                params: {
                    consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                    consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
                    subscription: subscription.id,
                },
            });
            const subscriptionOrders = subscriptionOrdersResponse.data;

            // Filter out invoice orders (e.g., completed orders)
            const invoiceOrders = subscriptionOrders.filter(order => order.status === 'completed'); // Adjust status as needed

            // Merge invoice orders into the invoices array
            invoices = [...invoices, ...invoiceOrders];
        }

 
        

        console.log(invoices);
        dispatch({
            type: SUBSCRIPTION_INVOICE_SUCCESS,
            payload: invoices
        })
    }
    catch (error) {
        dispatch({
            type: SUBSCRIPTION_INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const GetSingleSubscriptionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/subscription/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: SINGLE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SINGLE_SUBSCRIPTION_FAIL,
            payload: error.response.data.message
        })
    }
};

export const UpdateSubscriptionAction = (subscriptionId, planId) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });

        // Step 1: Retrieve Subscription Details to get the item ID
        const subscriptionResponse = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/subscriptions/${subscriptionId}`, {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });

        const subscription = subscriptionResponse.data;

        // Get the item ID from the subscription
        const itemId = subscription.line_items[0].id;

        // Step 2: Modify Subscription Details with the correct item ID
        const updatedSubscription = {
            line_items: [{
                id: itemId, // Use the correct item ID
                product_id: planId, // Update with the new product ID
            }],
        };

        // Step 3: Update Subscription
        const { data } = await axios.put(`https://whitexdigital.com/wp-json/wc/v3/subscriptions/${subscriptionId}`, updatedSubscription, {
            params: {
                consumer_key: process.env.REACT_APP_WC_CONSUMER_KEY,
                consumer_secret: process.env.REACT_APP_WC_CONSUMER_SECRET,
            },
        });

        dispatch({
            type: UPDATE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUBSCRIPTION_FAIL,
            payload: error.response.data
        })
    }
}


export const DeleteSubscriptionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${BaseURL}/api/admin/subscription/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: DELETE_SUBSCRIPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIPTION_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}