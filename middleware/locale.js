import serverCookie from 'cookie';

export default function ({isHMR, app, route, req, res, redirect}) {

    if (isHMR || !process.server) {
        return;
    }

    const allowedLocales = [];
    app.i18n.locales.forEach(locale => {
        allowedLocales.push(locale.code);
    });

    // non existent page with locale
    if (isRouteWithLocale(route, allowedLocales) && route.matched.length === 0) {
        return;
    }

    // some page without locale
    if (route.matched.length === 0) {
        if (req && req.headers['cookie']) {
            const cookies = serverCookie.parse(req.headers['cookie']);
            if (cookies && cookies.i18n_lang && allowedLocales.indexOf(cookies.i18n_lang) >= 0) {
                return redirect(`/${cookies.i18n_lang}${route.fullPath}`);
            }
        }

        let clientLocale = app.i18n.defaultLocale;

        if (req && req.headers['accept-language']) {
            clientLocale = req.headers['accept-language'].split(',')[0].toLocaleLowerCase().substring(0, 2);
        }

        if (res && allowedLocales.indexOf(clientLocale) >= 0) {
            res.setHeader('Set-Cookie', serverCookie.serialize('i18n_lang', clientLocale, {
                maxAge: 60 * 60 * 24 * 365, // one year
                path: '/'
            }));
            return redirect(`/${clientLocale}${route.fullPath}`);
        } else {
            return redirect(`/${app.i18n.defaultLocale}${route.fullPath}`);
        }
    }
}

function isRouteWithLocale(route, allowedLocales) {
    return !!allowedLocales.find(locale => route.fullPath.indexOf(`/${locale}`) === 0);
}
