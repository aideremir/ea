<template>
    <div class="col-12 col-sm-6 col-xl-3 playlists-list-item">
        <div class="playlists-list-item__body">
            <img :src="playlist.images[1]" :alt="playlist.title">
            <div class="playlists-list-item__label">
                <span class="playlists-list-item__label-count">{{ playlist.sceneCount }}</span>
                <span class="playlists-list-item__label-text">{{ labelText }}</span>
            </div>
            <div class="playlists-list-item__overlay">
                <a href="#" class="playlists-list-item__overlay-link">Play All</a>
                <nuxt-link :to="$routes.playlist(playlist.id)" class="playlists-list-item__overlay-link">View Playlist</nuxt-link>
            </div>
        </div>
        <nuxt-link :to="$routes.playlist(playlist.id)"><h3 class="playlists-list-item__title">{{ playlist.title }}</h3></nuxt-link>
    </div>

</template>

<script>

    export default {
        props: {
            playlist: {},
        },
        computed: {
            labelText() {
                return this.playlist.sceneCount === 1 ? 'scene' : 'scenes';
            }
        }
    };
</script>

<style lang="scss">
    @import "~assets/scss/_variables";
    @import "~assets/scss/mixins/px-rem";

    %overlays {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(#111418, .9);
    }

    .playlists-list-item {
        margin-bottom: calculateRem(16px);
        &__title {
            margin: calculateRem(8px) 0;
            font-weight: $font-weight-normal;
            font-size: calculateRem(15px);
            line-height: 1;
        }
        &__body {
            position: relative;
        }
        &__label {
            @extend %overlays;
            width: 40%;
            &-count {
                font-size: calculateRem(24px)
            }
            &-text {
                font-size: calculateRem(20px);
                letter-spacing: calculateRem(.2px);
                text-transform: capitalize;
            }
        }
        &__overlay {
            @extend %overlays;
            width: 100%;
            display: none;

            &-link {
                margin: calculateRem(8px) 0;
                padding: calculateRem(12px);
                min-width: 50%;
                text-align: center;
                display: block;
                border-radius: calculateRem(2px);
                border: solid calculateRem(1px) #596068;
                letter-spacing: calculateRem(.4px);
                color: #cfd4db;
            }
        }
    }

    .playlists-list-item:hover {
        .playlists-list-item__label {
            display: none;
        }
        .playlists-list-item__overlay {
            display: flex;
        }
    }

</style>
