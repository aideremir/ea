<template>
    <div class="banners">
        <div class="container">
            <div class="row">
                <div v-for="(banner, index) in banners" class="col banners__item" :class="{'banners__item--md-hide': index > 0}">
                    <a :href="banner.link" class="banners__link">
                        <picture v-if="banner.images.length > 1">
                            <source media="(min-width: 769px)" :srcset="banner.images[0]">
                            <source :srcset="banner.images[1]">
                            <img :src="banner.images[1]" alt="">
                        </picture>
                        <img v-else :src="banner.images[0]" :alt="banner.title" class="banners__image">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            banners: Array,
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .banners {
        margin-bottom: 24px;
        &__link {
            display: block;
        }
        &__item {
            &--md-hide {
                @media (max-width: $md) {
                    display: none;
                }
            }
        }
    }

</style>