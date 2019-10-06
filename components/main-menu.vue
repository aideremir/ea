<template>
    <nav class="main-menu">
        <ul class="main-menu__list">
            <li class="main-menu__item">
                <nuxt-link :to="$routes.browse()" class="main-menu__link">{{ $t('navigation.browse') }}</nuxt-link>
            </li>
            <li class="main-menu__item">
                <nuxt-link :to="$routes.performers()" class="main-menu__link">{{ $t('navigation.pornstars') }}
                </nuxt-link>
            </li>
            <li class="main-menu__item">
                <nuxt-link :to="$routes.directors()" class="main-menu__link">{{ $t('navigation.directors') }}
                </nuxt-link>
            </li>
            <li class="main-menu__item">
                <nuxt-link :to="$routes.tags()" class="main-menu__link">{{ $t('categories') }}
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {};
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .main-menu {
        margin: 0 -8px;

        @media (max-width: $lg) {
            display: none;
        }

        &__list {
            padding:    0;
            display:    flex;
            list-style: none;
        }

        &__item {
            padding: 0 8px;
        }

        &__link {
            font-size:      1rem;
            letter-spacing: 0.0125rem;
            color:          $cool-grey;
            text-transform: capitalize;
            &.nuxt-link-active {
                color: $white;
            }
        }
    }
</style>
