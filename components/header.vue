<template>
    <header class="header">
        <div class="header__inner header__inner--wide">
            <app-button class="header__burger" @click.native="toggleSecondaryMenu">
                <burger-icon v-if="!isSecondaryMenuVisible" class="header__icon"/>
                <close-icon v-else class="header__icon"/>
            </app-button>
            <nuxt-link :to="$routes.home()" class="header__logo">
                <img src="../assets/images/logo.svg"/>
            </nuxt-link>
            <div class="header__nav-container">
                <main-menu/>
                <search-bar :class="{'search-bar--visible': isSearchBarVisible}"/>
            </div>
        </div>
        <div class="header__inner">
            <nuxt-link :to="$routes.mobileSearch()" class="header__mobile-search">Search</nuxt-link>
            <template v-if="!isLoggedIn">
                <div class="header__login-container">
                    <app-button class="header__link" @click.native="toggleLoginPopup">
                        Sign in
                        <arrow-down-icon class="header__icon header__icon--arrow"/>
                    </app-button>
                    <div v-if="isLoginPopupVisible" class="popup popup--login">
                        <popup-header @close="toggleLoginPopup"/>
                        <div class="popup__body">
                            <login-form v-if="popupForm === 'login'" mode="popup" @toggle="togglePopupForm"/>
                            <forgot-password-form v-else mode="popup" @toggle="togglePopupForm"/>
                        </div>
                        <div class="popup__footer">
                            Not a member?
                            <nuxt-link :to="$routes.signup()" class="popup__footer-link">Join now</nuxt-link>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="$routes.signup()"
                           class="btn btn--secondary header__join-button"
                           data-text-lg="get free access"
                           data-text-sm="join"/>
            </template>
            <template v-else>
                <div class="header__logged-block header__logged-block--messages">
                    <app-button data-count="9+" class="header__notifications">
                        <message-icon class="header__icon"/>
                    </app-button>
                </div>
                <div class="header__logged-block header__logged-block--user">
                    <app-button @click="toggleProfilePopup" class="header__user">
                        <user-icon class="header__icon"/>
                        <arrow-down-icon class="header__icon header__icon--arrow"/>
                    </app-button>
                    <ul v-if="isProfilePopupVisible" class="popup popup--profile">
                        <li>
                            <nuxt-link :to="$routes.settings()" class="popup__menu-item">
                                Settings
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link :to="$routes.support()" class="popup__menu-item">
                                Support
                            </nuxt-link>
                        </li>
                        <li>
                            <a @click.prevent="logout" href="#" class="popup__menu-item">
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </header>
</template>

<script>
    import AppButton from 'components/button';
    import MainMenu from 'components/main-menu';
    import SearchBar from 'components/search-bar';
    import SecondaryMenu from 'components/secondary-menu';
    import PopupHeader from 'components/popup-header';
    import LoginForm from '../components/login-form';
    import ForgotPasswordForm from '../components/forgot-password';

    import {mapGetters, mapState} from 'vuex';

    import ArrowDownIcon from '../assets/images/inline/arrow-down-small.svg';
    import BurgerIcon from '../assets/images/inline/hamburger.svg';
    import CloseIcon from '../assets/images/inline/close-small.svg';
    import MessageIcon from '../assets/images/inline/message.svg';
    import UserIcon from '../assets/images/inline/user.svg';

    export default {
        components: {
            AppButton,
            MainMenu,
            SearchBar,
            PopupHeader,
            LoginForm,
            ForgotPasswordForm,
            ArrowDownIcon,
            SecondaryMenu,
            BurgerIcon,
            CloseIcon,
            MessageIcon,
            UserIcon,
        },
        data() {
            return {
                isSearchBarVisible: false,
                isLoginPopupVisible: false,
                isProfilePopupVisible: false,
                popupForm: 'login',
            };
        },
        computed: {
            ...mapState({
                isSecondaryMenuVisible: state => state.ui.isSecondaryMenuVisible,
            }),
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn'
            }),
        },
        methods:    {
            toggleSecondaryMenu() {
                this.$store.dispatch('ui/toggleSecondaryMenu');
            },
            toggleSearchBar() {
                this.isSearchBarVisible = !this.isSearchBarVisible;
            },
            toggleLoginPopup() {
                this.isLoginPopupVisible = !this.isLoginPopupVisible;
            },
            toggleProfilePopup() {
                this.isProfilePopupVisible = !this.isProfilePopupVisible;
            },
            logout() {
                this.$store.dispatch('auth/logout').then(() => {
                    this.$router.push(`/`);
                });
            },
            togglePopupForm(formType) {
                this.popupForm = formType;
            },
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/buttons';
    @import '../assets/scss/mixins/px-rem';

    .header {
        padding: 12px 24px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $charcoal-grey;

        @media (max-width: $lg) {
            padding: 12px;
        }

        @media (max-width: $lg) {
            padding: 8px 16px;
        }

        &__inner {
            display: flex;
            align-items: center;

            &--wide {
                flex-grow: 1;
            }
        }

        &__burger {
            margin-right: calculateRem(8px);
            cursor: pointer;
        }

        &__mobile-search {
            margin-right: 8px;
            width: calculateRem(24px);
            height: calculateRem(24px);
            display: none;
            background: transparent url(../assets/images/search.svg) center no-repeat;
            background-size: cover;
            text-indent: -9999px;

            @media (max-width: $lg) {
                display: block;
            }

            @media (max-width: $sm) {
                display: none;
            }
        }

        &__icon {
            width: calculateRem(24px);
            height: calculateRem(24px);
            fill: $light-grey;

            &:hover {
                fill: $white;
            }

            &--arrow {
                fill: $light-grey;
                vertical-align: baseline;

                @media (max-width: $lg) {
                    display: none;
                }
            }
        }

        &__logo {
            flex-basis: calculateRem(165px);
            max-width: calculateRem(165px);
            display: block;

            @media (max-width: $sm) {
                flex-basis: calculateRem(110px);
                max-width: calculateRem(110px);
            }
        }

        &__nav-container {
            padding: 0 calculateRem(32px);
            position: relative;
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: $lg) {
                display: none;
            }
        }

        &__login-container {
            position: relative;
        }

        &__link {
            margin-right: calculateRem(16px);
            padding: 0;
            background: transparent;
            border: none;
            color: $light-grey;
            font-size: 1rem;
            letter-spacing: 0.0125rem;
            white-space: nowrap;
            cursor: pointer;
        }

        &__logged-block {
            position: relative;

            &--user {
                padding-right: 14px;
            }
        }

        &__notifications {
            padding-right: calculateRem(20px);
            width: calculateRem(44px);
            height: calculateRem(24px);
            position: relative;

            &::after {
                content: attr(data-count);
                padding: 0 calculateRem(3px) 0;
                position: absolute;
                top: calculateRem(-3px);
                left: calc(100% - 1.25rem); // 100% - padding-right
                border-radius: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: calculateRem(12px);
                font-weight: $font-weight-bold;
                background: $bright-red;
                color: $white;
                line-height: 1.25;
                text-indent: 0;
            }
        }

        &__user {
            display: flex;

            &:hover {
                .header__icon {
                    fill: $white;
                }
            }
        }

        &__join-button {
            @include button-size($btn-padding-y-md, $btn-padding-x-md, $btn-font-size-md, $btn-line-height-md, $btn-border-radius-md);

            @media (max-width: $sm) {
                @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $btn-font-size-sm, $btn-line-height-sm, $btn-border-radius-sm);
            }

            &:after {
                content: attr(data-text-lg);

                @media (max-width: $sm) {
                    content: attr(data-text-sm);
                }
            }
        }
    }

    .popup {
        position: absolute;
        top: calc(100% + 20px); // todo: fix this 'magic' number 20px
        right: 0;
        z-index: $zindex-popper;
        background: $dark-two;
        border: 1px solid $slate-grey;
        border-radius: 4px;

        @media (max-width: $lg) {
            padding-top: 64px;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: $dark;
        }

        &:after {
            top: -6px;
            right: 22px;
            content: '';
            width: 10px;
            height: 10px;
            position: absolute;
            border-top: 1px solid $slate-grey;
            border-left: 1px solid $slate-grey;
            background: $dark-two;
            transform: rotate(45deg);
        }

        &--profile {
            width: calculateRem(144px);
            padding: 0;
            list-style: none;
        }

        &__menu-item {
            display: block;
            padding: calculateRem(6px) calculateRem(16px);
            font-size: calculateRem(15px);
            line-height: 1.2;
            letter-spacing: calculateRem(0.4px);
            box-shadow: 0 1px 0 0 $charcoal-grey;

            &:last-child {
                box-shadow: none;
            }
        }

        &__footer {
            padding: calculateRem(18px) 0 calculateRem(20px);
            border-top: 1px solid $slate-grey;
            font-size: calculateRem(15px);
            font-weight: $font-weight-light;
            letter-spacing: calculateRem(0.4px);
            text-align: center;
            color: $light-grey;

            @media (max-width: $lg) {
                padding: 0;
                border: none;
                font-size: calculateRem(12px);
                line-height: 1.33;
                letter-spacing: calculateRem(0.3px);
                color: $cool-grey;
            }
        }

        &__footer-link {
            font-weight: normal;
        }
    }

</style>
