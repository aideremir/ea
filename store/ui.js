let notificationTimeoutId;

export const state = () => {
    notificationTimeoutId = null;

    return {
        isSecondaryMenuVisible: false,
        notification: null,
    };
};

export const mutations = {
    TOGGLE_SECONDARY_MENU(store, data) {
        store.isSecondaryMenuVisible = !store.isSecondaryMenuVisible;
    },
    SET_NOTIFICATION(store, data) {
        store.notification = data;
    },
};

export const actions = {
    toggleSecondaryMenu({commit}) {
        commit('TOGGLE_SECONDARY_MENU');
    },
    showNotification({commit, dispatch}, notification) {
        commit('SET_NOTIFICATION', notification);

        if (notification.ttl) {
            if (notificationTimeoutId) {
                clearTimeout(notificationTimeoutId);
            }

            notificationTimeoutId = setTimeout(() => {
                dispatch('closeNotification');
            }, notification.ttl);
        }
    },
    closeNotification({commit}) {
        commit('SET_NOTIFICATION', null);

        return Promise.resolve();
    },
};

export const getters = {};
