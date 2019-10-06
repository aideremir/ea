<template>
    <div class="movie-index">
        <div class="container">
            <ul class="movie-index__list row">
                <content-item-movie v-for="performer in pornstars" :item="performer"
                                    :key="performer.id"></content-item-movie>
            </ul>
        </div>
    </div>
</template>

<script>
    import ContentItemMovie from 'components/content-list/content-item-movie';

    export default {
        auth: false,
        data() {
            return {
                movies: [
                    {
                        name: 'Blackmailed Housewives',
                        id: 1,
                        link: 'movies/9086/blackmailed-housewives'
                    },
                    {
                        name: 'Blackmailed Housewives',
                        id: 2,
                        link: 'movies/9086/blackmailed-housewives'
                    },
                    {
                        name: 'Blackmailed Housewives',
                        id: 3,
                        link: 'movies/9086/blackmailed-housewives'
                    },{
                        name: 'Blackmailed Housewives',
                        id: 4,
                        link: 'movies/9086/blackmailed-housewives'
                    },{
                        name: 'Blackmailed Housewives',
                        id: 5,
                        link: 'movies/9086/blackmailed-housewives'
                    },
                    {
                        name: 'Blackmailed Housewives',
                        id: 6,
                        link: 'movies/9086/blackmailed-housewives'
                    },
                    {
                        name: 'Blackmailed Housewives',
                        id: 7,
                        link: 'movies/9086/blackmailed-housewives'
                    },


                ]
            }
        },
        // computed:   {
        //     ...mapState('content', ['movies']),
        // },
        // fetch({params, error, store}) {
        //     return apiGetMultiple([
        //         store.dispatch('content/fetchMovies')
        //     ], error);
        // },
        components: {
            ContentItemMovie
        },
        head() {
            return {
                title: 'Movies',
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

</script>

<style lang="scss">
    @import '../../assets/scss/variables';


    .movie-index {
        &__list {
            padding: 0;
            list-style-type: none;
        }
    }


</style>
