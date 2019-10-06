<template>
    <ul class="library__list" :class="extraClass">
        <library-list-item v-for="item in data" :item="item" :key="item.id"></library-list-item>
    </ul>
</template>

<script>
    import LibraryListItem from './library-list-item';
    export default {
        components: {LibraryListItem},
        props: {
            data: Array,
            extraClass: String
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    @import "../../assets/scss/mixins/px-rem";

    .library {
        &__list {
            padding: 0;
            display: flex;
            flex-direction: column;
            list-style: none;
        }
    }

</style>