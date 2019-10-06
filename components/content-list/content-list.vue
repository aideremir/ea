<template>
    <section v-if="content.length" class="content-list">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content-list__head">
                        <h2 class="content-list__title">
                            {{ title }}
                        </h2>
                        <nuxt-link v-if="showMoreLink" :to="showMoreLink"
                                   class="btn btn--outline btn--sm show-more-btn">View All
                        </nuxt-link>
                        <slot name="page-sort"></slot>
                    </div>
                </div>
            </div>

            <ul class="row content-list__body">

                <component :is="currentComponent"
                           v-for="item in content"
                           :key="item.id"
                           :item="item"
                           :extra-class="itemExtraClass"></component>
            </ul>
        </div>
    </section>
</template>

<script>
    import ContentItemScene from './content-item-scene';
    import ContentItemPerson from './content-item-person';
    import ContentItemMovie from './content-item-movie';

    export default {
        props: {
            showMoreLink: {},
            currentComponent: String,
            currentSceneId: Number,
            content: Array,
            itemExtraClass: String,
            title: String
        },
        components: {
            ContentItemScene,
            ContentItemPerson,
            ContentItemMovie
        }
    };
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .content-list {
        &__head {
            padding-top: $content-list-head-padding-top;
            padding-bottom: $content-list-head-padding-bottom;
            display: flex;
            justify-content: space-between;
            border-top: $border-top-width solid $border-top-color;
        }
        &__title {
            font-size: $content-list-title-font-size;
            font-weight: $content-list-title-font-weight;
            line-height: $content-list-title-line-height;
            letter-spacing: .2px;
        }
        &__body {
            padding: 0; // reset padding for <ul> element
            list-style-type: none; // reset marks for <ul> element
        }
    }


</style>
