<template>
    <div class="playlist-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <library-title>Anal and Gaping</library-title>
                    <div class="playlist-page__head">
                        <div class="playlist-page__head-info">
                            <span class="playlist-page__scenes-count"> {{ scenesCount }} </span>
                            <span class="playlist-page__update">Last updated 25 August, 2018</span>
                        </div>
                        <div class="playlist-page__head-control">

                        </div>
                    </div>
                    <div class="playlist-page__body">
                        <nuxt-link :to="$routes.scenes" class="btn btn--md btn--secondary btn--has-icon btn--play">Play All</nuxt-link>
                    </div>
                </div>
                <div class="col-12">
                    <library-list :data="newestScenes" extra-class="library__list--playlist" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    import {mapState} from 'vuex';
    import LibraryTitle from 'components/library/library-title';
    import LibraryList from 'components/library/library-list';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';

    export default {
        auth: false,
        components: {
            LibraryList,
            LibraryTitle,
            Popper
        },
        computed:   {
            ...mapState('content', ['newestScenes']),
          //  ...mapState('content', ['playlist']),
            scenesCount() {
                return `${this.newestScenes.length} ${this.newestScenes.length === 1 ? 'scene' : 'scenes'}`;
            }
        },
        fetch({store, error, params}) {
            return apiGetMultiple([
                //store.dispatch('content/fetchPlaylist', params.id)
                store.dispatch('content/fetchNewestScenes', params.id)
            ], error);
        },
        head() {
            return {
                title: 'Playlist | Evil Angel'
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/variables';
    @import '../../../assets/scss/mixins/px-rem';

    .playlist-page {
        &__head {
            padding-bottom: calculateRem(15px);
            border-bottom: 1px solid $charcoal-grey;
        }
        &__scenes-count {
            margin-right: calculateRem(10px);
        }
        &__update {
            font-size: calculateRem(12px);
            color: $light-grey;
            font-weight: $font-weight-light;
            letter-spacing: calculateRem(.4px);
        }
        &__body {
            padding: calculateRem(16px) 0;
        }
    }
</style>
