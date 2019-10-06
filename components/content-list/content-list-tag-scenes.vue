<template>
    <section v-if="tag.scenes.length" class="content-list-tag-scenes">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content-list-tag-scenes__head">
                        <div class="content-list-tag-scenes__tag-image">
                            <img :src="'https://via.placeholder.com/32x32/59606b/fffffff'" alt="">
                        </div>
                        <h2 class="content-list-tag-scenes__title">
                            {{ tag.name }}
                            <span class="content-list-tag-scenes__recommend">
                                Recommended category for you
                            </span>
                        </h2>

                        <nuxt-link v-if="showMoreLink" :to="showMoreLink" class="btn btn--outline btn--sm show-more-btn">View All</nuxt-link>
                    </div>
                </div>
            </div>

            <ul class="row content-list-tag-scenes__body">

                <content-item-scene v-for="scene in tag.scenes"
                                    v-if="currentSceneId !== scene.id"
                                    :key="scene.id"
                                    :item="scene"
                                    :extra-class="itemExtraClass"></content-item-scene>

            </ul>
        </div>
    </section>
</template>

<script>
    import ContentItemScene from './content-item-scene';

    export default {
        props:      {
            showMoreLink:     {},
            tag:              {},
            itemExtraClass:   String,
            currentSceneId:   Number
        },
        components: {
            ContentItemScene
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .content-list-tag-scenes {
        &__head {
            padding-top: $content-list-tag-scenes-head-padding-top;
            padding-bottom: $content-list-tag-scenes-head-padding-bottom;
            display: flex;
            align-items: center;
            border-top: $border-top-width solid $border-top-color;
        }
        &__tag-image {
            max-width: 2rem;
            border-radius: 3.2px;
            overflow: hidden;
        }
        &__title {
            margin: 0 auto 0 .5rem;
            font-size: $content-list-title-font-size;
            font-weight: $content-list-title-font-weight;
            line-height: $content-list-title-line-height;
            letter-spacing: .2px;
        }
        &__recommend {
            margin-left: .5rem;
            font-size: .9375rem;
            color: $cool-grey;
        }
        &__body {
            padding: 0;   // reset padding for <ul> element
            list-style-type: none;  // reset marks for <ul> element
        }
    }

</style>
