<template>
    <li class="col-6 col-md-4 col-lg-3 category-item">

        <nuxt-link :to="$routes.episodesByTag(category.id)" class="category-item__image-wr">
            <img class="category-item__image" :src="src" :alt="category.name" @error="imgUrlAlt = true">
        </nuxt-link>

        <div class="category-item__info">
            <nuxt-link :to="$routes.episodesByTag(category.id)" class="category-item__title">
                {{ category.name }}
            </nuxt-link>
            <span class="category-item__count">20 Scenes</span>
        </div>
    </li>
</template>

<script>
    const imageToShow = 1;

    export default {
        props:      {
            category: Object
        },
        data() {
            return {
                imgUrlAlt: false
            }
        },
        computed: {
            src() {
                if (this.imgUrlAlt) {
                    return 'https://via.placeholder.com/261x148/59606b/fffffff';
                }

                if (this.category.images && this.category.images[imageToShow]) {
                    return this.category.images[imageToShow][720];
                }
            },
            srcSet() {
                if (this.imgUrlAlt) {
                    return '';
                }

                if (this.category.srcSet) {
                    return this.item.srcSet[imageToShow];
                }
            },
        },
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .category-item {
        margin-bottom: 8px;
        @media (max-width: $sm) {
            margin-bottom: 4px;
        }
        &__image {
            width: 100%;
        }
        &__info {
            padding: .5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: $sm) {
                padding: .25rem 0;
                flex-direction: column;
                align-items: flex-start;
            }
        }
        &__title {
            font-size: 0.9375rem;
            letter-spacing: .4px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            @media (max-width: $sm) {
                font-size: 0.75rem;
                line-height: 1.33;
            }
        }
        &__count {
            font-size: 0.75rem;
            letter-spacing: .4px;
            color: $light-grey;
            white-space: nowrap;
            line-height: 1.33;
        }
    }
</style>
