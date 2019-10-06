<template>
    <div class="performer-page">

        <profile :item="performer" :movies="movies" content-type="Performer">
            <template slot="info-left-col">
                <div class="profile__info-item">
                    <div class="profile__views">1,016,567 views</div>
                </div>
                <div class="profile__info-item">
                    <div v-if="sceneCount" class="profile__scenes">{{ sceneCount }}</div>
                </div>
                <div class="profile__info-item">
                    <comments-button @toggle-comments="toggleComments" :count="performer.commentCount"></comments-button>
                </div>
            </template>
        </profile>

        <div v-if="showComments" class="container">
            <div class="row">
                <div class="col-12">
                    <div class="performer-page__comments">
                        <div class="row">
                            <div class="col-6">
                                <comments content-type="Performer"
                                          :content-id="performer.id"></comments>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <content-list v-if="paginator.data"
                      :title="`Scenes with ${performer.name}`"
                      :content="paginator.data"
                      current-component="ContentItemScene">
            <template slot="page-sort" v-if="paginator.data && paginator.data.length > 1">
                <page-sort :sort-options="sortOptions" :sort="sort" :url="$routes.performer(performer)"></page-sort>
            </template>
        </content-list>

        <pagination :paginator="paginator"
                    :path="$routes.performer(performer)"
                    :query="{sort: sort}"></pagination>
    </div>
</template>

<script>
    import Profile from 'components/profile';
    import ContentList from 'components/content-list/content-list';
    import PageSort from 'components/page-sort';
    import CommentsButton from 'components/comments-button';
    import Comments from 'node_modules/ea-components/comments/comments';
    import Pagination from 'node_modules/ea-components/pagination/pagination-bm';

    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import {mapState} from 'vuex';

    const PER_PAGE = 12;

    export default {
        auth: false,
        watchQuery: ['sort', 'page'],

        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        data() {
            return {
                paginator: {
                    data: []
                },
                showComments: false
            }
        },
        computed: {
            ...mapState('content', ['performer', 'movies']),
            sceneCount() {
                if (this.performer.sceneCount) {
                    return `${this.performer.sceneCount} ${this.performer.sceneCount === 1 ? 'scene' : 'scenes'}`;
                }
            },
            sortOptions() {
                return {
                    'newest':      'Latest',
                    'most-viewed': 'Most Viewed',
                    'top-rated':   'Top Rated'
                }
            },
            sort() {
                return getSortFromQuery(this.$route.query);
            }
        },
        methods: {
            toggleComments(showComments) {
                this.showComments = showComments;
            }
        },
        fetch({params, error, store}) {
            return apiGetMultiple([
                store.dispatch('content/fetchPerformer', params.id),
                store.dispatch('content/fetchPerformerMovies', params.id),
            ], error);
        },
        asyncData({error, store, query, params}) {
            const sort = getSortFromQuery(query);

            return apiGetMultiple(
                [
                    store.dispatch('content/getPaginator', {
                        url: `/scenes?channelId=evilangel&_fields=id,title,images,directors(id,slug,name),performers(id,slug,name),liveDateStart,slug&sort=${sort}&performerId=${params.id}`,
                        page: query.page,
                        perPage: PER_PAGE,
                        entity: 'scene'
                    }),
                ],
                error,
                promiseAllResponse => {
                    return {
                        paginator: promiseAllResponse[0]
                    };
                }
            );
        },
        components: {
            PageSort,
            Profile,
            ContentList,
            CommentsButton,
            Comments,
            Pagination
        },
        head() {
            return {
                title: this.performer.name,
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

    function getSortFromQuery(query) {
        return query.sort ? query.sort : 'newest';
    }

</script>

<style lang="scss">
    @import '~assets/scss/variables';

    .performer-page {
        &__comments {
            border-top: $border-top-width solid $border-top-color;
        }
    }
</style>
