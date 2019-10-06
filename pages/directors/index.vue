<template>
    <div class="browse form-dark-theme">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="browse__head">
                        <h1 class="browse__title">652 Directors match your criteria</h1>
                        <div class="browse__filter">
                            <app-button child-class="browse__filter-item browse__filter-item--reset">Reset Filters</app-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="browse__body">
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <div class="form-row">
                            <div class="col-12 col-lg-3 browse__filter-by">
                                <div class="form-row">
                                    <div class="col-12">
                                        <label>Filter by</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-12">
                                        <div class="relative">
                                            <popper trigger="click" :options="{placement: 'bottom-start'}">
                                                <app-button slot="reference" class="browse__select" child-class="form-control form-control--small form-control-select">All Directors</app-button>

                                                <div class="popper popper--no-arrow popper--fluid">
                                                    <div class="popper__head">
                                                        <input placeholder="Search" type="text" class="form-control form-control--small">
                                                    </div>
                                                    <div class="popper__body popper__body--has-scroll">
                                                        <ul class="popper__list">
                                                            <li class="active">
                                                                All Pornstars
                                                            </li>
                                                            <li>
                                                                Aailyah Hadid
                                                            </li>
                                                            <li>
                                                                Aailyah Love
                                                            </li>
                                                            <li>
                                                                Aarielle Alexis
                                                            </li>
                                                            <li>
                                                                Abbey B
                                                            </li>
                                                            <li>
                                                                Aailyah Hadid
                                                            </li>
                                                            <li>
                                                                Aailyah Love
                                                            </li>
                                                            <li>
                                                                Aarielle Alexis
                                                            </li>
                                                            <li>
                                                                Abbey B
                                                            </li>
                                                            <li>
                                                                Aailyah Hadid
                                                            </li>
                                                            <li>
                                                                Aailyah Love
                                                            </li>
                                                            <li>
                                                                Aarielle Alexis
                                                            </li>
                                                            <li>
                                                                Abbey B
                                                            </li>
                                                            <li>
                                                                Aailyah Hadid
                                                            </li>
                                                            <li>
                                                                Aailyah Love
                                                            </li>
                                                            <li>
                                                                Aarielle Alexis
                                                            </li>
                                                            <li>
                                                                Abbey B
                                                            </li>
                                                            <li>
                                                                Aailyah Hadid
                                                            </li>
                                                            <li>
                                                                Aailyah Love
                                                            </li>
                                                            <li>
                                                                Aarielle Alexis
                                                            </li>
                                                            <li>
                                                                Abbey B
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </popper>
                                        </div>
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
                                        <div class="relative">
                                            <popper trigger="click" :options="{placement: 'bottom-start'}">
                                                <app-button slot="reference" class="browse__select" child-class="form-control form-control--small form-control-select">Newest</app-button>

                                                <div class="popper popper--no-arrow popper--fluid">
                                                    <div class="popper__body">
                                                        <ul class="popper__list">
                                                            <li class="active">
                                                                <app-button>Newest</app-button>
                                                            </li>
                                                            <li>
                                                                <app-button>Oldest</app-button>
                                                            </li>
                                                            <li>
                                                                <app-button>Highest rated</app-button>
                                                            </li>
                                                            <li>
                                                                <app-button>Most viewed</app-button>
                                                            </li>
                                                            <li>
                                                                <app-button>Upcoming</app-button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </popper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="browse__footer">
                <div class="row">
                    <div class="col-12">
                        <tag-filter v-if="showAllTags" :tags="tags"></tag-filter>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <ul class="row browse__result">
                <content-item-person v-for="person in directors"
                                     :key="person.id"
                                     :item="person"></content-item-person>
            </ul>
        </div>


    </div>

</template>

<script>
    import Popper from 'vue-popperjs';
    import {mapState} from 'vuex';
    import {apiGetMultiple} from '../../../../shared/services/utils';
    import ContentList from 'components/content-list/content-list';
    import TagFilter from 'components/tag-filter/tag-filter';
    import ContentItemPerson from 'components/content-list/content-item-person';
    import AppButton from 'components/button';

    export default {
        auth:   false,
        components: {
            Popper,
            ContentList,
            TagFilter,
            ContentItemPerson,
            AppButton
        },
        data() {
            return {
                showAllTags: true
            }
        },
        computed:   {
            ...mapState('content', ['directors']),
            tags() {
                let arr = [];

                for (let tag in this.$store.state.content.tagList) {
                    arr.push(this.$store.state.content.tagList[tag]);
                }

                return arr;
            }
        },
        fetch({store, error}) {
            return apiGetMultiple([
                store.dispatch('content/fetchDirectors', {limit: 20}).catch(() => ''),
                store.dispatch('content/fetchTagList').catch(() => '')
            ], error);
        },
        head() {
            return {
                title: 'Directors | Evil Angel'
            }
        }
    }
</script>
