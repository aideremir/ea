<template>
    <div class="mobile-search">
        <popup-header @close="closeSearch"/>
        <div class="mobile-search__body">
            <search-bar :class="{'search-bar--visible': true}"/>
        </div>
    </div>
</template>

<script>
    import SearchBar from '../components/search-bar';
    import PopupHeader from '../components/popup-header';

    export default {
        layout: 'search',
        methods: {
            closeSearch() {
                this.$router.back();
            }
        },
        components: {
            SearchBar, PopupHeader
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/mixins/px-rem';

    .mobile-search {
        padding-top: calculateRem(64px);

        &__body {
            padding: calculateRem(16px);
        }
    }
</style>
