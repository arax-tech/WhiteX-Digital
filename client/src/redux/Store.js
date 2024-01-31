// import { configureStore } from '@reduxjs/toolkit';
// import * as thunk from 'redux-thunk'; // Importing thunk directly
// import { authReducer } from './reducers/AuthReducer';

// const reducer = {
//     // Auth
//     auth: authReducer,
// };

// const middleware = [thunk];

// const store = configureStore({
//     reducer,
//     middleware,
//     devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;


import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { AuthReducer, ForgotPasswordReducer, UpdateProfileReducer } from './reducers/AuthReducer';
import { AdminsReducer } from './reducers/Admin/AdminsReducer';
import { SubscriptionReducer } from './reducers/Admin/SubscriptionReducer';
import { ClientReducer } from './reducers/Admin/ClientReducer';
import { TeamReducer } from './reducers/Client/TeamReducer';
import { ClientSubscriptionReducer } from './reducers/Client/SubscriptionReducer';


const reducer = combineReducers({
    // Auth
    auth: AuthReducer,
    profile : UpdateProfileReducer,
    password : ForgotPasswordReducer,
    
    // Admin
    admins : AdminsReducer,
    clients : ClientReducer,
    subscriptions : SubscriptionReducer,

    // Client
    teams : TeamReducer,
    subscription : ClientSubscriptionReducer,
});

let initialState = {};
const Store = configureStore({
    reducer,
    initialState,
    devTools: process.env.NODE_ENV !== 'production',
})


export default Store