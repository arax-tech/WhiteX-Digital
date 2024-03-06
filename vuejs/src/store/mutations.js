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
export const SetPassword = (state, [loading, data = null]) => {
    if (data) {
        state.password = {
            ...state.password,
        }
    }

    if (!state.password) {
        state.password = {};
    }
    state.password.loading = loading;
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
            client: data.client,
        };
    }
    state.clients.loading = loading;
};
export const SetCustomers = (state, [loading, data = null]) => {
    if (data) {
        state.customers = {
            ...state.customers,
            data: data,
        };
    }
    state.clients.loading = loading;
};
export const SetInvoices = (state, [loading, data = null]) => {
    if (data) {
        state.invoices = {
            ...state.invoices,
            data: data.invoices,
            invoice: data.invoice,
        };
    }
    state.invoices.loading = loading;
};
export const SetSubscriptions = (state, [loading, data = null]) => {
    if (data) {

        state.subscriptions = {
            ...state.subscriptions,
            subscriptions: data.subscriptionsWithDetails,
            plans: data.subscriptionProducts,
            invoices: data,
        };
    }

    if (!state.subscriptions) {
        state.subscriptions = {};
    }
    state.subscriptions.loading = loading;
};
export const SetSubscriptionInvoices = (state, [loading, data = null]) => {
    if (data) {

        state.subscriptionInvoices = {
            ...state.subscriptionInvoices,
            data: data,
        };
    }

    if (!state.subscriptionInvoices) {
        state.subscriptionInvoices = {};
    }
    state.subscriptionInvoices.loading = loading;
};
export const SetSubscriptionCancellations = (state, [loading, data = null]) => {
    if (data) {
        state.subscriptionCancellations = {
            cancellations: data.cancellations,
            cancellation: data.cancellation,
        };
    }
    state.subscriptionCancellations.loading = loading;
};
export const SetPopupMessages = (state, [loading, data = null]) => {
    if (data) {
        state.messages = {
            ...state.messages,
            data: data.popupMessages,
        };
    }
    if (!state.messages) {
        state.messages = {};
    }
    state.messages.loading = loading;
};
export const SetLeads = (state, [loading, data = null]) => {
    if (data) {
        state.leads = {
            ...state.leads,
            data: data,
        };
    }
    if (!state.leads) {
        state.leads = {};
    }
    state.leads.loading = loading;
};
export const SetSupports = (state, [loading, data = null]) => {
    if (data) {
        state.supports = {
            ...state.supports,
            data: data.supports,
        };
    }

    if (!state.supports) {
        state.supports = {};
    }

    state.supports.loading = loading;
};
export const SetSingleSupport = (state, [loading, data = null]) => {
    if (data) {
        state.singleSupport = {
            ...state.singleSupport,
            data: data.support,
            chats: data.chats,
        };
    }

    if (!state.singleSupport) {
        state.singleSupport = {};
    }

    state.singleSupport.loading = loading;
};
export const SetFeedbacks = (state, [loading, data = null]) => {
    if (data) {
        state.feedbacks = {
            ...state.feedbacks,
            data: data.feedbacks,
            feedback: data.feedback,
        };
    }

    if (!state.feedbacks) {
        state.feedbacks = {};
    }

    state.feedbacks.loading = loading;
};
export const SetSolutions = (state, [loading, data = null]) => {
    if (data) {
        state.solutions = {
            ...state.solutions,
            data: data.menus,
        };
    }

    if (!state.solutions) {
        state.solutions = {};
    }

    state.solutions.loading = loading;
};



// Clients
export const SetTeams = (state, [loading, data = null]) => {
    if (data) {
        state.teams = {
            ...state.teams,
            data: data.teams,
            team: data.team,
        };
    }

    if (!state.teams) {
        state.teams = {};
    }

    state.teams.loading = loading;
};
export const SetSubscription = (state, [loading, data = null]) => {
    if (data) {
        state.subscription = {
            ...state.subscription,
            data: data,
        };
    }

    if (!state.subscription) {
        state.subscription = {};
    }

    state.subscription.loading = loading;
};

export const SetClientBilling = (state, [loading, data = null]) => {
    if (data) {
        state.clientBilling = {
            ...state.clientBilling,
            data: data,
        };
    }

    if (!state.clientBilling) {
        state.clientBilling = {};
    }

    state.clientBilling.loading = loading;
};