<template>
    <li class="tag-list-item">
        <nuxt-link :to="$routes.episodesByTag(tag.id)" class="tag-list-item__link">
            {{ tag.name }}
        </nuxt-link>
    </li>
</template>

<script>
    export default {
        props: {
            tag: Object
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .tag-list-item {
        margin: 0 .25rem .25rem 0;
        &__link {
            padding: .5rem .875rem;
            display: block;
            font-size: .9375rem;
            line-height: 1;
            border-radius: $tag-list-item-border-radius;
            border: solid 1px $tag-list-item-border-color;
            background-color: $tag-list-item-background;
            &:hover {
                text-decoration: none;
            }
        }
    }
</style>
