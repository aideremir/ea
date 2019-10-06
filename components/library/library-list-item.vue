<template>
    <li class="library__list-item">
        <nuxt-link :to="item.link" class="library__list-item-link">
            <img class="library__list-item-image" :src="src" :alt="title">
        </nuxt-link>
        <div class="library__list-item-body">
            <nuxt-link :to="item.link" class="library__list-item-title">
                {{ title }}
            </nuxt-link>
            <div>
                <details-info type="table">
                    <div v-if="item.performers && item.performers.length" class="details__row">
                        <div class="details__cell">
                            Pornstars
                        </div>
                        <div class="details__cell">
                            <link-list :route="$routes.performer"
                                       :links="item.performers"></link-list>
                        </div>
                    </div>
                    <div v-if="item.directors && item.directors.length" class="details__row">
                        <div class="details__cell">
                            Director
                        </div>
                        <div class="details__cell">
                            <link-list :route="$routes.director" :links="item.directors"></link-list>
                        </div>
                    </div>
                </details-info>
            </div>
        </div>
    </li>
</template>

<script>
    import DetailsInfo from '../details-info';
    import LinkList from '../link-list';
    export default {
        components: {LinkList, DetailsInfo},
        props: {
            item: Object,
        },
        computed: {
            title() {
                return this.item.title ? this.item.title : this.item.name;
            },
            src() {
                if (this.item.images && this.item.images[1]) {
                    return this.item.images[1][360];
                } else {
                    return 'https://via.placeholder.com/300x434/59606b/fffffff';
                }
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    @import "../../assets/scss/mixins/px-rem";

    .library__list-item {
        padding: calculateRem(24px) 0;
        display: flex;
        border-top: 1px solid $charcoal-grey;
        &-image {
            max-height: calculateRem(80px);
        }
        &-body {
            margin-left: calculateRem(24px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        &-title {
            margin-bottom: calculateRem(10px);
            font-size: calculateRem(20px);
            letter-spacing: calculateRem(.2px);
            display: block;
        }
        .library__list--playlist & {
            border-top: none;
            border-bottom: 1px solid $charcoal-grey;
        }
    }

</style>