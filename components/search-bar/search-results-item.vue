<template>
    <div class="search-results-item">
        <div class="search-results-item__image">
            <img :src="item.imageUrl"/>
        </div>
        <div class="search-results-item__info">
            <div class="search-results-item__title">{{ item.title }}</div>
            <div v-if="item.performers" class="search-results-item__subtitle">{{ item.performers }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        }
    };
</script>

<style lang="scss">
    @import '~assets/scss/variables';
    @import '~assets/scss/mixins/px-rem';

    .search-results-item {
        padding:     6px 0;
        display:     flex;
        align-items: center;
        box-shadow:  0 -1px 0 0 $charcoal-grey;
        cursor:      pointer;

        &__image {
            flex-basis: 31px;
            min-width:  31px;
            height:     44px;

            .wide-pics & {
                flex-basis: 78px;
                min-width:  78px;
            }
        }

        &__info {
            padding-left: 10px;
            flex-grow:    1;
            overflow:     hidden;
        }

        &__title {
            @include fontSize(15px);
            line-height:    1.2;
            letter-spacing: calculateRem(0.4px);
            color:          $white;
            white-space:    nowrap;
            overflow:       hidden;
            text-overflow:  ellipsis;
        }

        &__subtitle {
            @include fontSize(12px);
            line-height:    1.33;
            letter-spacing: calculateRem(0.4px);
            color:          $pinkish-red;
            white-space:    nowrap;
            overflow:       hidden;
            text-overflow:  ellipsis;
        }
    }
</style>
