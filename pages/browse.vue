<template>
    <div class="browse">
        <div class="container form-dark-theme">
            <div class="row">
                <div class="col-12">
                    <div class="browse__head">
                        <h1 class="browse__title">{{ paginator.totalCount > 0 ? `${paginator.totalCount} scenes` :
                            `${paginator.totalCount} scene` }} match your criteria</h1>
                        <div class="browse__filter">
                            <div class="form-check browse__filter-item">
                                <input class="form-check-input" type="checkbox" checked id="showTrans">
                                <label class="form-check-label" for="showTrans">
                                    Show Trans
                                </label>
                            </div>

                            <div class="form-check browse__filter-item">
                                <input class="form-check-input" type="checkbox" id="showBisexual">
                                <label class="form-check-label" for="showBisexual">
                                    Show Bisexual
                                </label>
                            </div>
                            <app-button @click="resetFilters"
                                        child-class="browse__filter-item browse__filter-item--reset">Reset Filters
                            </app-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="browse__body">
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <div class="form-row">
                            <div class="col-12 col-lg-9 browse__filter-by">
                                <div class="form-row">
                                    <div class="col-12">
                                        <label>Filter by</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-12 col-md-4">
                                        <select-box :items="filterByOptions" v-model="filterConfig.filterBy"
                                                    @input="updateQuery"/>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <performer-select-box v-model="filterConfig.performerId" @input="updateQuery"/>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <director-select-box v-model="filterConfig.directorId" @input="updateQuery"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 browse__sort-by">
                                <div class="form-row">
                                    <div class="col-12">
                                        <label>Sort by</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-12">
                                        <select-box :items="sortByOptions" v-model="filterConfig.sortBy"
                                                    @input="updateQuery"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="browse__footer">
                <tag-filter @input="updateTagFilter" :included-ids="filterConfig.includedTagIds"
                            :excluded-ids="filterConfig.excludedTagIds" :enabled-ids="enabledTagIds"/>
            </div>
        </div>
        <div class="container">
            <ul class="row browse__result">
                <content-item-scene v-for="scene in paginator.data"
                                    :key="scene.id"
                                    :item="scene"></content-item-scene>
            </ul>
            <pagination :paginator="paginator"
                        :path="$routes.browse()" :query="filterConfig"></pagination>
        </div>
    </div>

</template>

<script>
    import SelectBox from 'components/select-box/select-box';
    import PerformerSelectBox from 'components/select-box/performer-select-box';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import ContentList from 'components/content-list/content-list';
    import TagFilter from 'components/tag-filter/tag-filter';
    import ContentItemScene from 'components/content-list/content-item-scene';
    import DirectorSelectBox from 'components/select-box/director-select-box';
    import AppButton from 'components/button';
    import Pagination from 'node_modules/ea-components/pagination/pagination-bm';
    import api from 'api/dispatcher';
    import flatMap from 'lodash.flatmap';
    import intersection from 'lodash.intersection';

    const PER_PAGE = 12;

    export default {
        auth: false,
        components: {
            DirectorSelectBox,
            SelectBox,
            PerformerSelectBox,
            ContentList,
            TagFilter,
            ContentItemScene,
            Pagination,
            AppButton
        },
        data() {
            return {
                paginator: {
                    data: []
                },
                sortByOptions: [
                    {name: 'Latest', value: 'newest'},
                    {name: 'Oldest', value: 'oldest'},
                    {name: 'Highest rated', value: 'top-rated'},
                    {name: 'Most viewed', value: 'most-viewed'},
                    {name: 'Upcoming', value: 'upcoming'},
                ],
                filterByOptions: [
                    {name: 'Scenes', value: 'scenes'},
                    {name: 'Movies', value: 'movies'},
                    {name: 'Pictures', value: 'pictures'},
                    {name: 'Extras', value: 'extras'},
                ],
                filterConfig: {
                    filterBy: 'scenes',
                    performerId: null,
                    directorId: null,
                    sortBy: 'newest',
                    includedTagIds: [],
                    excludedTagIds: [],
                },
                selectedPerformer: null,
            };
        },
        computed: {
            allTagIds() {
                return Object.keys(this.$store.state.content.tagList).map(id => +id);
            },
            enabledTagIds() {
                let enabledTagIds = this.allTagIds;

                if (this.filterConfig.directorId) {
                    const director = this.$store.state.content.directors.find(director => director.id === this.filterConfig.directorId);
                    enabledTagIds = intersection(enabledTagIds, flatMap(director.contentTags, tag => tag.id));
                }

                if (this.selectedPerformer) {
                    enabledTagIds = intersection(enabledTagIds, flatMap(this.selectedPerformer.contentTags, tag => tag.id));
                }

                return enabledTagIds;
            }
        },
        watchQuery: true,
        asyncData({error, store, query}) {
            query = getFullQuery(query);

            const requests = [
                store.dispatch('content/fetchTagList').catch(() => ''),
                store.dispatch('content/fetchDirectors', {
                    limit: 100,
                    fields: 'id,name,contentTags(id)'
                }).catch(() => ''),
                store.dispatch('content/getPaginator', {
                    url: `/scenes?channelId=evilangel&contentTagId=${query.includedTagIds && query.includedTagIds.length ? query.includedTagIds[0] : ''}&performerId=${query.performerId || ''}&directorId=${query.directorId || ''}&_fields=id,title,slug,images,performers(id,slug,name),directors(id,slug,name),rating,liveDateStart,isInWatchLater,primaryImage&sort=${query.sortBy}`,
                    page: query.page,
                    perPage: PER_PAGE,
                    entity: 'scene'
                }),
            ];

            if (query.performerId) {
                requests.push(api.performer(query.performerId, 'id,name,contentTags(id)')); // todo: need to avoid this request
            }

            return apiGetMultiple(
                requests,
                error,
                promiseAllResponse => {
                    return {
                        paginator: promiseAllResponse[2],
                        filterConfig: query,
                        selectedPerformer: promiseAllResponse[3] ? promiseAllResponse[3].data : null,
                    };
                }
            );
        },
        methods: {
            updateTagFilter(tags) {
                this.filterConfig.includedTagIds = tags.includedTagIds;
                this.filterConfig.excludedTagIds = tags.excludedTagIds;
                this.updateQuery();
            },
            updateQuery() {
                this.$router.replace({path: 'browse', query: prepareQuery(this.filterConfig)});
            },
            resetFilters() {
                this.filterConfig = {
                    filterBy: 'scenes',
                    performerId: null,
                    directorId: null,
                    sortBy: 'newest',
                    includedTagIds: [],
                    excludedTagIds: [],
                };

                this.updateQuery();
            },
        },
        head() {
            return {
                title: 'Browse | Evil Angel'
            };
        }
    };

    function getFullQuery(query) {
        query = Object.assign({}, query);

        query.includedTagIds = query.includedTagIds ? query.includedTagIds.split(',').map(id => +id) : [];
        query.excludedTagIds = query.excludedTagIds ? query.excludedTagIds.split(',').map(id => +id) : [];

        if (!query.performerId) {
            query.performerId = null;
        } else {
            query.performerId = +query.performerId;
        }

        if (!query.directorId) {
            query.directorId = null;
        } else {
            query.directorId = +query.directorId;
        }

        if (!query.filterBy) {
            query.filterBy = 'scenes';
        }
        if (!query.sortBy) {
            query.sortBy = 'newest';
        }

        return query;
    }

    function prepareQuery(query) {
        return Object.assign({}, query, {
            includedTagIds: query.includedTagIds.join(','),
            excludedTagIds: query.excludedTagIds.join(','),
        });
    }

</script>
