import axios from 'axios';
import browserCookie from 'js-cookie';

const config = require('../config/app.config');

axios.defaults.baseURL = config.API_BASE_URL;

const token = browserCookie.get('x-access-token');

if (token) {
    setAuthToken(token);
} else {
    resetAuthToken();
}

export function setAuthToken(token) {
    axios.defaults.headers.common['x-access-token'] = token;
}

export function resetAuthToken() {
    delete axios.defaults.headers.common['x-access-token'];
}

export default ({store, redirect}) => {
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let originalRequest = error.config;

            if (error.response.status === 401 && error.response.data.code === 'access_token_invalid') {
                return store.dispatch('auth/logout').then(() => {
                    delete originalRequest.headers['x-access-token'];

                    return axios(originalRequest);
                });
            }

            if (error.response.status === 401 && error.response.data.code === 'unauthenticated') {
                redirect(`/${store.state.i18n.locale}/login`);

                return Promise.reject(error);
            }

            if (error.response.status === 403 && error.response.data.code === 'user_blocked') {
                redirect(`/${store.state.i18n.locale}/account-blocked`);

                error.handled = true;

                return Promise.reject(error);
            }

            return Promise.reject(error);
        }
    );
};
