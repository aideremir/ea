import {getMatchedComponents, nuxtRouteOption} from 'node_modules/ea-components/services/utils';

export default function ({store, redirect, route}) {
    if (nuxtRouteOption(route, 'auth', false)) {
        return;
    }

    const isLoggedIn = !!store.state.auth.user;
    const afterLogin = route.fullPath;

    // Disable middleware if no route was matched to allow 404/error page
    const components = getMatchedComponents(route);

    if (!components.length) {
        return;
    }

    if (!isLoggedIn) {
        return redirect(`/${store.state.i18n.locale}/login?to=${encodeURIComponent(afterLogin)}`);
    }

    return Promise.resolve();
}
