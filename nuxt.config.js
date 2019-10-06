const path = require('path');
const config = require('./config/app.config');
const messagesEn = require('./locales/en');
const messagesDe = require('./locales/de');

module.exports = {
    build: {
        publicPath: config.PUBLIC_PATH,
        vendor: ['axios', 'babel-polyfill'],
        extend(config) {
            config.resolve.alias['assets'] = path.join(this.options.srcDir, 'assets');
            config.resolve.alias['api'] = path.join(this.options.srcDir, 'api');
            config.resolve.alias['components'] = path.join(this.options.srcDir, 'components');
            config.resolve.alias['node_modules'] = path.join(this.options.srcDir, 'node_modules');
            config.resolve.alias['services'] = path.join(this.options.srcDir, 'services');

            const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader');
            svgRule.exclude = [path.resolve(__dirname, 'assets/images/inline')];

            config.module.rules.push({
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, 'assets/images/inline')
                ],
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            {removeViewBox: false}
                        ]
                    }
                }
            });
        }
    },
    modules: [
        ['nuxt-i18n', {
            locales: config.LOCALES,
            defaultLocale: 'en',
            baseUrl: config.BASE_URL,
            strategy: 'prefix',
            detectBrowserLanguage: false,
            vuex: {
                moduleName: 'i18n',
                mutations: {
                    setLocale: 'SET_LANG',
                    setMessages: false
                }
            },
            vueI18n: {
                fallbackLocale: 'en',
                messages: {
                    en: messagesEn,
                    de: messagesDe
                }
            }
        }]
    ],
    head: {
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {name: 'msapplication-TileColor', content: '#d9000b'},
            {name: 'theme-color', content: '#ffffff'},
            {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
        ],
        link: [
            {
                rel: 'apple-touch-icon',
                sizes: '144x144',
                href: `${config.PUBLIC_PATH}static/apple-touch-icon.png`
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `${config.PUBLIC_PATH}static/favicon-32x32.png`
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `${config.PUBLIC_PATH}static/favicon-16x16.png`
            },
            {
                rel: 'manifest',
                href: `${config.PUBLIC_PATH}static/site.webmanifest`
            },
            {
                rel: 'mask-icon',
                href: `${config.PUBLIC_PATH}static/safari-pinned-tab.svg`,
                color: '#5bbad5'
            }
        ]
    },
    router: {
        middleware: ['locale', 'auth'],
    },
    plugins: [
        {src: '~/plugins/config.js'},
        {src: '~/api/init.js'},
        {src: '~/plugins/icons.js'},
        {src: '~/plugins/components.js'},
        {src: '~/plugins/filters.js'},
        {src: '~/plugins/routes.js'},
        {src: '~/plugins/uiSettings.js'},
        {src: '~/plugins/ga.js', ssr: false},
    ],
    css: [
        '~/assets/scss/app.scss'
    ]
};
