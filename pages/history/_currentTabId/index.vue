<template>
    <div class="history-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <library-title>History</library-title>
                </div>
                <div class="col-12">
                    <library-tabs :tabs="tabs" :current-tab-id="currentTabId" :route="$routes.history" />
                </div>
                <div class="col-12">
                    <library-list :data="tabData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    import {mapState} from 'vuex';
    import LibraryTitle from '../../../components/library/library-title';
    import LibraryTabs from '../../../components/library/library-tabs';
    import LibraryList from '../../../components/library/library-list';

    export default {
        auth:   true,
        components: {
            LibraryList,
            LibraryTabs,
            LibraryTitle,
            Popper
        },
        data() {
            return {
                tabs: [
                    {title: 'Scenes', id: 'scenes'},
                    {title: 'Movies', id: 'movies'},
                    {title: 'Pictures', id: 'pictures'},
                    {title: 'Extras', id: 'extras'},
                ],
            }
        },
        computed:   {
            ...mapState('content', ['historyScenes', 'historyMovies']),
            currentTabId() {
                return this.$route.params.currentTabId;
            },
            tabData() {
                if (this.currentTabId === 'scenes') {
                    return this.historyScenes;
                } else if (this.currentTabId === 'movies') {
                    return this.historyMovies;
                }
            }
        },
        fetch({store, params}) {
            if (params.currentTabId === 'scenes') {
                return store.dispatch('content/fetchHistoryScenes', {limit: 12, id: 1}).catch(() => '');
            } else if (params.currentTabId === 'movies') {
                return store.dispatch('content/fetchHistoryMovies', {limit: 12, id: 1}).catch(() => '');
            }
        },
        head() {
            return {
                title: 'History | Evil Angel'
            }
        }
    }
</script>
