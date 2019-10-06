<template>
    <ul v-if="tags" class="tag-list" :class="itemExtraClass">
        <tag-list-item v-for="tag in tags" :key="tag.id" :tag="tag">
        </tag-list-item>
    </ul>
</template>

<script>
    import TagListItem from './tag-list-item';

    export default {
        props: {
            tags: Array,
            itemExtraClass: {}
        },
        components: {
            TagListItem
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .tag-list {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }

</style>
