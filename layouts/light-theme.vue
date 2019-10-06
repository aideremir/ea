<template>
    <div class="site-main site-main--light-theme">
        <app-header/>

        <div class="site-content">
            <nuxt/>
        </div>
        <notification/>
    </div>
</template>

<script>
    import AppHeader from 'components/header-light';
    import Notification from 'components/notification';

    export default {
        components: {
            AppHeader,
            Notification,
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .site-main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        &--light-theme {
            background-color: #fff;
            color: $dark
        }
    }

    .site-content {
        flex: 1;
    }

</style>
