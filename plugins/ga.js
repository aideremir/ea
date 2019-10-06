/* eslint-disable */
const config = require('../config/app.config.js');

export default ({app}) => {
    if (process.env.NODE_ENV !== 'production') {
        return;
    }

    if (!config.GA_ID) {
        return;
    }

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', config.GA_ID, 'auto');

    // Every time the route changes (fired on initialization too)
    app.router.afterEach((to) => {
        ga('set', 'page', to.fullPath);
        ga('send', 'pageview');
    })
}
