<template>
    <li class="tag-filter-list-item">
        <span class="tag-filter-item" :class="{'tag-filter-item--disabled': isDisabled}">
            {{ tag.name }}
            <span v-if="!isDisabled" class="tag-filter-item__control">
                <app-button @click="toggleInclude" class="tag-filter-item__button-wr" child-class="tag-filter-item__button tag-filter-item__button--add"
                        :class="{'active': isIncluded}"></app-button>
                <app-button @click="toggleExclude" class="tag-filter-item__button-wr" child-class="tag-filter-item__button tag-filter-item__button--remove"
                            :class="{'active': isExcluded}"></app-button>
            </span>
        </span>
    </li>

</template>

<script>
    import AppButton from 'components/button';

    export default {
        props: {
            tag: Object,
            isDisabled: Boolean,
            isIncluded: Boolean,
            isExcluded: Boolean,
        },
        methods: {
            toggleInclude() {
                this.$emit('input', {isIncluded: !this.isIncluded, isExcluded: false});
            },
            toggleExclude() {
                this.$emit('input', {isIncluded: false, isExcluded: !this.isExcluded});
            },
        },
        components: {
            AppButton
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/_variables";
    @import "~assets/scss/mixins/px-rem";

    .tag-filter-list-item {
        padding: 0 4px 8px;
        width: calc(100% / 6);
        flex-basis: calc(100% / 6);
        @media (max-width: $xl) {
            width: calc(100% / 4);
            flex-basis: calc(100% / 4);
        }
        @media (max-width: $md) {
            width: calc(100% / 3);
            flex-basis: calc(100% / 3);
        }
        @media (max-width: $sm) {
            width: 100%;
            flex-basis: 100%;
        }
    }

    .tag-filter-item {
        padding: calculateRem(5px) calculateRem(8px) calculateRem(5px) calculateRem(16px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $dark-two;
        border-radius: calculateRem(16px);
        border: 1px solid $charcoal-grey;
        font-size: .9375rem;
        line-height: 1.2;
        letter-spacing: .025rem;
        user-select: none;

        &--disabled {
            color: $slate-grey;
        }

        &__control {
            display: flex;
            align-items: center;
        }
        &__button {
            padding: 0;
            width: calculateRem(20px);
            height: calculateRem(20px);
            border: none;
            background-size: contain;
            background-repeat: no-repeat;
            &-wr {
                margin: 0 !important;
            }
            &--add {
                background-image: url("~assets/images/add_gray.svg");
                &:hover,
                &.active {
                    background-image: url("~assets/images/add_green.svg");
                }
            }
            &--remove {
                background-image: url("~assets/images/remove_gray.svg");
                &:hover,
                &.active {
                    background-image: url("~assets/images/remove_red.svg");
                }
            }
        }
    }

    .tag-filter-item--disabled {
        color: $slate-grey;
        .tag-filter-item__control {
            display: none;
        }
    }
</style>
