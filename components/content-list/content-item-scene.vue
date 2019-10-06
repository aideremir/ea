<template>
    <li class="col-12 col-sm-6 col-xl-4 col-xxxl-3 content-item-scene" :class="extraClass">
        <nuxt-link :to="$routes.scene(item)" class="content-item-scene__image-wr">
            <img class="content-item-scene__image"
                 :src="src"
                 sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, (max-width: 1730px) 33vw, 390px"
                 :srcset="srcSet"
                 :alt="item.title"
                 @error="imgUrlAlt = true">
        </nuxt-link>
        <div class="content-item-scene__info">
            <div class="content-item-scene__col content-item-scene__col--main">
                <nuxt-link :to="$routes.scene(item)" class="content-item-scene__title">
                    {{ item.title }}
                </nuxt-link>
                <div v-if="item.directors && item.directors.length" class="content-item-scene__persons">
                    <div class="content-item-scene__performers">
                        Director: <link-list :links="item.directors" :route="$routes.director"></link-list>
                    </div>
                    <div v-if="item.performers && item.performers.length" class="content-item-scene__persons">
                        Starring: <link-list :links="item.performers" :route="$routes.performer"></link-list>
                    </div>
                </div>
            </div>
            <div class="content-item-scene__col content-item-scene__col--auxiliary">
                <div v-if="item.liveDateStart" class="content-item-scene__date">
                    {{ item.liveDateStart | humanDate('D MMMM, YYYY')}}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import LinkList from 'components/link-list';

    const imageToShow = 1;

    export default {
        props:      {
            item: Object,
            extraClass: String
        },
        data() {
            return {
                imgUrlAlt: false
            }
        },
        computed: {
            src() {
                if (this.imgUrlAlt) {
                    return 'https://via.placeholder.com/648x364/59606b/fffffff';
                }

                if (this.item.images && this.item.images[imageToShow]) {
                    return this.item.images[imageToShow][720];
                }
            },
            srcSet() {
                if (this.imgUrlAlt) {
                    return '';
                }

                if (this.item.srcSet) {
                    return this.item.srcSet[imageToShow];
                }
            },
        },
        components: {
            LinkList
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";
    @import "~assets/scss/mixins/px-rem";

    .content-item-scene {
        margin-bottom: 16px;
        &__info {
            padding: calculateRem(8px) 0;
            display: flex;
            flex-wrap: wrap;
        }
        &__col {
            &--main {
                margin-right: auto;
                padding-right: calculateRem(5px);
                flex: 1 0 auto;
                max-width: 80%;
                @media (max-width: $lg) {
                    margin-bottom: calculateRem(4px);
                    max-width: none;
                    flex: 1 0 100%;
                }
            }
            &--auxiliary {
                flex: 0 1 auto;
            }
        }
        &__image {
            width: 100%;
            &-wr {
                display: block;
            }
        }
        &__title {
            margin-bottom: calculateRem(5px);
            font-size: calculateRem(15px);
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &__date {
            font-size: calculateRem(12px);
            color: $light-grey;
            line-height: 1.5;
            letter-spacing: calculateRem(.4px);
            font-weight: $font-weight-light;
        }
        &__persons{
            font-size: calculateRem(12px);
            color: $light-grey;
            letter-spacing: .4px;
            font-weight: $font-weight-light;
        }
    }

    .content-item-in-single-row {
        &:nth-of-type(4) ~ li {
            display: none;
        }

        @media (max-width: $xxxl)  and (min-width: $xl) {
            &:nth-of-type(3) ~ li {
                display: none;
            }
        }
    }

    .content-item-in-double-row {
        &:nth-of-type(8) ~ li {
            display: none;
        }

        @media (max-width: $xxxl)  and (min-width: $xl) {
            &:nth-of-type(6) ~ li {
                display: none;
            }
        }

        @media (max-width: $xl) {
            &:nth-of-type(4) ~ li {
                display: none;
            }
        }
    }

    .content-item-in-triple-row {
        &:nth-of-type(12) ~ li {
            display: none;
        }

        @media (max-width: $xxxl)  and (min-width: $xl) {
            &:nth-of-type(9) ~ li {
                display: none;
            }
        }
    }


</style>
