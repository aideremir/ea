<template>
    <div class="favorites-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <library-title>Favorites</library-title>
                </div>
                <div class="col-12">
                    <library-tabs :tabs="tabs" :current-tab-id="currentTabId" :route="$routes.favorites"  />
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
        auth: false,
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
                    {title: 'Pornstars', id: 'pornstars'}
                ],
            }
        },
        computed:   {
            ...mapState('content', ['favoriteScenes', 'favoriteMovies', 'favoritePerformers']),
            currentTabId() {
                return this.$route.params.currentTabId;
            },
            tabData() {
                if (this.currentTabId === 'scenes') {
                    return this.favoriteScenes;
                } else if (this.currentTabId === 'movies') {
                    return this.favoriteMovies;
                } else if (this.currentTabId === 'pornstars') {
                    return this.favoritePerformers;
                }
            }
        },
        fetch({store, error, params}) {
           if (params.currentTabId === 'scenes') {
               return store.dispatch('content/fetchFavoriteScenes', {limit: 12, id: 1}).catch(() => '');

           } else if (params.currentTabId === 'movies') {
               return store.dispatch('content/fetchFavoriteMovies', {limit: 12, id: 1}).catch(() => '');
           }
           else if (params.currentTabId === 'pornstars') {
               return store.dispatch('content/fetchFavoritePerformers', {limit: 12, id: 1}).catch(() => '');
           }
        },
        head() {
            return {
                title: 'Favorites | Evil Angel'
            }
        }
    }
</script>
