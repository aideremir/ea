<template>
    <div class="secondary-menu">
        <ul class="secondary-menu__list">
            <li>
                <nuxt-link :to="$routes.home()" class="secondary-menu__link" exact>
                    <home-icon class="secondary-menu__icon"/>
                    {{ $t('navigation.home') }}
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.browse()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    {{ $t('navigation.browse') }}
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.performers()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    {{ $t('navigation.pornstars') }}
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.directors()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    {{ $t('navigation.directors') }}
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.tags()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    {{ $t('categories') }}
                </nuxt-link>
            </li>
            <li class="secondary-menu__list-item secondary-menu__list-item--search">
                <nuxt-link :to="$routes.mobileSearch()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    {{ $t('navigation.search') }}
                </nuxt-link>
            </li>
        </ul>
        <template v-if="isLoggedIn">
            <div class="secondary-menu__header">Library</div>
            <ul class="secondary-menu__list">
                <li>
                    <nuxt-link :to="$routes.history('scenes')" class="secondary-menu__link"
                               :class="{'active': $route.path.includes('history')}">
                        <history-icon class="secondary-menu__icon"/>
                        History
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="$routes.favorites('scenes')" class="secondary-menu__link"
                               :class="{'active': $route.path.includes('favorites')}">
                        <favorites-icon class="secondary-menu__icon"/>
                        Favorites
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="$routes.playlists()" class="secondary-menu__link">
                        <playlists-icon class="secondary-menu__icon"/>
                        Playlists
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link :to="$routes.purchases()" class="secondary-menu__link">
                        <purchase-icon class="secondary-menu__icon"/>
                        Purchases
                    </nuxt-link>
                </li>
            </ul>
            <div class="secondary-menu__header">Subscriptions</div>
            <ul class="secondary-menu__list">
                <li>
                    <a href="#" class="secondary-menu__link">
                        <img class="secondary-menu__avatar" src="https://via.placeholder.com/18x18/59606b"/>
                        Blackmailed
                        <div class="secondary-menu__counter">0</div>
                    </a>
                </li>
                <li>
                    <a href="#" class="secondary-menu__link">
                        <img class="secondary-menu__avatar" src="https://via.placeholder.com/18x18/59606b"/>
                        Titty Creampies
                        <div class="secondary-menu__counter">2</div>
                    </a>
                </li>
            </ul>
        </template>
        <div class="secondary-menu__header">Support</div>
        <ul class="secondary-menu__list">
            <li>
                <nuxt-link :to="$routes.faq()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    FAQ
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.contact()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    Contact us
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.billing()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    Billing
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="$routes.sitemap()" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    Sitemap
                </nuxt-link>
            </li>
        </ul>

        <div class="secondary-menu__header">Settings</div>
        <ul class="secondary-menu__list">
            <li>
                <a @click="toggleLanguageList" href="javascript:void(0)" class="secondary-menu__link">
                    <circle-icon class="secondary-menu__icon"/>
                    Language
                    <arrow-down-icon class="secondary-menu__arrow"/>
                </a>
            </li>
            <template v-if="isLanguageListVisible">
                <li v-for="locale in $i18n.locales">
                    <nuxt-link :key="locale.code"
                               :to="switchLocalePath(locale.code)"
                               class="secondary-menu__link secondary-menu__link--language"
                               :class="{'active': locale.code === $i18n.locale}">{{ locale.name }}
                    </nuxt-link>
                </li>
            </template>
        </ul>

        <div v-if="!isLoggedIn" class="auth-block">
            <div class="auth-block__text">
                {{ $t('secondary_menu.auth_text') }}
            </div>
            <nuxt-link :to="$routes.login()" tag="button"
                       class="btn btn--md btn--secondary auth-block__button">
                {{ $t('secondary_menu.sign_in') }}
            </nuxt-link>
            <div class="auth-block__join">
                {{ $t('secondary_menu.not_a_member') }}
                <nuxt-link :to="$routes.signup()">{{ $t('secondary_menu.join_now') }}</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeIcon from '../assets/images/inline/home.svg';
    import CircleIcon from '../assets/images/inline/circle.svg';
    import LatestIcon from '../assets/images/inline/latest.svg';
    import FeaturedIcon from '../assets/images/inline/featured.svg';
    import HistoryIcon from '../assets/images/inline/history.svg';
    import FavoritesIcon from '../assets/images/inline/favourite.svg';
    import PlaylistsIcon from '../assets/images/inline/playlist.svg';
    import PurchaseIcon from '../assets/images/inline/purchases.svg';
    import ArrowDownIcon from '../assets/images/inline/arrow-down-small.svg';


    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                isLanguageListVisible: false
            };
        },
        components: {
            HomeIcon,
            CircleIcon,
            LatestIcon,
            FavoritesIcon,
            FeaturedIcon,
            HistoryIcon,
            PlaylistsIcon,
            PurchaseIcon,
            ArrowDownIcon
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn'
            }),
        },
        methods: {
            toggleLanguageList() {
                this.isLanguageListVisible = !this.isLanguageListVisible;
            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .secondary-menu {
        padding-top: 16px;
        height: 100%;
        background-color: $dark-two;
        border-right: 1px solid $charcoal-grey;

        &__header {
            padding: 0 20px;
            display: flex;
            align-items: center;
            height: calculateRem(40px);
            text-transform: uppercase;
            @include fontSize(14px);
            font-weight: 600;
            letter-spacing: calculateRem(0.2px);
            color: $light-grey;
        }

        &__list {
            padding: 0;
            list-style: none;
        }

        &__list-item {
            &--search {
                display: none;

                @media (max-width: $sm) {
                    display: block;
                }
            }
        }

        &__link {
            padding: 0 20px;
            display: flex;
            align-items: center;
            height: calculateRem(40px);

            @include fontSize(15px);
            line-height: 1.2;
            letter-spacing: calculateRem(0.4px);
            color: $cool-grey;
            text-transform: capitalize;

            @media (max-width: $lg) {
                @include fontSize(12px);
                line-height: 1.33;
            }

            &:hover, &.nuxt-link-active, &.active {
                background: $charcoal-grey;
                color: $white;

                .secondary-menu__icon {
                    fill: $bright-red;
                }
            }

            &--language {
                padding-left: 52px;

                &.nuxt-link-active {
                    background: transparent;
                    color: $cool-grey;
                }

                &:hover, &.active {
                    background: transparent;
                    color: $white;
                }
            }
        }

        &__icon {
            margin-right: calculateRem(8px);
            fill: $slate-grey;
        }

        &__arrow {
            margin-left: auto;
            fill: $steel;
        }

        &__avatar {
            margin-right: calculateRem(8px);
            width: 18px;
            height: 18px;
            border-radius: 2px;
        }

        &__counter {
            margin-left: auto;
        }
    }

    .auth-block {
        margin-top: calculateRem(20px);
        padding: calculateRem(20px);
        &__text {
            margin-bottom: calculateRem(16px);
            font-size: calculateRem(12px);
            line-height: 1.33;
            letter-spacing: calculateRem(0.4px);
            color: $white;
        }

        &__button {
            margin-bottom: calculateRem(16px);
        }

        &__join {
            font-size: calculateRem(12px);
            line-height: 1.33;
            letter-spacing: calculateRem(0.4px);
            color: $steel;

            a {
                color: inherit;
            }
        }
    }
</style>
