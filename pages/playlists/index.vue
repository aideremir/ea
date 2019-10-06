<template>
    <div class="playlists-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <library-title>Playlists</library-title>
                </div>
            </div>
        </div>
        <playlists-list :playlists="playlists" />
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';

    import LibraryTitle from '~/components/library/library-title';
    import PlaylistsList from '~/components/playlists-list/playlists-list';

    export default {
        components: {PlaylistsList, LibraryTitle},
        auth:   true,
        data() {
            return {
                playlists: [
                    {
                        id: 1,
                        title: 'Anal and Gaping',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/18314/free/images/720/18314-preview-720-0001.jpg',
                        },
                        sceneCount: 10
                    },
                    {
                        id: 2,
                        title: 'Best Cumshot Compilations',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/18296/free/images/720/18296-preview-720-0001.jpg'
                        },
                        sceneCount: 5
                    },
                    {
                        id: 3,
                        title: 'Bubble Butts',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/14617/free/images/720/14617-preview-720-0001.jpg'
                        },
                        sceneCount: 3
                    },
                    {
                        id: 4,
                        title: 'Redheads',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/18114/free/images/720/18114-preview-720-0001.jpg'
                        },
                        sceneCount: 39
                    },
                    {
                        id: 5,
                        title: 'Best Teens',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/15759/free/images/720/15759-preview-720-0001.jpg'
                        },
                        sceneCount: 26
                    },
                    {
                        id: 6,
                        title: 'All time faves',
                        images: {
                            1: 'https://cdn.evilangelvideo.com/paysites/scenes/18036/free/images/720/18036-preview-720-0001.jpg'
                        },
                        sceneCount: 1632
                    },
                ]
            }
        },
        // computed:   {
        //     ...mapState('content', ['playlists']),
        // },
        // fetch({store, error}) {
        //
        //     return apiGetMultiple([
        //         store.dispatch('content/fetchPlaylists', {limit: 12, id: 1})
        //     ], error);
        // },

        head() {
            return {
                title: 'Playlists | Evil Angel'
            }
        }
    }
</script>
<style lang="scss">


</style>
