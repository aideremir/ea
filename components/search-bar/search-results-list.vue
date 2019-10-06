<template>
    <div class="search-results-list">
        <div class="search-results-list__head">
            <div class="search-results-list__title">{{ title }}</div>
            <app-button child-class="btn--xs btn--outline">View all</app-button>
        </div>
        <div class="search-results-list__body">
            <search-results-item v-for="(resultItem, index) in results" :item="resultItem" :key="index"/>
        </div>
    </div>
</template>

<script>
    import SearchResultsItem from './search-results-item';
    import AppButton from '../button';

    export default {
        props:      {
            title:       String,
            results: Array
        },
        components: {
            SearchResultsItem,
            AppButton
        }
    };
</script>

<style lang="scss">
    @import '~assets/scss/variables';
    @import '~assets/scss/mixins/px-rem';

    .search-results-list {

        @media (max-width: $lg) {
            margin-bottom: 24px;
        }

        &__head {
            padding-bottom:  9px;
            display:         flex;
            justify-content: space-between;
            align-items:     center;
        }

        &__title {
            @include fontSize(16px);
            color:          $white;
            letter-spacing: calculateRem(0.2px);
        }
    }
</style>
