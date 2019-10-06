<template>
    <div class="search-layout">
        <nuxt/>
        <notification/>
    </div>
</template>

<script>
    import Notification from 'components/notification';

    export default {
        components: {
            Notification,
        }
    };
</script>
