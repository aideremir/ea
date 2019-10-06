export const state = () => {
    return {
        locales: ['en', 'de'],
        locale: 'en'
    };
};

export const mutations = {
    SET_LANG(store, locale) {
        store.locale = locale;
    }
};

export const actions = {
    setLanguage({commit}, locale) {
        commit('SET_LANG', locale);

        return Promise.resolve();
    }
};

export const getters = {};
