<template>
    <div>

        <carousel :slides="carouselScenes"
                  :settings="{
                        autoplay: true,
                        interval: 8000,
                        height: '24.4%',
                        navigationEnabled: true,
                        fluidSlider: true }"></carousel>

        <content-list v-if="newestScenes"
                      :title="'Latest Evil Angel Scenes'"
                      :content="newestScenes"
                      :show-more-link="$routes.browse()"
                      :item-extra-class="'content-item-in-triple-row'"
                      current-component="ContentItemScene"></content-list>

        <banners :banners="bannersTop"></banners>

        <content-list v-if="topRatedScenes"
                      :title="'Top Rated Evil Angel Scenes'"
                      :content="topRatedScenes"
                      :show-more-link="$routes.browse()"
                      :item-extra-class="'content-item-in-double-row'"
                      current-component="ContentItemScene"></content-list>

        <banners :banners="bannersMiddle"></banners>

        <content-list v-if="performers"
                      :title="'Most Popular Pornstars'"
                      :content="performers"
                      :show-more-link="$routes.performers()"
                      current-component="ContentItemPerson"></content-list>

        <banners :banners="bannersBottom"></banners>

        <content-list v-if="movies"
                      :title="'Latest Evil Angel Movies'"
                      :content="movies"
                      :show-more-link="$routes.movies()"
                      current-component="ContentItemMovie"></content-list>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import Carousel from 'node_modules/ea-components/carousel/carousel';
    import ContentList from 'components/content-list/content-list';
    import Banners from 'components/banners';

    export default {
        auth:   false,
        components: {
            Carousel,
            ContentList,
            Banners
        },
        data() {
            return {
                bannersTop: [
                    {
                        title: 'Banner Top',
                        images: ['https://via.placeholder.com/816x221/11d2d4/fffffff'],
                        link: '#'
                    },
                    {
                        title: 'Banner Top',
                        images: ['https://via.placeholder.com/816x221/11d2d4/fffffff'],
                        link: '#'
                    }
                ],
                bannersMiddle: [
                    {
                        title: 'Banner Middle',
                        images: ['https://via.placeholder.com/816x221/11d2d4/fffffff'],
                        link: '#'
                    },
                    {
                        title: 'Banner Middle',
                        images: ['https://via.placeholder.com/816x221/11d2d4/fffffff'],
                        link: '#'
                    }
                ],
                bannersBottom: [
                    {
                        title: 'Banner Bottom',
                        images: ['https://via.placeholder.com/1656x221/11d2d4/fffffff', 'https://via.placeholder.com/816x221/11d2d4/fffffff'],
                        link: '#'
                    }
                ],
            }
        },
        computed:   {
            ...mapState('content', ['newestScenes', 'topRatedScenes', 'performers', 'movies']),
            carouselScenes() {
                return this.newestScenes.slice(0, 4).map(scene => {
                    return {
                        src: scene.images[1][1300],
                        id:         scene.id,
                        link:       scene.link
                    }
                });

            }
        },
        fetch({store, error}) {
            return apiGetMultiple([
                store.dispatch('content/fetchNewestScenes').catch(() => ''),
                store.dispatch('content/fetchTopRatedScenes', 12).catch(() => ''),
                store.dispatch('content/fetchPerformers', 12).catch(() => ''),
                store.dispatch('content/fetchMovies', 12).catch(() => ''),
            ], error);
        },
        head() {
            return {
                title: 'Evil Angel'
            }
        }
    }
</script>
