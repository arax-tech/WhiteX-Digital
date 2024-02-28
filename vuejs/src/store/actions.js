import axios from "axios"; 
import axiosClient from "../axios";

/* ========================= */
//      Auth Actions         //
/* ========================= */
export const GetAuthUser = async ({ commit }, data) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.get('/admin/profile');
        commit('SetAuthUser', [false, data])
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const LoginAction = async ({ commit }, formData) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/auth/login', formData);
        commit('SetAuthUser', [false])

        return data;
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const VerifyOTPAction = async ({ commit }, otp) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/auth/verify-otp', { otp });
        commit('SetAuthUser', [false, data.user])
        commit('SetToken', data.token)
        return data;
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const LogoutAction = async ({ commit }) => {
    try {
        const { data } = await axiosClient.get('/auth/logout');
        commit('SetToken', null)
        return data;
    } catch (error) {
        return error.response.data;
    }
}
export const UpdateProfileAction = async ({ commit }, formData) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/admin/update/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        commit('SetAuthUser', [false, data])
        return data;
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const UpdatePasswordAction = async ({ commit }, formData) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/admin/update/password', formData);
        commit('SetAuthUser', [false])
        return data;
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const UpdateSettingAction = async ({ commit }, formData) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/admin/update/setting', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        commit('SetAuthUser', [false])
        return data;
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}




/* =========================== */
//        Admins Actions       //
/* =========================== */
export const GetAdmins = async ({ commit }) => {
    commit('SetAdmins', [true])
    try {
        const { data } = await axiosClient.get('/admin/admins');
        commit('SetAdmins', [false, data])
        return data;
    } catch (error) {
        commit('SetAdmins', [false])
        return error.response.data;
    }
}
export const CreateAdminAction = async ({ commit }, formData) => {
    commit('SetAdmins', [true])
    try {
        const { data } = await axiosClient.post('/admin/admins/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        commit('SetAdmins', [false, data])
        return data;
    } catch (error) {
        commit('SetAdmins', [false])
        return error.response.data;
    }
}
export const GetSingleAdminAction = async ({ commit }, id) => {
    commit('SetAdmins', [true])
    try {
        const { data } = await axiosClient.get(`/admin/admins/single/${id}`);
        commit('SetAdmins', [false, data])
        return data;
    } catch (error) {
        commit('SetAdmins', [false])
        return error.response.data;
    }
}
export const UpdateAdminAction = async ({ commit }, { id, formData }) => {
    console.log(formData);
    commit('SetAdmins', [true])
    try {
        const { data } = await axiosClient.post(`/admin/admins/update/${id}`, formData);
        commit('SetAdmins', [false])
        return data;
    } catch (error) {
        commit('SetAdmins', [false])
        return error.response.data;
    }
}
export const DeleteAdminAction = async ({ commit }, id) => {
    commit('SetAdmins', [true])
    try {
        const { data } = await axiosClient.get(`/admin/admins/delete/${id}`);
        commit('SetAdmins', [false])
        return data;
    } catch (error) {
        commit('SetAdmins', [false])
        return error.response.data;
    }
}





/* =========================== */
//        Client Actions       //
/* =========================== */
export const GetClients = async ({ commit }) => {
    commit('SetClients', [true])
    try {
        const { data } = await axiosClient.get('/admin/client');
        commit('SetClients', [false, data])
        return data;
    } catch (error) {
        commit('SetClients', [false])
        return error.response.data;
    }
}
export const GetCustomers = async ({ commit }) => {
    commit('SetClients', [true])
    try {
        const { data } = await axios.get('https://whitexdigital.com/wp-json/wc/v3/customers', {
            params: {
                role: 'all',
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });
        commit('SetClients', [false, data])
        return data;
    } catch (error) {
        commit('SetClients', [false])
        return error.response.data;
    }
}
export const CreateClientAction = async ({ commit }, formData) => {
    commit('SetClients', [true])
    try {
        const { data } = await axiosClient.post('/admin/client/store', formData);
        commit('SetClients', [false, data])
        return data;
    } catch (error) {
        commit('SetClients', [false])
        return error.response.data;
    }
}

export const DeleteClientAction = async ({ commit }, id) => {
    commit('SetClients', [true])
    try {
        const { data } = await axiosClient.get(`/admin/client/delete/${id}`);
        commit('SetClients', [false])
        return data;
    } catch (error) {
        commit('SetClients', [false])
        return error.response.data;
    }
}








/* ================================= */
//        Subscription Actions       //
/* ================================= */
export const GetSubscriptions = async ({ commit }) => {

    commit('SetSubscriptions', [true])
    try {
        // const { data } = await axiosClient.get('/admin/client');
        const response = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });

        const subscriptions = response.data;


        // Get all subscription with customer and with subscription orders
        const subscriptionsWithDetails = await Promise.all(
            subscriptions.map(async (subscription) => {
                const GetUserDetails = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/customers/${subscription.customer_id}`, {
                    params: {
                        consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                        consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
                    },
                });

                const user = GetUserDetails.data;

                const GetSubscriptionOrders = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/orders`, {
                    params: {
                        consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                        consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
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
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
                type: 'subscription',
            },
        });

        const subscriptionProducts = SubscriptionProducts.data;

        const finalResponse = { subscriptionsWithDetails, subscriptionProducts };

        
        // console.log(finalResponse)


        commit('SetSubscriptions', [false, finalResponse])
        return data;
    } catch (error) {
        commit('SetSubscriptions', [false])
        return error;
    }
}

export const UpdateSubscriptionAction = async ({ commit }, payload) => {
    const { subscriptionId, planId } = payload;
    // console.log(subscriptionId, planId)
    commit('SetSubscriptions', [true])
    try {
        // Step 1: Retrieve Subscription Details to get the item ID
        const subscriptionResponse = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/subscriptions/${subscriptionId}`, {
            params: {
                consumer_key:  import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret:  import.meta.env.VITE_WC_CONSUMER_SECRET,
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
                consumer_key:  import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret:  import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });

        commit('SetSubscriptions', [false, data])
        return data;
    } catch (error) {
        commit('SetSubscriptions', [false])
        return error.response.data;
    }
}





/* ======================================================= */
//        Subscription Cancellation Requests Actions       //
/* ======================================================= */
export const GetSubscriptionCancellations = async ({ commit }) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const { data } = await axiosClient.get('/admin/subscription/cancellation');
        commit('SetSubscriptionCancellations', [false, data])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}

export const DeleteSubscriptionCancellations = async ({ commit }, id) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const { data } = await axiosClient.get(`/admin/subscription/cancellation/delete/${id}`);
        commit('SetSubscriptionCancellations', [false])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}


export const UpdateSubscriptionCancellation = async ({ commit }, { id, formData }) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const { data } = await axiosClient.post(`/admin/subscription/cancellation/update/${id}`, formData);
        commit('SetSubscriptionCancellations', [false])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}
