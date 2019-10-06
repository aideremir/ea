<template>
    <div class="movie-page">

        <profile :item="movie" content-type="Movie">
            <template slot="info-left-col">
                <div class="profile__info-item">
                    <div class="profile__views">1,016,567 views</div>
                </div>
                <div class="profile__info-item hide-lg-down">
                    <app-button child-class="btn--has-icon btn--play">Trailer</app-button>
                </div>
                <div class="profile__info-item hide-lg-down">
                    <app-button child-class="btn--has-icon btn--gallery">Cover</app-button>
                </div>
                <div class="profile__info-item">
                    <comments-button @click="showComments = !showComments" :count="'3'"></comments-button>
                </div>
            </template>
        </profile>

        <div v-if="showComments" class="container">
            <div class="row">
                <div class="col-12">
                    <div class="movie-page__comments">
                        <div class="row">
                            <div class="col-6">
                                <comments content-type="Movie"
                                          :content-id="movie.id"></comments>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <content-list v-if="movie.performers"
                      :title="`Pornstars from ${movie.title}`"
                      :content="movie.performers"
                      current-component="ContentItemPerson"></content-list>
    </div>
</template>

<script>
    import Profile from 'components/profile';
    import ContentList from 'components/content-list/content-list';
    import {apiGetMultiple} from 'node_modules/ea-components/services/utils';
    import {mapState} from 'vuex';
    import CommentsButton from 'components/comments-button';
    import Comments from 'node_modules/ea-components/comments/comments';
    import AppButton from 'components/button';

    export default {
        auth: false,
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        computed: {
            ...mapState('content', ['movie'])
        },
        fetch({params, error, store}) {
            return apiGetMultiple([
                store.dispatch('content/fetchMovie', params.id)
            ], error);
        },
        data() {
            return {
                showComments: false
            }
        },
        components: {
            Comments,
            CommentsButton,
            Profile,
            ContentList,
            AppButton
        },
        head() {
            return {
                title: '',
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

</script>

<style lang="scss">
    @import '~assets/scss/variables';

    .movie-page {
        &__comments {
            border-top: $border-top-width solid $border-top-color;
        }
    }
</style>
