export default {
    auth: {
        token: localStorage.getItem('token'),
        user: {},
        notifications: {},
        setting: {},
        menus: {},
        loading: false
    },
    admins: {
        admins: [],
        admin: {},
        loading: false,
    },
    password: {
        loading: false,
    },
    clients: {
        clients: [],
        client: {},
        loading: false,
    },
    customers: {
        data: [],
        loading: false,
    },
    subscriptions: {
        subscriptions: [],
        plans: [],
        invoices: [],
        loading: false,
    },
    subscriptionInvoices: {
        data: [],
        loading: false,
    },
    subscriptionCancellations: {
        cancellations: [],
        cancellation:  null,
        loading: false,
    },
    invoices: {
        data: [],
        invoice: null,
        loading: false,
    },
    messages: {
        data: [],
        loading: false,
    },
    leads: {
        data: [],
        loading: false,
    },
    supports: {
        data: [],
        loading: false,
    },
    singleSupport: {
        data: null,
        loading: false,
    },
    feedbacks: {
        data: [],
        loading: false,
    },
    solutions: {
        data: [],
        loading: false,
    },




    // Clients
    teams: {
        data: [],
        team: null,
        loading: false,
    },
    subscription: {
        data: [],
        loading: false,
    },
    clientBilling: {
        data: [],
        loading: false,
    },


}
