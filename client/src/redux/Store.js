import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { AuthReducer, ForgotPasswordReducer, UpdateProfileReducer } from './reducers/AuthReducer';

import { AdminsReducer } from './reducers/Admin/AdminsReducer';
import { SubscriptionReducer } from './reducers/Admin/SubscriptionReducer';
import { ClientReducer } from './reducers/Admin/ClientReducer';
import { SubscriptionCancellationReducer } from './reducers/Admin/SubscriptionCancellationReducer';
import { InvoicesReducer } from './reducers/Admin/InvoiceReducer';
import { PopupMessageReducer } from './reducers/Admin/PopupMessageReducer';
import { SupportTicketReducer } from './reducers/Admin/SupportTicketReducer';
import { AdminFeedbackReducer } from './reducers/Admin/FeedbackReducer';
import { AdminMenuReducer } from './reducers/Admin/MenuReducer';
import { SettingReducer } from './reducers/Admin/SettingReducer';

import { TeamReducer } from './reducers/Client/TeamReducer';
import { ClientSubscriptionReducer } from './reducers/Client/SubscriptionReducer';
import { ClientSubscriptionCancellationReducer } from './reducers/Client/SubscriptionCancellationReducer';
import { ClientInvoicesReducer } from './reducers/Client/InvoiceReducer';
import { SupportReducer } from './reducers/Client/SupportReducer';
import { ClientFeedbackReducer } from './reducers/Client/FeedbackReducer';
import { LeadsReducer } from './reducers/Admin/LeadReducer';


const reducer = combineReducers({
    // Auth
    auth: AuthReducer,
    profile: UpdateProfileReducer,
    password: ForgotPasswordReducer,

    // Admin
    admins: AdminsReducer,
    clients: ClientReducer,
    subscriptions: SubscriptionReducer,
    subscriptionCancellations: SubscriptionCancellationReducer,
    invoices: InvoicesReducer,
    popupMessages: PopupMessageReducer,
    supportTickets: SupportTicketReducer,
    adminFeedback: AdminFeedbackReducer,
    adminMenu: AdminMenuReducer,
    settings: SettingReducer,
    leads: LeadsReducer,

    // Client
    teams: TeamReducer,
    subscription: ClientSubscriptionReducer,
    clientSubscriptionCancellations: ClientSubscriptionCancellationReducer,
    clientInvoices: ClientInvoicesReducer,
    supports : SupportReducer,
    feedback : ClientFeedbackReducer,
});

let initialState = {};
const Store = configureStore({
    reducer,
    initialState,
    devTools: process.env.NODE_ENV !== 'production',
})


export default Store