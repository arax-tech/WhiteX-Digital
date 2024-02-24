import axiosClient from "../axios";

/* ========================= */
//      Auth Actions         //
/* ========================= */
export const GetAuthUser = async ({ commit }, data) => {
    commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.get('/admin/profile');
        commit('SetAuthUser', [false, data.user])
    } catch (error) {
        commit('SetAuthUser', [false])
        return error.response.data;
    }
}
export const LoginAction = async ({ commit }, formData) => {
    // commit('SetAuthUser', [true])
    try {
        const { data } = await axiosClient.post('/auth/login', formData);
        // commit('SetAuthUser', [false, data.user])
        // commit('SetToken', data.token)
        return data;
    } catch (error) {
        // commit('SetAuthUser', [false])
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
        commit('SetAuthUser', [false, data.user])
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


