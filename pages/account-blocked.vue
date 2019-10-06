<template>
    <div class="message">
        <div class="message__head">{{ $t('account_blocked.head') }}</div>
        <div class="message__body">{{ $t('account_blocked.body') }}</div>
        <div class="message__footer">
            <nuxt-link :to="$routes.forgotPassword()" class="btn btn--secondary btn--small">
                {{ $t('account_blocked.reset_password')}}
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        auth: false
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .message {
        margin: calculateRem(72px) auto;
        padding: calculateRem(16px);
        width: calculateRem(396px);

        @media (max-width: $lg) {
            padding-bottom: calculateRem(8px);
            width: calculateRem(320px);
        }

        @media (max-width: $md) {
            width: 100%;
            text-align: center;
        }

        &__head {
            margin-bottom: calculateRem(24px);
            font-size: calculateRem(20px);
            font-weight: $font-weight-normal;
            letter-spacing: calculateRem(0.2px);
        }

        &__body {
            margin-bottom: calculateRem(24px);
        }
    }
</style>
