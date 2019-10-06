<template>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="profile">
                        <div class="row">
                            <div class="col-12 col-sm-auto">
                                <div class="profile__image-wr">
                                    <img class="profile__image" :src="src"
                                         sizes="(max-width: 575px) 100vw, 216px"
                                         :srcset="srcSet"
                                         @error="imgUrlAlt = true"
                                         :alt="item.name">
                                </div>
                            </div>
                            <div class="col">
                                <div class="profile__header">
                                    <h1 class="profile__name">{{ item.name || item.title }}</h1>
                                    <div class="profile__info">
                                        <div class="profile__info-col">
                                            <slot name="info-left-col"></slot>
                                        </div>
                                        <div class="profile__info-col">
                                            <div class="profile__info-item">
                                                <app-button child-class="btn--has-icon btn--favorite">
                                                    <span>Favorite</span>
                                                </app-button>
                                            </div>
                                            <div class="profile__info-item">
                                                <rating :content-type="contentType"
                                                        :content-id="item.id"
                                                        :up-votes="item.upvotes"
                                                        :down-votes="item.downvotes"></rating>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="profile__body">
                                    <div class="profile__body-row">
                                        <details-info :type="detailsInfoType">
                                            <div v-if="movies" class="details__row">
                                                <div class="details__cell">
                                                    Filmography
                                                </div>
                                                <div class="details__cell">
                                                    <link-list :route="$routes.movie" :links="movies"></link-list>
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
                                            <div v-if="item.releaseDate" class="details__row">
                                                <div class="details__cell">
                                                    Released
                                                </div>
                                                <div class="details__cell">
                                                    {{ item.releaseDate | humanDate('MM-DD-YYYY')}}
                                                </div>
                                            </div>
                                        </details-info>
                                    </div>
                                    <div v-if="item.bio || item.synopsis" class="profile__body-row">
                                        <show-more-block extra-class="show-more-block--profile">{{ item.bio || item.synopsis }}</show-more-block>
                                    </div>
                                    <div class="profile__body-row">
                                        <tag-list :tags="item.contentTags"></tag-list>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>

<script>

    import CommentsButton from 'components/comments-button';
    import DetailsInfo from 'components/details-info';
    import ShowMoreBlock from 'components/show-more-block';
    import LinkList from 'components/link-list';
    import TagList from 'components/tag-list/tag-list';
    import Rating from 'components/rating';
    import AppButton from 'components/button';

    const imageToShow = 1;

    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            movies: Array,
            contentType: {
                type: String,
                required: true,
                validator: function (value) {
                    return ['Director', 'Performer', 'Movie'].indexOf(value) !== -1
                }
            },
        },
        data() {
            return {
                imgUrlAlt: false
            }
        },
        computed: {
            detailsInfoType() {
                return this.contentType === 'Movie' ? 'table' : '';
            },
            src() {
                if (this.imgUrlAlt) {
                    return 'https://via.placeholder.com/300x434/59606b/fffffff';
                }

                if (this.item.images && this.item.images[imageToShow]) {
                    return this.item.images[imageToShow][360];
                } else {
                    return '';
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
            CommentsButton,
            DetailsInfo,
            ShowMoreBlock,
            TagList,
            LinkList,
            Rating,
            AppButton
        }
    };

</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .profile {
        padding: calculateRem(24px) 0;
        &__image-wr {
            margin-bottom: .5rem;
            max-width: calculateRem(216px);
            @media (max-width: $sm) {
                margin-bottom: 1rem;
                max-width: none;
            }
            img {
                width: 100%;
            }
        }
        &__header {
            padding-bottom: .625rem;
        }
        &__name {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            letter-spacing: .3px;
            font-weight: $font-weight-normal;
            @media (max-width: $sm) {
                margin-bottom: 1rem;
            }
        }
        &__info {
            display: flex;
            justify-content: space-between;
            &-col {
                margin: -.25rem;
                display: flex;
            }
            &-item {
                margin: 0 .25rem;
            }
        }
        &__body {
            padding-top: .875rem;
            border-top: 1px solid $border-top-color;
            &-row {
                padding-bottom: 1rem;
            }
        }
    }



</style>
