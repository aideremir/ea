export const actions = {
    nuxtServerInit({dispatch}, context) {
        return Promise.all([
            dispatch('auth/loginByCookie', context)
        ]);
    }
};
