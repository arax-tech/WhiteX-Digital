import axios from "axios";
import axiosClient from "../axios";

/* ========================= */
//      Auth Actions         //
/* ========================= */
export const GetAuthUser = async ({ commit }, data) => {
    commit('SetAuthUser', [true])
    try {
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.get(`/${role}/profile`);
        commit('SetAuthUser', [false, data])
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const ForgotPasswordAction = async ({ commit }, email) => {
    commit('SetPassword', [true])
    try {
        const { data } = await axiosClient.post('/auth/password/forgot', { email });
        commit('SetPassword', [false, data])
        return data;
    } catch (error) {
        commit('SetPassword', [false])
        return error.response.data;
    }
}
export const ResetPasswordAction = async ({ commit }, { reset_token, password }) => {
    commit('SetPassword', [true])
    try {
        const { data } = await axiosClient.post(`/auth/password/reset/${reset_token}`, { password });
        commit('SetPassword', [false, data])
        return data;
    } catch (error) {
        commit('SetPassword', [false])
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
        localStorage.setItem('role', data.user.role);
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
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.post(`/${role}/update/profile`, formData, {
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
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.post(`/${role}/update/password`, formData);
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
export const RemoveNotification = async ({ commit }, id) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.get(`/admin/notification/remove/${id}`);
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
    commit('SetCustomers', [true])
    try {
        const { data } = await axios.get('https://whitexdigital.com/wp-json/wc/v3/customers', {
            params: {
                role: 'all',
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });
        commit('SetCustomers', [false, data])
        return data;
    } catch (error) {
        commit('SetCustomers', [false])
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
export const GetSubscriptionInvoices = async ({ commit }) => {

    commit('SetSubscriptionInvoices', [true])
    try {

        // Step 1: Retrieve Subscriptions
        const subscriptionsResponse = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
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
                    consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                    consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
                    subscription: subscription.id,
                },
            });
            const subscriptionOrders = subscriptionOrdersResponse.data;

            // Filter out invoice orders (e.g., completed orders)
            const invoiceOrders = subscriptionOrders.filter(order => order.status === 'completed'); // Adjust status as needed

            // Merge invoice orders into the invoices array
            invoices = [...invoices, ...invoiceOrders];
        }

        commit('SetSubscriptionInvoices', [false, invoices])
        return data;
    } catch (error) {
        commit('SetSubscriptionInvoices', [false])
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
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
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
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
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
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.get(`/${role}/subscription/cancellation`);
        commit('SetSubscriptionCancellations', [false, data])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}
export const GetSingleubscriptionCancellation = async ({ commit }, id) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.get(`/${role}/subscription/cancellation/single/${id}`);
        commit('SetSubscriptionCancellations', [false, data])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}
export const CreateSubscriptionCancellations = async ({ commit }, formData) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const { data } = await axiosClient.post('/client/subscription/cancellation/store', formData);
        commit('SetSubscriptionCancellations', [false, data])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}
export const UpdateSubscriptionCancellation = async ({ commit }, { id, formData }) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.post(`/${role}/subscription/cancellation/update/${id}`, formData);
        commit('SetSubscriptionCancellations', [false])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}
export const DeleteSubscriptionCancellations = async ({ commit }, id) => {
    commit('SetSubscriptionCancellations', [true])
    try {
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.get(`/${role}/subscription/cancellation/delete/${id}`);
        commit('SetSubscriptionCancellations', [false])
        return data;
    } catch (error) {
        commit('SetSubscriptionCancellations', [false])
        return error.response.data;
    }
}








/* ============================== */
//         Invoices Actions       //
/* ============================== */
export const GetInvoices = async ({ commit }) => {
    commit('SetInvoices', [true])
    try {
        const role = localStorage.getItem('role').toLowerCase();
        const { data } = await axiosClient.get(`/${role}/invoice`);
        commit('SetInvoices', [false, data])
        return data;
    } catch (error) {
        commit('SetInvoices', [false])
        return error.response.data;
    }
}
export const CreateInvoice = async ({ commit }, formData) => {
    commit('SetInvoices', [true])
    try {
        const { data } = await axiosClient.post('/admin/invoice/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        commit('SetInvoices', [false, data])
        return data;
    } catch (error) {
        commit('SetInvoices', [false])
        return error.response.data;
    }
}
export const SingleInvoice = async ({ commit }, id) => {
    commit('SetInvoices', [true])
    try {
        const { data } = await axiosClient.get(`/admin/invoice/single/${id}`);
        commit('SetInvoices', [false, data])
        return data;
    } catch (error) {
        commit('SetInvoices', [false])
        return error.response.data;
    }
}
export const DeleteInvoice = async ({ commit }, id) => {
    commit('SetInvoices', [true])
    try {
        const { data } = await axiosClient.get(`/admin/invoice/delete/${id}`);
        commit('SetInvoices', [false])
        return data;
    } catch (error) {
        commit('SetInvoices', [false])
        return error.response.data;
    }
}




/* ==================================== */
//         Popup Messages Actions       //
/* ==================================== */
export const GetPopupMessages = async ({ commit }) => {
    commit('SetPopupMessages', [true])
    try {
        const { data } = await axiosClient.get('/admin/popup/message');
        commit('SetPopupMessages', [false, data])
        return data;
    } catch (error) {
        commit('SetPopupMessages', [false])
        return error.response.data;
    }
}
export const CreatePopupMessage = async ({ commit }, formData) => {
    commit('SetPopupMessages', [true])
    try {
        const { data } = await axiosClient.post('/admin/popup/message/store', formData);
        commit('SetPopupMessages', [false, data])
        return data;
    } catch (error) {
        commit('SetPopupMessages', [false])
        return error.response.data;
    }
}
export const UpdatePopupMessage = async ({ commit }, { id, formData }) => {
    commit('SetPopupMessages', [true])
    try {
        const { data } = await axiosClient.post(`/admin/popup/message/update/${id}`, formData);
        commit('SetPopupMessages', [false, data])
        return data;
    } catch (error) {
        commit('SetPopupMessages', [false])
        return error.response.data;
    }
}
export const DeletePopupMessage = async ({ commit }, id) => {
    commit('SetPopupMessages', [true])
    try {
        const { data } = await axiosClient.get(`/admin/popup/message/delete/${id}`);
        commit('SetPopupMessages', [false])
        return data;
    } catch (error) {
        commit('SetPopupMessages', [false])
        return error.response.data;
    }
}







/* ============================= */
//         Leads Actions       //
/* ============================= */
export const GetLeads = async ({ commit }) => {
    commit('SetLeads', [true])
    try {
        const { data } = await axiosClient.get('/admin/lead');
        commit('SetLeads', [false, data.response])
        return data;
    } catch (error) {
        commit('SetLeads', [false])
        return error.response.data;
    }
}



/* ============================== */
//         Supports Actions       //
/* ============================== */
export const GetSupports = async ({ commit }) => {
    commit('SetSupports', [true])
    try {
        const { data } = await axiosClient.get('/admin/support');
        commit('SetSupports', [false, data])
        return data;
    } catch (error) {
        commit('SetSupports', [false])
        return error.response.data;
    }
}
export const GetSingleSupport = async ({ commit }, id) => {
    commit('SetSingleSupport', [true])
    try {
        const { data } = await axiosClient.get(`/admin/support/single/${id}`);
        commit('SetSingleSupport', [false, data])
        return data;
    } catch (error) {
        commit('SetSingleSupport', [false])
        return error.response.data;
    }
}
export const CreateSupportChat = async ({ commit }, { id, formData }) => {
    commit('SetSupports', [true])
    try {
        const { data } = await axiosClient.post(`/admin/support/chat/store/${id}`, formData);
        commit('SetSupports', [false, data])
        return data;
    } catch (error) {
        commit('SetSupports', [false])
        return error.response.data;
    }
}
export const UpdateSupport = async ({ commit }, { id, formData }) => {
    commit('SetSupports', [true])
    try {
        const { data } = await axiosClient.post(`/admin/support/update/${id}`, formData);
        commit('SetSupports', [false, data])
        return data;
    } catch (error) {
        commit('SetSupports', [false])
        return error.response.data;
    }
}
export const DeleteSupport = async ({ commit }, id) => {
    commit('SetSupports', [true])
    try {
        const { data } = await axiosClient.get(`/admin/support/delete/${id}`);
        commit('SetSupports', [false])
        return data;
    } catch (error) {
        commit('SetSupports', [false])
        return error.response.data;
    }
}




/* ============================== */
//         Feedbacks Actions       //
/* ============================== */
export const GetFeedbacks = async ({ commit }) => {
    commit('SetFeedbacks', [true])
    try {
        const { data } = await axiosClient.get('/admin/feedback');
        commit('SetFeedbacks', [false, data])
        return data;
    } catch (error) {
        commit('SetFeedbacks', [false])
        return error.response.data;
    }
}
export const UpdateFeedback = async ({ commit }, { id, formData }) => {
    commit('SetFeedbacks', [true])
    try {
        const { data } = await axiosClient.post(`/admin/feedback/update/${id}`, formData);
        commit('SetFeedbacks', [false, data])
        return data;
    } catch (error) {
        commit('SetFeedbacks', [false])
        return error.response.data;
    }
}
export const DeleteFeedback = async ({ commit }, id) => {
    commit('SetFeedbacks', [true])
    try {
        const { data } = await axiosClient.get(`/admin/feedback/delete/${id}`);
        commit('SetFeedbacks', [false])
        return data;
    } catch (error) {
        commit('SetFeedbacks', [false])
        return error.response.data;
    }
}





/* ====================================== */
//         Custom Solutions Actions       //
/* ====================================== */
export const GetSolutions = async ({ commit }) => {
    commit('SetSolutions', [true])
    try {
        const { data } = await axiosClient.get('/admin/menu');
        commit('SetSolutions', [false, data])
        return data;
    } catch (error) {
        commit('SetSolutions', [false])
        return error.response.data;
    }
}
export const CreateSolution = async ({ commit }, formData) => {
    commit('SetSolutions', [true])
    try {
        const { data } = await axiosClient.post(`/admin/menu/store/`, formData);
        commit('SetSolutions', [false, data])
        return data;
    } catch (error) {
        commit('SetSolutions', [false])
        return error.response.data;
    }
}
export const UpdateSolution = async ({ commit }, { id, formData }) => {
    commit('SetSolutions', [true])
    try {
        const { data } = await axiosClient.post(`/admin/menu/update/${id}`, formData);
        commit('SetSolutions', [false, data])
        return data;
    } catch (error) {
        commit('SetSolutions', [false])
        return error.response.data;
    }
}
export const DeleteSolution = async ({ commit }, id) => {
    commit('SetSolutions', [true])
    try {
        const { data } = await axiosClient.get(`/admin/menu/delete/${id}`);
        commit('SetSolutions', [false])
        return data;
    } catch (error) {
        commit('SetSolutions', [false])
        return error.response.data;
    }
}






//        Client Actions

/* =========================== */
//        Teams Actions       //
/* =========================== */
export const GetTeams = async ({ commit }) => {
    commit('SetTeams', [true])
    try {
        const { data } = await axiosClient.get('/client/team');
        commit('SetTeams', [false, data])
        return data;
    } catch (error) {
        commit('SetTeams', [false])
        return error.response.data;
    }
}
export const CreateTeamAction = async ({ commit }, formData) => {
    commit('SetTeams', [true])
    try {
        const { data } = await axiosClient.post('/client/team/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        commit('SetTeams', [false, data])
        return data;
    } catch (error) {
        commit('SetTeams', [false])
        return error.response.data;
    }
}
export const GetSingleTeamAction = async ({ commit }, id) => {
    commit('SetTeams', [true])
    try {
        const { data } = await axiosClient.get(`/client/team/single/${id}`);
        commit('SetTeams', [false, data])
        return data;
    } catch (error) {
        commit('SetTeams', [false])
        return error.response.data;
    }
}
export const UpdateTeamAction = async ({ commit }, { id, formData }) => {
    commit('SetTeams', [true])
    try {
        const { data } = await axiosClient.post(`/client/team/update/${id}`, formData);
        commit('SetTeams', [false])
        return data;
    } catch (error) {
        commit('SetTeams', [false])
        return error.response.data;
    }
}
export const DeleteTeamAction = async ({ commit }, id) => {
    commit('SetTeams', [true])
    try {
        const { data } = await axiosClient.get(`/client/team/delete/${id}`);
        commit('SetTeams', [false])
        return data;
    } catch (error) {
        commit('SetTeams', [false])
        return error.response.data;
    }
}





/* ================================== */
//        Subscription Actions       //
/* ================================== */
export const GetSubscription = async ({ commit }, customer_id) => {
    commit('SetSubscription', [true])
    try {

        // Get All Subscriptions
        const response = await axios.get('https://whitexdigital.com/wp-json/wc/v3/subscriptions', {
            params: {
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });

        const subscriptions = response.data;
        const customerSubscription = subscriptions.find(subscription => subscription.customer_id === customer_id);
        commit('SetSubscription', [false, customerSubscription])
        return data;
    } catch (error) {
        commit('SetSubscription', [false])
        return error;
    }
}






/* ================================== */
//           Billing Actions          //
/* ================================== */
export const GetClientBilling = async ({ commit }, customer_id) => {
    commit('SetClientBilling', [true])
    try {

        const userResponse = await axios.get(`https://whitexdigital.com/wp-json/wc/v3/customers/${customer_id}`, {
            params: {
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });
        commit('SetClientBilling', [false, userResponse?.data])
        return data;
    } catch (error) {
        commit('SetClientBilling', [false])
        return error;
    }
}
export const UpdateBillingAction = async ({ commit }, { customer_id, billing }) => {
    commit('SetClientBilling', [true])
    try {
        const response = await axios.put(`https://whitexdigital.com/wp-json/wc/v3/customers/${customer_id}`, { billing }, {
            params: {
                consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
                consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
            },
        });
        commit('SetClientBilling', [false, response])
        return response;
    } catch (error) {
        commit('SetClientBilling', [false])
        return error.response.data;
    }
}