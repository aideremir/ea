<template>
    <div class="search-bar">
        <input v-model="searchTerm" type="search" required class="search-bar__input"
               placeholder="Search for Pornstars, Directors, Scenes and Movies..."/>
        <app-button v-if="hasValue" @click.native="clearSearch" class="search-bar__close"></app-button>
        <div v-if="hasValue" class="search-bar__results">
            <div class="container-fluid">
                <div class="row">
                    <search-results-list title="Scenes" :results="searchResults.scenes"
                                         class="wide-pics col-lg-4 col-md-12"/>
                    <search-results-list title="Movies" :results="searchResults.movies" class="col-lg-4 col-md-12"/>
                    <search-results-list title="Pornstars" :results="searchResults.performers"
                                         class="col-lg-2 col-md-12"/>
                    <search-results-list title="Directors" :results="searchResults.directors"
                                         class="col-lg-2 col-md-12"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchResultsList from './search-results-list';
    import AppButton from '../button';

    export default {
        data() {
            return {
                searchTerm:    '',
                hasValue:      false,
                searchResults: {
                    scenes:     [
                        {
                            imageUrl:   'https://via.placeholder.com/78x44',
                            title:      'Young Aidra\'s Gagging, Messy Face Fuck',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/78x44',
                            title:      'Young Aidra\'s Gagging, Messy Face Fuck',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/78x44',
                            title:      'Young Aidra\'s Gagging, Messy Face Fuck',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/78x44',
                            title:      'Young Aidra\'s Gagging, Messy Face Fuck',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/78x44',
                            title:      'Young Aidra\'s Gagging, Messy Face Fuck',
                            performers: 'Jonni Darkko, Aidra Fox'
                        }
                    ],
                    movies:     [
                        {
                            imageUrl:   'https://via.placeholder.com/31x44',
                            title:      'Hookup Hotshot - Hardcore Sexting',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/31x44',
                            title:      'Hookup Hotshot - Hardcore Sexting',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/31x44',
                            title:      'Hookup Hotshot - Hardcore Sexting',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/31x44',
                            title:      'Hookup Hotshot - Hardcore Sexting',
                            performers: 'Jonni Darkko, Aidra Fox'
                        },
                        {
                            imageUrl:   'https://via.placeholder.com/31x44',
                            title:      'Hookup Hotshot - Hardcore Sexting',
                            performers: 'Jonni Darkko, Aidra Fox'
                        }
                    ],
                    performers: [
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        }
                    ],
                    directors:  [
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        },
                        {
                            imageUrl: 'https://via.placeholder.com/31x44',
                            title:    'Aidra Fox'
                        }
                    ],
                }
            };
        },
        watch:      {
            searchTerm(newVal) {
                this.hasValue = !!newVal;
            }
        },
        methods:    {
            clearSearch() {
                this.searchTerm = '';
            }
        },
        components: {
            SearchResultsList,
            AppButton
        }
    };
</script>

<style lang="scss">
    @import '~assets/scss/variables';
    @import '~assets/scss/mixins/px-rem';

    $nav-container-padding: 2rem; // 32px

    .search-bar {
        margin-left: $nav-container-padding;
        height: calculateRem(42px);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        .mobile-search & {
            margin-left: 0;
        }

        @media (max-width: $lg) {
            display: none;
        }

        &--visible {
            @media (max-width: $lg) {
                margin-left: 0;
                height: auto;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
            }
        }

        &__input {
            padding: calculateRem(11px) calculateRem(16px) calculateRem(11px) calculateRem(36px);
            width: 100%;
            max-width: calculateRem(440px);
            border-radius: 2px;
            border: solid 1px $slate-grey;
            color: $cool-grey;
            font-size: calculateRem(15px);
            line-height: 1.2;
            letter-spacing: calculateRem(.4px);
            outline: none;
            background: $dark-two url(~assets/images/search.svg) calculateRem(8px) 50% no-repeat;
            background-size: calculateRem(24px);
            transition: max-width 0.4s ease-in-out;
            .mobile-search & {
                max-width: none;
            }

            @media (max-width: $lg) {
                padding: calculateRem(7px) calculateRem(20px) calculateRem(7px) calculateRem(32px);
                max-width: 100%;
                background-position: calculateRem(4px) 50%;
            }

            @media (min-width: $lg) {
                &:focus, &:valid {
                    max-width: calc(100% - #{$nav-container-padding  * 2});
                    position: absolute;
                }
            }
        }

        &__close {
            position: absolute;
            right: $nav-container-padding + .5rem; // container's padding (32px) + input's padding (8px)
            span {
                width: calculateRem(24px);
                height: calculateRem(24px);
                display: block;
                background: transparent url(~assets/images/search.svg) center no-repeat;
                background-size: contain;
            }

            @media (max-width: $lg) {
                display: none;
            }

            path {
                fill: $steel;
            }
        }

        &__results {
            padding: calculateRem(19px) calculateRem(14px) calculateRem(22px);
            position: absolute;
            top: calc(100% - 1px);
            left: $nav-container-padding;
            right: $nav-container-padding;
            border: 1px solid $slate-grey;
            border-radius: 0 0 calculateRem(2px) calculateRem(2px);
            background-color: $dark;
            z-index: $zindex-dropdown;

            @media (max-width: $lg) {
                margin: 0 -8px;
                padding: calculateRem(32px) 0;
                width: 100%;
                flex-grow: 1;
                position: static;
                border: none;
            }

            @media (max-width: $sm) {
                margin: 0 -16px;
            }
        }
    }
</style>
