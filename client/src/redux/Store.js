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
import { AuthReducer } from './reducers/AuthReducer';


const reducer = combineReducers({
    auth: AuthReducer,
});

let initialState = {};
const Store = configureStore({
    reducer,
    initialState,
    devTools: process.env.NODE_ENV !== 'production',
})


export default Store