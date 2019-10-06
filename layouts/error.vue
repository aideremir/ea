<template>
    <div>
        <div class="error-page" :class="errorClass"></div>
        <div class="error-page__message-wr">
            <div class="error-page__message">
            <span v-if="error.statusCode === 404"
                  class="error-page__text">The page you’re looking for doesn’t seem to exist.</span>
                <span v-else class="error-page__text">Looks like something went wrong.</span>

                <nuxt-link :to="$routes.home()" class="btn btn--secondary btn--small error-page__link">Go to homepage
                </nuxt-link>
            </div>
        </div>
        <notification/>
    </div>
</template>

<script>
    import Notification from 'components/notification';

    export default {
        props:    ['error'],
        computed: {
            errorClass() {
                if (this.error.statusCode === 404) {
                    return 'error-page--404';
                } else {
                    return 'error-page--server';
                }
            }
        },
        components: {
            Notification,
        }
    }
</script>
