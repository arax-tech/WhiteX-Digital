export const SetAuthUser = (state, [loading, data = null]) => {
    if (data) {
        state.auth = {
            ...state.auth,
            user: data.user,
            notifications: data.notifications,
            setting: data.setting,
            menus: data.menus,
        }
    }
    state.auth.loading = loading;
}
export const SetToken = (state, token) => {
    localStorage.setItem('token', token);
    state.auth.token = token;
}



export const SetAdmins = (state, [loading, data = null]) => {
    if (data) {
        state.admins = {
            ...state.admins,
            admins: data.admins,
            admin: data.admin,
        };
    }
    state.admins.loading = loading;
};
export const SetClients = (state, [loading, data = null]) => {
    if (data) {
        state.clients = {
            ...state.clients,
            clients: data.clients,
            customers: data,
            client: data.client,
        };
    }
    state.clients.loading = loading;
};






export const SetSubscriptions = (state, [loading, data = null]) => {
    if (data) {
        state.subscriptions = {
            subscriptions: data.subscriptionsWithDetails,
            plans: data.subscriptionProducts,
        };
    }
    state.subscriptions.loading = loading;
};

export const SetSubscriptionCancellations = (state, [loading, data = null]) => {
    if (data) {
        state.subscriptionCancellations = {
            cancellations: data.cancellations,
        };
    }
    state.subscriptions.loading = loading;
};

