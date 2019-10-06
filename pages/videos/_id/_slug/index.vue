<template>
    <div class="video-page">
        <div class="container" :class="{'container-fluid cinema-mode': cinemaMode}">
            <div class="row">
                <div class="col-12" :class="{'col-xl-9': !cinemaMode}">
                    <div class="player-placeholder">
                        <!--<video-player ref="player"-->
                        <!--:scene="scene"-->
                        <!--:limit-promo-views="!isLoggedIn"-->
                        <!--:is-trailer-initial="isTrailerInitial"-->
                        <!--:is-age-validation-required="isAgeValidationRequired"-->
                        <!--:final-banner="finalBanner"-->
                        <!--@validate-age="validateAge()"></video-player>-->
                        <video-player ref="player"
                                      :scene="scene"
                                      :limit-promo-views="!isLoggedIn"
                                      :is-trailer-initial="true"
                                      @cinema-mode-toggle="cinemaMode = !cinemaMode"></video-player>
                    </div>
                </div>
                <div v-if="!cinemaMode" class="col-12 col-xl-3">
                    <div class="upgrade-form">
                        <div class="upgrade-form__inner">
                            <div class="upgrade-form__header">
                                Get access to the biggest library of <span>Anal</span>, <span>Gaping</span>,
                                <span>DP</span> and <span>Ass Worship</span> online!
                            </div>

                            <div class="form-steps form-steps--small">
                                <div class="form-steps__header">
                                    <div class="form-steps__step-number">
                                        step 1 of 3
                                    </div>
                                    <div class="form-steps__title">Select your plan</div>
                                </div>
                            </div>
                            <product-list :products="products" class="product-list product-list--small"
                                          v-model="selectedProduct"/>
                            <div>
                                <a href="" @click.prevent="submit"
                                   class="btn btn--lg btn--secondary btn--block">
                                    Continue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-9">
                    <div class="video__header">
                        <h1 class="video__name">{{ scene.title }}</h1>
                        <div class="video__info">
                            <div class="video__info-col">
                                <div class="video__info-item">
                                    <div class="video__views">1,016,567 views</div>
                                </div>
                                <div class="video__info-item hide-lg-down">
                                    <app-button child-class="btn--has-icon btn--download">Download</app-button>
                                </div>
                                <div class="video__info-item hide-lg-down">
                                    <app-button child-class="btn--has-icon btn--play">Trailer</app-button>
                                </div>
                                <div class="video__info-item hide-lg-down">
                                    <app-button child-class="btn--has-icon btn--gallery">Image Gallery</app-button>
                                </div>
                                <div class="video__info-item hide-lg-down">
                                    <comments-button @toggle-comments="toggleComments" :count="3"></comments-button>
                                </div>
                            </div>
                            <div class="video__info-col">
                                <div class="video__info-item hide-lg-down">
                                    <app-button child-class="btn--has-icon btn--playlist">Add to Playlist</app-button>
                                </div>
                                <div class="video__info-item">
                                    <app-button child-class="btn--has-icon btn--favorite"><span>Favorite</span></app-button>
                                </div>
                                <div class="video__info-item">
                                    <rating content-type="Scene"
                                            :content-id="scene.id"
                                            :up-votes="scene.upvotes"
                                            :down-votes="scene.downvotes"></rating>
                                </div>
                                <div class="video__info-item hide-lg-up">
                                    <comments-button @toggle-comments="toggleComments" :count="3"></comments-button>
                                </div>
                                <popper trigger="click" :options="{placement: 'bottom-end'}">
                                <button slot="reference" class="options-button hide-lg-up">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                                <div class="popper popper--no-arrow">
                                    <div class="popper__body">
                                        <ul class="popper__list">
                                            <li>
                                                <app-button>Download Scene</app-button>
                                            </li>
                                            <li>
                                                <app-button>Watch Trailer</app-button>
                                            </li>
                                            <li>
                                                <app-button>Image Gallery</app-button>
                                            </li>
                                            <li>
                                                <app-button>Add to Playlist</app-button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </popper>
                            </div>
                        </div>
                    </div>
                    <div class="video__body">
                        <div class="video__body-row">
                            <details-info type="table">
                                <div v-if="scene.performers && scene.performers.length" class="details__row">
                                    <div class="details__cell">
                                        Pornstars
                                    </div>
                                    <div class="details__cell">
                                        <link-list :route="$routes.performer"
                                                   :links="scene.performers"></link-list>
                                    </div>
                                </div>
                                <div v-if="scene.directors && scene.directors.length" class="details__row">
                                    <div class="details__cell">
                                        Director
                                    </div>
                                    <div class="details__cell">
                                        <link-list :route="$routes.director" :links="scene.directors"></link-list>
                                    </div>
                                </div>
                                <div v-if="scene.movies && scene.movies.length" class="details__row">
                                    <div class="details__cell">
                                        Movie/s
                                    </div>
                                    <div class="details__cell">
                                        <link-list :route="$routes.movie" :links="scene.movies"></link-list>
                                    </div>
                                </div>
                                <div v-if="scene.runtime" class="details__row">
                                    <div class="details__cell">
                                        Runtime
                                    </div>
                                    <div class="details__cell">
                                        {{ scene.runtime }}
                                    </div>
                                </div>
                                <div v-if="scene.liveDateStart" class="details__row">
                                    <div class="details__cell">
                                        Released
                                    </div>
                                    <div class="details__cell">
                                        {{ scene.liveDateStart | humanDate('MM-DD-YYYY')}}
                                    </div>
                                </div>
                            </details-info>
                        </div>
                        <div class="video__body-row">
                            <show-more-block extra-class="show-more-block--profile">
                                Hailing from Milwaukee, Aidra Fox is a talented temptress with
                                an insatiable sexual appetite. Her first taste of the adult business
                                was as a cam-girl in 2013, when she was 18. She soon made the full
                                jump into hardcore pro porn. Aidra has performed in a wide variety
                                of sex scenes and has been recognized with multiple AVN Awards. She's
                                of Czech, German and Polish descent. Aidra plans on working in the
                                industry for a long time and hopes to one day try her hand at directing
                                films.

                                For Blackmailed.com, Aidra plays a sneaky stepdaughter texting nude selfies
                                to random guys. Her stepfather is infuriated to receive one of these pics
                                in a wayward text. He threatens to expose the truth to the young beauty's
                                mother if Aidra won't comply with his sexual demands.
                            </show-more-block>
                        </div>
                        <div class="video__body-row">
                            <tag-list :tags="scene.contentTags"></tag-list>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showComments" class="row">
                <div class="col-12 col-md-9">
                    <comments
                            content-type="Scene"
                            :content-id="scene.id"></comments>
                </div>
            </div>
        </div>
        <content-list v-if="newestScenes"
                      :title="'Latest Evil Angel Scenes'"
                      :content="newestScenes"
                      :show-more-link="$routes.scenes()"
                      :current-scene-id="scene.id"
                      :item-extra-class="'content-item-in-double-row'"
                      current-component="ContentItemScene"></content-list>

        <content-list v-if="scene.performers && scene.performers.length"
                      :title="`More from ${scene.performers[0].name}`"
                      :content="performerScenes"
                      :show-more-link="$routes.scenes()"
                      :current-scene-id="scene.id"
                      :item-extra-class="'content-item-in-single-row'"
                      current-component="ContentItemScene"></content-list>

        <content-list-tag-scenes v-for="tag in tagLists"
                                 :tag="tag"
                                 :show-more-link="$routes.episodesByTag(tag)"
                                 :current-scene-id="scene.id"
                                 :key="tag.id"
                                 :item-extra-class="'content-item-in-single-row'"></content-list-tag-scenes>
    </div>
</template>

<script>
    import api from 'api/dispatcher';
    import Popper from 'vue-popperjs';
    import VideoPlayer from 'components/video-player';
    import ContentList from 'components/content-list/content-list';
    import ContentListTagScenes from 'components/content-list/content-list-tag-scenes';
    import DetailsInfo from 'components/details-info';
    import LinkList from 'components/link-list';
    import ShowMoreBlock from 'components/show-more-block';
    import Rating from 'components/rating';
    import TagList from 'components/tag-list/tag-list';
    import CommentsButton from 'components/comments-button';
    import Comments from 'node_modules/ea-components/comments/comments';
    import ProductList from 'components/product-list';
    import AppButton from 'components/button';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import orderBy from 'lodash.orderby';
    import {mapGetters, mapState} from 'vuex';

    export default {
        auth: false,
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        data() {
            return {
                cinemaMode: false,
                products: [],
                selectedProduct: null,
                showComments: false
            };
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn',
                isEmailConfirmed: 'auth/isEmailConfirmed',
                hasPurchaseToken: 'auth/hasPurchaseToken'
            }),
            ...mapState({
                scene: state => state.content.scene,
            }),
            newestScenes() {
                return this.$store.state.content.newestScenes.filter((item) => {
                    return item.id !== this.scene.id;
                }).slice(0, 8);
            },
            performerScenes() {
                return this.$store.state.content.performerScenes.filter((item) => {
                    return item.id !== this.scene.id;
                }).slice(0, 4);
            },
            tagLists() {
                return this.scene.topTagIds.map(tagId => {
                    return this.$store.state.content.tagList[tagId];
                });
            }
        },
        methods: {
            submit() {
                return this.$store.dispatch('content/setPurchaseProduct', this.selectedProduct).then(() => {
                    this.$router.push(this.$routes.purchase());
                });
            },
            toggleComments(showComments) {
                this.showComments = showComments;
            }
        },
        asyncData({error}) {
            return api.getProducts(false).then(response => {
                return {
                    products: response.data,
                    selectedProduct: orderBy(response.data, ['price'], ['asc']).find(product => product.price > 0)
                };
            }).catch((e) => {
                error({statusCode: e.response.status});
            });
        },
        fetch({store, error, params}) {
            return apiGetMultiple([
                store.dispatch('content/fetchScene', params.id)
                    .then(() => {
                        let promises = [];
                        if (store.state.content.scene.performers.length > 0) {
                            promises.push(store.dispatch('content/fetchPerformerScenes', {
                                id: store.state.content.scene.performers[0].id,
                                limit: 5
                            }));
                        }

                        promises.push(store.dispatch('content/fetchTagList')
                            .then(() => {
                                for (let tagId of store.state.content.scene.topTagIds) {
                                    store.dispatch('content/fetchTagScenes', {id: tagId, limit: 5});
                                }
                            }));

                        return Promise.all(promises);
                    }),
                store.dispatch('content/fetchNewestScenes').catch(() => ({})),
            ], error);
        },
        components: {
            Popper,
            VideoPlayer,
            CommentsButton,
            ContentList,
            ContentListTagScenes,
            DetailsInfo,
            LinkList,
            ShowMoreBlock,
            TagList,
            Comments,
            ProductList,
            Rating,
            AppButton
        },
        head() {
            return {
                title: '',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: ''
                    }
                ]
            };
        },
    };
</script>

<style lang="scss">
    @import '../../../../assets/scss/variables';
    @import '../../../../assets/scss/mixins/px-rem';

    .video {
        &__header {
            padding-bottom: .625rem;
        }
        &__name {
            margin: 1.5rem 0;
            font-size: 1.25rem;
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
                margin: 0 -.25rem;
                display: flex;
            }
            &-item {
                margin: 0 .25rem;
            }
        }
        &__body {
            padding-top: .875rem;
            border-top: $border-top-width solid $border-top-color;
            border-bottom: $border-top-width solid $border-top-color;
            &-row {
                padding-bottom: 1rem;
            }
        }
        &__desktop-buttons {
            display: flex;
            flex: 1;
            @media (max-width: $lg) {
                display: none;
            }
        }
    }

    .options-button {
        margin-left: 20px;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span {
            margin-bottom: 2px;
            width: 4px;
            height: 4px;
            display: block;
            border-radius: 50%;
            background-color: #fff;
        }

    }

    .upgrade-form__inner {
        margin: auto;
        max-width: calculateRem(520px);
    }


</style>
