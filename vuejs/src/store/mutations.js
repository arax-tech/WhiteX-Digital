
export const SetAuthUser = (state, [loading, data = null]) => {
    if (data) {
        state.auth = {
            ...state.auth,
            user: data,
        }
    }
    state.auth.loading = loading;
}
export const SetToken = (state, token) => {
    localStorage.setItem('token', token);
    state.auth.token = token;
}



