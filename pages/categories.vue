<template>
    <div class="categories">
        <div class="container">
            <div class="row">
                <div class="col categories__head">
                    <h1 class="categories__title">
                        Evil Angel Categories
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-4 col-md-3 col-lg-2 categories__list-wr">
                    <ul class="categories__list">
                        <li class="categories__item" v-for="category in categories">
                            <nuxt-link class="categories__link" :to="$routes.episodesByTag(category.id)">{{ category.name }}</nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="categories-tile row">
                        <category-item v-for="category in categories" :category="category"
                                       :key="category.id"></category-item>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import CategoryItem from 'components/category-item';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';

    export default {
        auth:   false,
        computed:   {
            categories() {
                let arr = [];

                for (let tag in this.$store.state.content.tagList) {
                    arr.push(this.$store.state.content.tagList[tag]);
                }

                return arr;
            }
        },
        fetch({store, error}) {
            return apiGetMultiple([
                store.dispatch('content/fetchTagList').catch(() => '')
            ], error);
        },
        components: {
            CategoryItem
        },
        head() {
            return {
                title: 'Evil Angel'
            }
        }
    }
</script>

<style lang="scss">
    @import '~assets/scss/variables';

    .categories {
        padding-top: 1.5rem;
        &__title {
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
            font-weight: $font-weight-normal;
        }
        &__list {
            margin: 0;
            padding: 12px;
            list-style-type: none;
            background-color: $dark-two;
            @media (max-width: $sm) {
                padding: 0;
                margin-left: -16px;
                margin-right: -16px;
            }
            &-wr {
                @media (max-width: $sm) {
                    display: none;
                }
            }
        }
        &__item {
            @media (max-width: $sm) {
                border-top: 1px solid $charcoal-grey;
                &:last-of-type {
                    border-bottom: 1px solid $charcoal-grey;
                }
            }
        }
        &__link {
            font-size: .9375rem;
            line-height: 1.2;
            letter-spacing: .4px;
            color: $light-grey;
            display: block;
            @media (max-width: $sm) {
                padding: .5rem 0;
                text-align: center;
            }
        }
        &-tile {
            list-style-type: none;
            padding: 0;
        }
    }
</style>
