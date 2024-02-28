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
    clients: {
        clients: [],
        customers: [],
        client: {},
        loading: false,
    },
    subscriptions: {
        subscriptions: [],
        plans: [],
        loading: false,
    },
    subscriptionCancellations: {
        cancellations: [],
        loading: false,
    },
}
