<template>
    <section v-if="playlists.length" class="playlists-list">
        <div class="container">
            <ul class="row playlists-list__body">
                <playlists-list-item v-for="playlist in playlists" :playlist="playlist" :key="playlist.id" />
            </ul>
        </div>
    </section>
</template>

<script>
    import PlaylistsListItem from './playlists-list-item';

    export default {
        components: {PlaylistsListItem},
        props: {
            playlists: Array
        },
    };
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .playlists-list {
        &__body {
            padding: 0; // reset padding for <ul> element
            list-style-type: none; // reset marks for <ul> element
        }
    }


</style>
