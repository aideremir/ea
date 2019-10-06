<template>
    <div class="site">
        <app-header/>
        <div class="site__body">
            <div v-if="isSecondaryMenuVisible" class="site__menu-container">
                <secondary-menu/>
            </div>
            <div class="site__content-container">
                <div class="site__content">
                    <nuxt/>
                </div>
                <app-footer/>
            </div>
        </div>
        <notification/>
    </div>
</template>

<script>
    import AppHeader from 'components/header';
    import AppFooter from 'components/footer';
    import SecondaryMenu from 'components/secondary-menu';
    import Notification from 'components/notification';

    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                isSecondaryMenuVisible: state => state.ui.isSecondaryMenuVisible,
            }),
        },
        components: {
            AppHeader,
            AppFooter,
            SecondaryMenu,
            Notification,
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .site {
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        &__body {
            display: flex;
            flex-grow: 1;
            position: relative;
        }

        &__menu-container {
            flex-basis: calculateRem(200px);
            min-width: calculateRem(200px);

            @media (max-width: $lg) {
                position: absolute;
                top: 0;
                bottom: 0;
                z-index: $zindex-secondary-menu;
            }
        }

        &__content-container {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
        }

        &__content {
            flex: 1;
        }
    }
</style>
