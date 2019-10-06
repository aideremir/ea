<template>
    <div class="popup-header">
        <app-button class="popup-header__close" @click.native="closePopup">
            <close-icon class="popup-header__close-icon"/>
        </app-button>
        <nuxt-link :to="$routes.home()" class="popup-header__logo">
            <img src="../assets/images/logo.svg"/>
        </nuxt-link>
    </div>
</template>

<script>
    import CloseIcon from '../assets/images/inline/close-small.svg';
    import AppButton from 'components/button';

    export default {
        methods: {
            closePopup() {
                this.$emit('close');
            }
        },
        components: {
            CloseIcon,
            AppButton
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .popup-header {
        padding: 0 calculateRem(16px);
        width: 100%;
        height: calculateRem(64px);
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        background: $dark;
        border-bottom: 1px solid $charcoal-grey;
        z-index: $zindex-fixed;

        @media (min-width: $lg) {
            display: none;
        }

        @media (max-width: $sm) {
            height: calculateRem(48px);
        }

        &__close {
            margin-right: calculateRem(16px);

            @media (max-width: $sm) {
                margin-right: calculateRem(8px);
            }
        }

        &__close-icon {
            width: calculateRem(24px);
            height: calculateRem(24px);
            fill: $light-grey;

            &:hover {
                fill: $white;
            }
        }

        &__logo {
            width: calculateRem(165px);
            display: block;
        }

        &__body {
            padding: calculateRem(16px);
        }
    }
</style>
