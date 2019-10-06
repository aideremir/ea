<template>
    <li class="col-6 col-sm-4 col-lg-3 col-xxl-2 content-item-movie">

        <nuxt-link :to="$routes.movie(item)" class="content-item-movie__image-wr">
            <img class="content-item-movie__image" src="https://via.placeholder.com/300x434/59606b/fffffff" alt="">
        </nuxt-link>

        <div class="content-item-movie__info">
            <nuxt-link :to="$routes.movie(item)" class="content-item-movie__title">
                {{ item.title }}
            </nuxt-link>
            <span v-if="item.liveDateStart" class="content-item-movie__date">
                {{ item.liveDateStart | humanDate('D MMMM, YYYY')}}
            </span>
        </div>
    </li>
</template>

<script>

    export default {
        props:      {
            item: Object
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .content-item-movie {
        margin-bottom: 24px;
        &__image {
            width: 100%;
        }
        &__info {
            padding: .5rem 0;
        }
        &__title {
            font-size: 0.9375rem;
            letter-spacing: .4px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: block;
        }
        &__date {
            display: block;
            font-size: 0.75rem;
            color: $light-grey;
            line-height: 18px;
            letter-spacing: .4px;
            font-weight: $font-weight-light;
        }
    }
</style>
