<template>
    <div class="notification" v-if="notification">
        <div class="notification__title">
            {{ notification.title }}
            <app-button @click="close()">
                <close-icon class="notification__close-icon"/>
            </app-button>
        </div>
    </div>
</template>

<script>
    import CloseIcon from '../assets/images/inline/close-small.svg';
    import AppButton from 'components/button';

    export default {
        computed: {
            notification() {
                return this.$store.state.ui.notification;
            },
        },
        methods: {
            close() {
                this.$store.dispatch('ui/closeNotification');
            }
        },
        components: {
            CloseIcon,
            AppButton,
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .notification {
        margin: 0 auto;
        @include remPadding(17px, 8px, 17px, 16px);
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: auto;
        min-width: calculateRem(256px);

        border-radius: 4px;
        box-shadow: 0 0 8px 0 rgba(17, 20, 24, 0.8);
        background: $white;

        @media (max-width: $lg) {
            @include remPadding(12px, 8px, 12px, 16px);
        }

        @media (max-width: $md) {
            @include remPadding(14px, 8px, 12px, 16px);
        }

        &__title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: calculateRem(15px);
            line-height: 1.2;
            letter-spacing: calculateRem(0.4px);
            color: $dark;

            @media (max-width: $md) {
                font-size: calculateRem(12px);
                line-height: 1.33;
                letter-spacing: calculateRem(0.4px);
            }
        }

        &__close-icon {
            fill: $cool-grey;

            &:hover {
                fill: $dark;
            }
        }
    }
</style>
