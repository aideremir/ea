<template>
    <div class="director-page">
        <profile :item="director" :movies="movies" content-type="Director">
            <template slot="info-left-col">
                <div class="profile__info-item">
                    <div class="profile__views">1,016,567 views</div>
                </div>
                <div class="profile__info-item">
                    <div v-if="sceneCount" class="profile__scenes">{{ sceneCount }}</div>
                </div>
                <div class="profile__info-item">
                    <comments-button @toggle-comments="toggleComments" :count="3"></comments-button>

                </div>
            </template>
        </profile>

        <div v-if="showComments" class="container">
            <div class="row">
                <div class="col-12">
                    <div class="director-page__comments">
                        <div class="row">
                            <div class="col-6">
                                <comments content-type="Director"
                                          :content-id="director.id"></comments>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <content-list current-component="ContentItemScene" :content="paginator.data"
                      :title="`Scenes from ${director.name}`">
            <template slot="page-sort" v-if="paginator.data && paginator.data.length > 1">
                <page-sort :sort-options="sortOptions" :sort="sort" :url="$routes.director(director)"></page-sort>
            </template>
        </content-list>

        <pagination :paginator="paginator"
                    :path="$routes.director(director)"
                    :query="{sort: sort}"></pagination>
    </div>
</template>

<script>
    import Profile from 'components/profile';
    import ContentList from 'components/content-list/content-list';
    import PageSort from 'components/page-sort';
    import Pagination from 'node_modules/ea-components/pagination/pagination-bm';
    import CommentsButton from 'components/comments-button';
    import Comments from 'node_modules/ea-components/comments/comments';

    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import {mapState} from 'vuex';

    const PER_PAGE = 12;

    export default {
        auth: false,
        data() {
            return {
                paginator: {
                    data: []
                },
                showComments: false
            };
        },
        watchQuery: ['sort', 'page'],
        validate ({ params }) {
            return /^\d+$/.test(params.id);
        },
        computed:   {
            ...mapState('content', ['director', 'movies']),
            sceneCount() {
                if (this.director.sceneCount) {
                    return `${this.director.sceneCount} ${this.director.sceneCount === 1 ? 'scene' : 'scenes'}`;
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
                store.dispatch('content/fetchDirector', params.id),
                store.dispatch('content/fetchDirectorMovies', params.id),
            ], error);
        },
        asyncData({error, store, query, params}) {
            const sort = getSortFromQuery(query);

            return apiGetMultiple(
                [
                    store.dispatch('content/getPaginator', {
                        url: `/scenes?channelId=evilangel&_fields=id,title,slug,images,performers(id,slug,name),rating,liveDateStart,primaryImage&sort=${sort}&directorId=${params.id}`,
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
            Profile,
            ContentList,
            PageSort,
            Pagination,
            CommentsButton,
            Comments
        },
        head() {
            return {
                title: this.director.name,
                meta:  [
                    {
                        hid:     'description',
                        name:    'description',
                        content: ''
                    }
                ]
            }
        },
    }

    function getSortFromQuery(query) {
        return query.sort ? query.sort : 'newest';
    }

</script>

<style lang="scss">
    @import '~assets/scss/variables';

    .director-page {
        &__comments {
            border-top: $border-top-width solid $border-top-color;
        }
    }
</style>
