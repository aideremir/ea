<template>
</template>

<script>
    import api from 'api/dispatcher';
    import serverCookie from 'cookie';

    export default {
        auth: false,
        layout: 'no-signup-banner',
        data() {
            return {
                message: ''
            };
        },
        asyncData({route, res, redirect, req, app, params, store}) {
            const provider = params.provider;

            if (provider === 'yoti' && route.query.token) {
                return api.validateAgeToken('yoti', route.query.token).then(response => {
                    if (response.data.verified) {
                        res.setHeader('Set-Cookie', serverCookie.serialize('av', route.query.token, {
                            maxAge: 60 * 60 * 24 * 365 * 3, // 3 years
                            path: '/'
                        }));
                        store.dispatch('auth/setIsAgeValid', true);

                        const cookie = serverCookie.parse(req.headers['cookie'] || '');
                        const returnUrl = cookie['av_return_url'] || '/';

                        return redirect(returnUrl);
                    } else {
                        store.dispatch('ui/showModal', {
                            type: 'error',
                            title: app.i18n.t('age_validation.below_18_title'),
                            body: app.i18n.t('age_validation.below_18_body')
                        });

                        return Promise.resolve();
                    }
                }).catch(error => {
                    store.dispatch('ui/showModal', {
                        type: 'error',
                        title: app.i18n.t('age_validation.error'),
                        body: app.i18n.t('age_validation.error_token_decrypt')
                    });
                });
            } else {
                store.dispatch('ui/showModal', {
                    type: 'error',
                    title: app.i18n.t('age_validation.error'),
                    body: app.i18n.t('age_validation.error_yoti')
                });

                return Promise.resolve();
            }
        },
    };
</script>
