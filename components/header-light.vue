<template>
    <header class="header header--light">
        <nuxt-link :to="$routes.home()" class="header__logo"><img src="../assets/images/logo-light-theme.svg" alt=""></nuxt-link>

    </header>
</template>

<script>

    export default {
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';


    .header {
        padding: 12px 24px;
        &__logo {
            max-width: 140px;
            display: block;
        }
    }

    .header--light {
        border-bottom: 1px solid #edf2f6;
    }

</style>
