import {resetAuthToken, setAuthToken} from '../api/init';
import browserCookie from 'js-cookie';
import api from 'api/dispatcher';
import cookie from 'cookie';

const config = require('../config/app.config');

export const state = () => ({
    user:           null
});

export const mutations = {
    SET_USER(store, data) {
        store.user = data;
    },
    LOGOUT(store) {
        store.user = null;
    }
};

export const actions = {
    loginByCookie({dispatch}, context) {
        return new Promise((resolve) => {
            const cookies = cookie.parse(context.req.headers.cookie || '');

            if (cookies.hasOwnProperty('x-access-token')) {
                setAuthToken(cookies['x-access-token']);

                dispatch('fetch')
                    .then(() => {
                        resolve(true);
                    })
                    .catch(() => {
                        resetAuthToken();
                        resolve(false);
                    });
            } else {
                resetAuthToken();
                resolve(false);
            }
        });
    },
    fetch({commit, dispatch}) {
        return api.getCurrentUser()
            .then(response => {
                if (response.data.id) {
                    commit('SET_USER', response.data);
                } else {
                    throw response;
                }

                return response;
            })
            .catch(error => {
                return dispatch('logout').then(() => {
                    throw error;
                });
            });
    },
    login({dispatch}, data) {
        return api.login(data)
            .then(response => {
                return dispatch('loginByToken', response.data);
            });
    },
    loginByToken({dispatch}, data) {
        setAuthToken(data.token);
        browserCookie.set(
            'x-access-token',
            data.token,
            {secure: config.IS_COOKIE_SECURE}
        );

        return dispatch('fetch');
    },
    logout({commit}) {
        commit('LOGOUT');

        resetAuthToken();
        browserCookie.remove('x-access-token');

        return Promise.resolve();
    },
    usePurchaseToken({commit}, {contentType, contentId}) {
        return api.redeemPurchaseToken(contentType, contentId).then(() => {
            commit('USE_PURCHASE_TOKEN', {contentType, contentId, permission: 'stream'});
        });
    },
};

export const getters = {
    isLoggedIn(state) {
        return !!state.user;
    },
    isEmailConfirmed(state, getters) {
        return getters.isLoggedIn && state.user.emailConfirmed;
    },
    isTrustedUser(state, getters) {
        //return getters.isLoggedIn && (getters.isEmailConfirmed || getters.isWebsiteAccess);
        return getters.isLoggedIn && getters.isEmailConfirmed;
    },
    hasPurchaseToken(state) {
        return !!state.user && state.user.hasPurchaseToken;
    },
    hasPermission(state) {
        return (contentType, contentId, permission) => {
            if (!state.user || !state.user.permissions || !state.user.permissions.length) {
                return null;
            }

            return !!state.user.permissions.find(item => {
                return item.contentType === contentType && item.contentId === contentId && item.permission === permission;
            });
        };
    },
    isWebsiteAccess(state, getters) {
        return getters.hasPermission('Website', 1, 'website_access');
    },
    canVote(state, getters) {
        return !!state.user && (state.user.emailConfirmed || getters.isWebsiteAccess);
    },
};
