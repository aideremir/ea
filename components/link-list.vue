<template>
    <span v-if="links" class="link-list" :class="itemExtraClass">
        <span v-for="(link, index) in links" :key="link.id">
            <nuxt-link :to="route(link)"
                       class="link-list__item">
                {{ link.name || link.title }}</nuxt-link><span
                v-if="links.length >= 2 && index < links.length - 1">, </span>
        </span>
    </span>
</template>

<script>
    export default {
        props: {
            links: Array,
            route: Function,
            itemExtraClass: {}
        },
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .link-list {
        color: $pinkish-red;
        &__item {
            color: $pinkish-red;
            letter-spacing: .4px;
            &:hover {
                color: $pinkish-red;
                text-decoration: none;
            }
        }

    }
</style>